import { CSSProperties } from "react";

const BG: Record<string, string> = {
  yellow: "var(--yellow)",
  dark: "var(--black)",
  blue: "var(--blue)",
  outline: "transparent",
};
const TEXT: Record<string, string> = {
  yellow: "var(--black)",
  dark: "var(--white)",
  blue: "var(--white)",
  outline: "var(--black)",
};
const LINK: Record<string, string> = {
  yellow: "var(--blue)",
  dark: "var(--yellow)",
  blue: "var(--yellow)",
  outline: "var(--blue)",
};

export function PromoCard({
  variant = "yellow",
  heading = "by HUMAN only HUMAN.",
  note = "(SPOILER ALERT: Habrá bocaditos!)",
  body = "Ellos confiaron en nosotros y se quedaron, ahora tú puedes ser 1 de ellos.",
  linkText = "Otra frasesita por aquí",
  style,
}: {
  variant?: "yellow" | "dark" | "blue" | "outline";
  heading?: string;
  note?: string;
  body?: string;
  linkText?: string;
  style?: CSSProperties;
}) {
  const outline = variant === "outline";
  return (
    <div
      style={{
        width: 410,
        borderRadius: "var(--radius-md)",
        background: BG[variant],
        boxShadow: outline ? "inset 0 0 0 1px var(--border-subtle)" : "none",
        padding: 32,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 32,
        minHeight: 260,
        boxSizing: "border-box",
        ...style,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
        <div style={{ font: "400 28px/1.05 'Manrope',sans-serif", letterSpacing: "-0.03em", color: TEXT[variant] }}>
          {heading}
        </div>
        <div
          style={{
            font: "400 22px 'Reenie Beanie',cursive",
            color: "var(--blue)",
            transform: "rotate(-3deg)",
            whiteSpace: "nowrap",
          }}
        >
          {note}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ font: "300 16px/1.4 'Work Sans',sans-serif", color: TEXT[variant] }}>{body}</div>
        <div style={{ font: "400 22px 'Reenie Beanie',cursive", color: LINK[variant] }}>{linkText}</div>
      </div>
    </div>
  );
}
