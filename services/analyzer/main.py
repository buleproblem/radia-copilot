import time
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="analyzer", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Request / Response models ─────────────────────────────────────────────────

class FingerprintRequest(BaseModel):
    station_id: str
    buffer_url: str


class TranscribeRequest(BaseModel):
    station_id: str
    audio_chunk_url: str


# ── Routes ────────────────────────────────────────────────────────────────────

@app.get("/health")
def health():
    return {"status": "ok", "service": "analyzer"}


@app.post("/fingerprint")
def fingerprint(req: FingerprintRequest):
    return {
        "track": "Unknown",
        "artist": "Unknown",
        "confidence": 0.0,
        "timestamp": time.time(),
        "station_id": req.station_id,
    }


@app.get("/telemetry/continent/{continent_code}")
def telemetry(continent_code: str):
    return {
        "continent": continent_code,
        "listener_count": 0,
        "peak_hour_utc": 20,
        "avg_session_minutes": 12.5,
        "top_stations": [],
    }


@app.post("/transcribe")
def transcribe(req: TranscribeRequest):
    return {
        "text": "Live broadcast in progress...",
        "confidence": 0.95,
        "station_id": req.station_id,
        "timestamp": time.time(),
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
