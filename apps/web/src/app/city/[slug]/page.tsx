import Link from "next/link";
import NavBar from "@/components/NavBar";
import LiveStrip from "@/components/LiveStrip";
import PinBadge from "@/components/PinBadge";
import { cityStations, formatListeners } from "@/lib/mockData";

// In a real app this would be dynamic; we use New York as the mock city
export default async function CityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cityName = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <div className="min-h-screen" style={{ background: "#0a0a0f" }}>
      <NavBar />
      <div className="pt-20 pb-16 px-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="text-xs tracking-widest no-underline inline-flex items-center gap-1 mb-4" style={{ color: "#9999bb" }}>
            ← GLOBE
          </Link>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-3xl">🏙️</span>
            <div>
              <h1 className="text-4xl font-bold text-white">{cityName}</h1>
              <p className="text-sm mt-1" style={{ color: "#9999bb" }}>
                {cityStations.length} stations broadcasting live
              </p>
            </div>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          {(["All", "Terrestrial", "Internet", "Creator", "Talk"] as const).map((f) => (
            <button
              key={f}
              className="text-xs px-3 py-1.5 rounded-full transition-colors"
              style={{
                background: f === "All" ? "#00d4ff22" : "#1f1f2e",
                border: `1px solid ${f === "All" ? "#00d4ff44" : "#1f1f2e"}`,
                color: f === "All" ? "#00d4ff" : "#9999bb",
                cursor: "pointer",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Station list */}
        <div className="flex flex-col gap-3">
          {cityStations.map((station, i) => (
            <div
              key={station.id}
              className="rounded-xl p-4 flex items-center gap-4"
              style={{ background: "#111118", border: "1px solid #1f1f2e" }}
            >
              {/* Rank */}
              <div className="w-8 text-center flex-shrink-0">
                <span className="text-lg font-bold" style={{ color: "#1f1f2e" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Station info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-white truncate">{station.name}</span>
                  <PinBadge type={station.pinType} size="sm" />
                </div>
                {station.currentSong && (
                  <div className="flex items-center gap-2">
                    <span
                      className="w-1.5 h-1.5 rounded-full animate-pulse flex-shrink-0"
                      style={{ background: "#00d4ff" }}
                    />
                    <span className="text-xs truncate" style={{ color: "#9999bb" }}>
                      {station.currentSong}
                      {station.artist ? ` — ${station.artist}` : ""}
                    </span>
                  </div>
                )}
              </div>

              {/* Listener count */}
              <div className="flex-shrink-0 text-right">
                <p className="text-sm font-semibold" style={{ color: "#00d4ff" }}>
                  {formatListeners(station.listeners)}
                </p>
                <p className="text-xs" style={{ color: "#9999bb" }}>
                  listening
                </p>
              </div>

              {/* Tune In button */}
              <Link
                href={`/room/${station.id}`}
                className="flex-shrink-0 no-underline"
              >
                <button
                  className="px-4 py-2 rounded-lg text-xs font-semibold transition-all hover:scale-105"
                  style={{
                    background: "#00d4ff22",
                    border: "1px solid #00d4ff44",
                    color: "#00d4ff",
                    cursor: "pointer",
                  }}
                >
                  Tune In
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <LiveStrip />
    </div>
  );
}
