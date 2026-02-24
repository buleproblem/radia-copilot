import express, { Request, Response } from 'express';
import cors from 'cors';
import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

dotenv.config();

const PORT = parseInt(process.env.PORT ?? '3001', 10);

// ── In-memory stores ──────────────────────────────────────────────────────────

interface Room {
  id: string;
  name: string;
  createdAt: number;
  participants: Set<string>;
}

interface Session {
  userId: string;
  roomId: string | null;
  ws: WebSocket;
}

const rooms = new Map<string, Room>();
const sessions = new Map<string, Session>();

// ── Express app ───────────────────────────────────────────────────────────────

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'human-engine' });
});

app.get('/profile/:userId', (req: Request, res: Response) => {
  const { userId } = req.params;
  res.json({
    id: userId,
    username: `user_${userId.slice(0, 6)}`,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`,
    joinedAt: new Date().toISOString(),
    listenedMinutes: Math.floor(Math.random() * 10000),
  });
});

app.post('/room', (req: Request, res: Response) => {
  const roomId = uuidv4();
  const roomName: string = (req.body as { name?: string }).name ?? `Room ${roomId.slice(0, 6)}`;
  const room: Room = {
    id: roomId,
    name: roomName,
    createdAt: Date.now(),
    participants: new Set(),
  };
  rooms.set(roomId, room);
  res.status(201).json({ roomId, name: roomName, createdAt: room.createdAt });
});

app.get('/room/:roomId', (req: Request, res: Response) => {
  const room = rooms.get(req.params.roomId);
  if (!room) {
    res.status(404).json({ error: 'Room not found' });
    return;
  }
  res.json({
    id: room.id,
    name: room.name,
    createdAt: room.createdAt,
    participantCount: room.participants.size,
    participants: [...room.participants],
  });
});

// ── HTTP server + WebSocket upgrade ──────────────────────────────────────────

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

function broadcast(roomId: string, payload: object, exclude?: string): void {
  const message = JSON.stringify(payload);
  for (const [sessionId, session] of sessions) {
    if (session.roomId === roomId && sessionId !== exclude && session.ws.readyState === WebSocket.OPEN) {
      session.ws.send(message);
    }
  }
}

wss.on('connection', (ws: WebSocket, req) => {
  const sessionId = uuidv4();
  const url = new URL(req.url ?? '/', `http://localhost:${PORT}`);
  const roomId = url.searchParams.get('roomId');
  const userId = url.searchParams.get('userId') ?? uuidv4();

  const session: Session = { userId, roomId, ws };
  sessions.set(sessionId, session);

  // Join room if provided
  if (roomId && rooms.has(roomId)) {
    const room = rooms.get(roomId);
    if (room) {
      room.participants.add(userId);
      broadcast(roomId, { type: 'presence', event: 'join', userId }, sessionId);
    }
  }

  ws.send(JSON.stringify({ type: 'connected', sessionId, userId, roomId }));

  ws.on('message', (data) => {
    try {
      const msg = JSON.parse(data.toString()) as { type?: string; text?: string };
      if (session.roomId) {
        broadcast(session.roomId, {
          type: 'message',
          from: session.userId,
          text: msg.text ?? '',
          timestamp: Date.now(),
        });
      }
    } catch {
      // ignore malformed messages
    }
  });

  ws.on('close', () => {
    sessions.delete(sessionId);
    if (session.roomId && rooms.has(session.roomId)) {
      rooms.get(session.roomId)!.participants.delete(session.userId);
      broadcast(session.roomId, { type: 'presence', event: 'leave', userId: session.userId });
    }
  });
});

server.listen(PORT, () => {
  console.log(`human-engine running on port ${PORT}`);
});
