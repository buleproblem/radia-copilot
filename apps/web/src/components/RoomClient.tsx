"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import PinBadge from "@/components/PinBadge";
import {
  mockChatMessages,
  mockRoomUsers,
  continents,
  formatListeners,
  ChatMessage,
  Station,
  PIN_COLORS,
} from "@/lib/mockData";

function AudioVisualizer({ color }: { color: string }) {
  const bars = Array.from({ length: 32 }, (_, i) => i);
  return (
    <div className="flex items-end gap-0.5 h-12">
      {bars.map((i) => (
        <div
          key={i}
          className="w-1.5 rounded-sm"
          style={{
            background: color,
            height: `${20 + Math.random() * 80}%`,
            opacity: 0.6 + Math.random() * 0.4,
            animation: `pulse ${0.5 + Math.random() * 1}s ease-in-out infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}

function ChatPanel({
  messages,
  onSend,
}: {
  messages: ChatMessage[];
  onSend: (msg: string) => void;
}) {
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input.trim());
    setInput("");
  };

  return (
    <div
      className="flex flex-col h-full rounded-2xl overflow-hidden"
      style={{ background: "#111118", border: "1px solid #1f1f2e" }}
    >
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: "1px solid #1f1f2e" }}>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-white">Room Chat</span>
          <span
            className="text-xs px-2 py-0.5 rounded-full"
            style={{ background: "#00d4ff22", color: "#00d4ff", border: "1px solid #00d4ff33" }}
          >
            {mockRoomUsers.filter((u) => u.online).length} online
          </span>
        </div>
      </div>

      {/* Presence */}
      <div className="px-4 py-2 flex items-center gap-2 overflow-x-auto" style={{ borderBottom: "1px solid #1f1f2e" }}>
        {mockRoomUsers.map((user) => (
          <div key={user.id} className="flex flex-col items-center gap-0.5 flex-shrink-0">
            <div className="relative">
              <span className="text-xl">{user.avatar}</span>
              <span
                className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-black"
                style={{ background: user.online ? "#22c55e" : "#555" }}
              />
            </div>
            <span className="text-xs" style={{ color: "#9999bb", fontSize: "9px" }}>
              {user.name.slice(0, 8)}
            </span>
          </div>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3">
        {messages.map((msg) => (
          <div key={msg.id} className="flex items-start gap-2">
            <span className="text-lg flex-shrink-0">{msg.avatar}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2">
                <span className="text-xs font-semibold" style={{ color: "#00d4ff" }}>
                  {msg.user}
                </span>
                <span className="text-xs" style={{ color: "#555" }}>
                  {msg.timestamp}
                </span>
              </div>
              <p className="text-sm mt-0.5" style={{ color: "#ccccdd" }}>
                {msg.message}
              </p>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3" style={{ borderTop: "1px solid #1f1f2e" }}>
        <div
          className="flex items-center gap-2 rounded-lg px-3 py-2"
          style={{ background: "#0a0a0f", border: "1px solid #1f1f2e" }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Say something…"
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: "#ffffff" }}
          />
          <button
            onClick={handleSend}
            className="text-xs px-2 py-1 rounded"
            style={{ background: "#00d4ff22", color: "#00d4ff", cursor: "pointer" }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

interface RoomClientProps {
  station: Station;
}

export default function RoomClient({ station }: RoomClientProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatMessages);
  const [fingerprinting, setFingerprinting] = useState(false);
  const [fingerprintResult, setFingerprintResult] = useState<string | null>(null);
  const pinColor = PIN_COLORS[station.pinType];

  const handleFingerprint = () => {
    setFingerprinting(true);
    setFingerprintResult(null);
    setTimeout(() => {
      setFingerprinting(false);
      setFingerprintResult(`"${station.currentSong}" by ${station.artist}`);
    }, 2500);
  };

  const handleSendMessage = (text: string) => {
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      user: "you",
      avatar: "🎧",
      message: text,
      timestamp: "just now",
    };
    setMessages((prev) => [...prev, newMsg]);
  };

  return (
    <div className="min-h-screen" style={{ background: "#0a0a0f" }}>
      <NavBar />
      <div className="pt-20 pb-6 px-6 max-w-6xl mx-auto h-screen flex flex-col">
        <Link
          href="/"
          className="text-xs tracking-widest no-underline inline-flex items-center gap-1 mb-4"
          style={{ color: "#9999bb" }}
        >
          ← GLOBE
        </Link>

        <div className="flex gap-6 flex-1 min-h-0">
          {/* Left: Player */}
          <div className="flex-1 flex flex-col gap-4 min-w-0">
            {/* Station card */}
            <div
              className="rounded-2xl p-6"
              style={{
                background: "#111118",
                border: `1px solid ${pinColor}33`,
                boxShadow: `0 0 40px ${pinColor}11`,
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span
                      className="w-3 h-3 rounded-full animate-pulse"
                      style={{ background: "#00d4ff", boxShadow: "0 0 8px #00d4ff" }}
                    />
                    <span className="text-xs font-semibold tracking-widest" style={{ color: "#00d4ff" }}>
                      LIVE NOW
                    </span>
                  </div>
                  <h1 className="text-2xl font-bold text-white mt-1">{station.name}</h1>
                  <p className="text-sm mt-0.5" style={{ color: "#9999bb" }}>
                    {station.city}, {station.country}
                    {station.frequency ? ` · ${station.frequency}` : ""}
                  </p>
                </div>
                <PinBadge type={station.pinType} />
              </div>

              {/* Visualizer */}
              <div className="mb-4">
                <AudioVisualizer color={pinColor} />
              </div>

              {/* Current song */}
              <div
                className="rounded-xl p-4"
                style={{ background: "#0a0a0f", border: "1px solid #1f1f2e" }}
              >
                <p className="text-xs tracking-widest mb-1" style={{ color: "#9999bb" }}>
                  NOW PLAYING
                </p>
                <p className="text-lg font-semibold text-white">{station.currentSong}</p>
                {station.artist && (
                  <p className="text-sm mt-0.5" style={{ color: "#9999bb" }}>
                    {station.artist}
                  </p>
                )}
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3 mt-4">
                <button
                  className="flex-1 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-[1.02]"
                  style={{
                    background: `${pinColor}22`,
                    border: `1px solid ${pinColor}44`,
                    color: pinColor,
                    cursor: "pointer",
                  }}
                >
                  ▶ Playing
                </button>
                <button
                  className="px-4 py-3 rounded-xl text-sm transition-all hover:scale-[1.02]"
                  style={{
                    background: "#1f1f2e",
                    border: "1px solid #2f2f3e",
                    color: "#ccccdd",
                    cursor: "pointer",
                  }}
                >
                  🔖 Save
                </button>
                <button
                  className="px-4 py-3 rounded-xl text-sm transition-all hover:scale-[1.02]"
                  style={{
                    background: "#1f1f2e",
                    border: "1px solid #2f2f3e",
                    color: "#ccccdd",
                    cursor: "pointer",
                  }}
                >
                  🔗 Share
                </button>
              </div>
            </div>

            {/* What Was That? button */}
            <div
              className="rounded-2xl p-5"
              style={{ background: "#111118", border: "1px solid #1f1f2e" }}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-semibold text-white">What Was That?</p>
                  <p className="text-xs mt-0.5" style={{ color: "#9999bb" }}>
                    Audio fingerprint the last 10 seconds
                  </p>
                </div>
                <button
                  onClick={handleFingerprint}
                  disabled={fingerprinting}
                  className="px-5 py-2.5 rounded-xl font-semibold text-sm transition-all hover:scale-[1.02] disabled:opacity-60"
                  style={{
                    background: fingerprinting ? "#ff6b3522" : "#ff6b3522",
                    border: "1px solid #ff6b3544",
                    color: "#ff6b35",
                    cursor: fingerprinting ? "not-allowed" : "pointer",
                  }}
                >
                  {fingerprinting ? "Listening…" : "🎤 Identify"}
                </button>
              </div>
              {fingerprinting && (
                <div className="flex items-center gap-2">
                  <div
                    className="w-full h-1 rounded-full overflow-hidden"
                    style={{ background: "#1f1f2e" }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        background: "#ff6b35",
                        width: "60%",
                        animation: "pulse 1s ease-in-out infinite",
                      }}
                    />
                  </div>
                </div>
              )}
              {fingerprintResult && (
                <div
                  className="mt-3 rounded-lg p-3"
                  style={{ background: "#22c55e11", border: "1px solid #22c55e33" }}
                >
                  <p className="text-xs" style={{ color: "#22c55e" }}>
                    ✓ Identified: {fingerprintResult}
                  </p>
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Listeners", value: formatListeners(station.listeners) },
                { label: "Genre", value: station.genre },
                { label: "Type", value: station.pinType },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="rounded-xl p-3 text-center"
                  style={{ background: "#111118", border: "1px solid #1f1f2e" }}
                >
                  <p className="text-lg font-bold text-white">{value}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#9999bb" }}>
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Chat */}
          <div className="w-80 flex-shrink-0">
            <ChatPanel messages={messages} onSend={handleSendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
}
