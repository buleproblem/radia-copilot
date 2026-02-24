"use client";
import { continents, formatListeners } from "@/lib/mockData";

export default function LiveStrip() {
  const totalListeners = continents.reduce((acc, c) => acc + c.listeners, 0);

  return (
    <div
      style={{
        background: "rgba(10,10,15,0.9)",
        borderTop: "1px solid #1f1f2e",
        padding: "8px 24px",
      }}
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center gap-8 overflow-x-auto"
    >
      <div className="flex items-center gap-2 flex-shrink-0">
        <span
          className="w-2 h-2 rounded-full animate-pulse"
          style={{ background: "#00d4ff", boxShadow: "0 0 6px #00d4ff" }}
        />
        <span className="text-xs font-semibold" style={{ color: "#00d4ff" }}>
          LIVE
        </span>
        <span className="text-xs" style={{ color: "#9999bb" }}>
          {formatListeners(totalListeners)} listeners worldwide
        </span>
      </div>
      <div className="flex items-center gap-6">
        {continents.map((c) => (
          <div key={c.slug} className="flex items-center gap-2 flex-shrink-0">
            <span className="text-xs" style={{ color: "#9999bb" }}>
              {c.name}
            </span>
            <span className="text-xs font-medium" style={{ color: c.color }}>
              {formatListeners(c.listeners)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
