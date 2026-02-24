import { PIN_COLORS, PIN_ICONS, PinType } from "@/lib/mockData";

interface PinBadgeProps {
  type: PinType;
  size?: "sm" | "md";
}

export default function PinBadge({ type, size = "md" }: PinBadgeProps) {
  const color = PIN_COLORS[type];
  const icon = PIN_ICONS[type];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-medium ${
        size === "sm" ? "text-xs px-2 py-0.5" : "text-xs px-2.5 py-1"
      }`}
      style={{
        background: `${color}18`,
        border: `1px solid ${color}44`,
        color: color,
      }}
    >
      <span>{icon}</span>
      <span className="capitalize">{type}</span>
    </span>
  );
}
