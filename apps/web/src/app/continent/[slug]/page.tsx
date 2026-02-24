import { notFound } from "next/navigation";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import LiveStrip from "@/components/LiveStrip";
import PinBadge from "@/components/PinBadge";
import { continents, formatListeners } from "@/lib/mockData";

export function generateStaticParams() {
  return continents.map((c) => ({ slug: c.slug }));
}

export default async function ContinentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const continent = continents.find((c) => c.slug === slug);
  if (!continent) notFound();

  return (
    <div className="min-h-screen" style={{ background: "#0a0a0f" }}>
      <NavBar />
      <div className="pt-20 pb-16 px-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="text-xs tracking-widest no-underline mb-4 inline-flex items-center gap-1"
            style={{ color: "#9999bb" }}
          >
            ← GLOBE
          </Link>
          <div className="flex items-center gap-4 mt-2">
            <span
              className="w-4 h-4 rounded-full"
              style={{
                background: continent.color,
                boxShadow: `0 0 12px ${continent.color}`,
              }}
            />
            <h1 className="text-4xl font-bold text-white">{continent.name}</h1>
          </div>
          <div className="flex items-center gap-6 mt-3">
            <div>
              <span className="text-2xl font-semibold" style={{ color: continent.color }}>
                {formatListeners(continent.listeners)}
              </span>
              <span className="text-sm ml-2" style={{ color: "#9999bb" }}>
                live listeners
              </span>
            </div>
            <div>
              <span className="text-2xl font-semibold text-white">
                {continent.stations.toLocaleString()}
              </span>
              <span className="text-sm ml-2" style={{ color: "#9999bb" }}>
                stations
              </span>
            </div>
          </div>
        </div>

        {/* Continent map placeholder */}
        <div
          className="rounded-2xl mb-8 flex items-center justify-center relative overflow-hidden"
          style={{
            background: "#0d1520",
            border: `1px solid ${continent.color}33`,
            height: "200px",
          }}
        >
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, ${continent.color}, transparent 70%)`,
            }}
          />
          <div className="text-center z-10">
            <p className="text-lg font-semibold" style={{ color: continent.color }}>
              {continent.name}
            </p>
            <p className="text-xs mt-1" style={{ color: "#9999bb" }}>
              {continent.countries.length} countries · {continent.stations.toLocaleString()} stations
            </p>
          </div>
        </div>

        {/* Countries & stations */}
        <div className="flex flex-col gap-8">
          {continent.countries.map((country) => (
            <div key={country.slug}>
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-xl font-semibold text-white">{country.name}</h2>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "#1f1f2e", color: "#9999bb" }}>
                  {country.stations.length} stations
                </span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {country.stations.map((station) => (
                  <Link
                    key={station.id}
                    href={`/room/${station.id}`}
                    className="block no-underline group"
                  >
                    <div
                      className="rounded-xl p-4 transition-all group-hover:scale-[1.02] group-hover:border-opacity-60"
                      style={{
                        background: "#111118",
                        border: "1px solid #1f1f2e",
                      }}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-white truncate">{station.name}</p>
                          <p className="text-xs mt-0.5" style={{ color: "#9999bb" }}>
                            {station.city}
                            {station.frequency ? ` · ${station.frequency}` : ""}
                          </p>
                        </div>
                        <PinBadge type={station.pinType} size="sm" />
                      </div>
                      {station.currentSong && (
                        <div
                          className="rounded-lg px-3 py-2 mt-3"
                          style={{ background: "#0a0a0f" }}
                        >
                          <p className="text-xs truncate text-white">{station.currentSong}</p>
                          {station.artist && (
                            <p className="text-xs truncate mt-0.5" style={{ color: "#9999bb" }}>
                              {station.artist}
                            </p>
                          )}
                        </div>
                      )}
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs" style={{ color: "#9999bb" }}>
                          {formatListeners(station.listeners)} listening
                        </span>
                        <span className="text-xs" style={{ color: "#00d4ff" }}>
                          Tune In →
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <LiveStrip />
    </div>
  );
}
