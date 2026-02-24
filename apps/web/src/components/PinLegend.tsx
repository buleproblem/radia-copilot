import { PIN_COLORS, PIN_ICONS, PIN_LABELS, PinType } from "@/lib/mockData";

export default function PinLegend() {
  const types: PinType[] = ["terrestrial", "internet", "creator", "talk"];
  return (
    <div
      style={{
        background: "rgba(17,17,24,0.9)",
        border: "1px solid #1f1f2e",
        borderRadius: "12px",
        padding: "16px 20px",
      }}
    >
      <p className="text-xs font-semibold tracking-widest mb-3" style={{ color: "#9999bb" }}>
        PIN TAXONOMY
      </p>
      <div className="flex flex-col gap-2">
        {types.map((type) => (
          <div key={type} className="flex items-center gap-3">
            <span className="text-base">{PIN_ICONS[type]}</span>
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: PIN_COLORS[type], boxShadow: `0 0 6px ${PIN_COLORS[type]}` }}
            />
            <span className="text-xs" style={{ color: "#ccccdd" }}>
              {PIN_LABELS[type]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
