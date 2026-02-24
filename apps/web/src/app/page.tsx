"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import PinLegend from "@/components/PinLegend";
import LiveStrip from "@/components/LiveStrip";
import { continents, formatListeners } from "@/lib/mockData";

const Globe = dynamic(() => import("@/components/Globe"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-center">
        <div
          className="w-16 h-16 rounded-full border-2 animate-spin mx-auto mb-4"
          style={{ borderColor: "#00d4ff", borderTopColor: "transparent" }}
        />
        <p className="text-sm" style={{ color: "#9999bb" }}>
          Loading Globe…
        </p>
      </div>
    </div>
  ),
});

export default function GlobeDiscoveryPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0a0a0f" }}>
      <NavBar />
      <div className="flex flex-1 pt-14 pb-10">
        <div className="flex-1 relative" style={{ minHeight: "calc(100vh - 96px)" }}>
          <Globe />
        </div>
        <div className="w-72 flex-shrink-0 p-6 flex flex-col gap-6 overflow-y-auto">
          <PinLegend />
          <div>
            <p className="text-xs font-semibold tracking-widest mb-3" style={{ color: "#9999bb" }}>
              CONTINENTS
            </p>
            <div className="flex flex-col gap-2">
              {continents.map((c) => (
                <Link key={c.slug} href={`/continent/${c.slug}`} className="block no-underline group">
                  <div
                    className="rounded-lg p-3 transition-all group-hover:scale-[1.02]"
                    style={{ background: "#111118", border: "1px solid #1f1f2e" }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-white">{c.name}</span>
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ background: c.color, boxShadow: `0 0 6px ${c.color}` }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs" style={{ color: "#9999bb" }}>
                        {c.stations.toLocaleString()} stations
                      </span>
                      <span className="text-xs font-semibold" style={{ color: c.color }}>
                        {formatListeners(c.listeners)} live
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <LiveStrip />
    </div>
  );
}
