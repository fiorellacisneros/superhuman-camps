import { CSSProperties, ReactNode } from "react";

const BG: Record<string, string> = {
  yellow: "var(--yellow)",
  dark: "var(--black)",
  blue: "var(--blue)",
  light: "var(--white)",
  outline: "transparent",
};
const TEXT: Record<string, string> = {
  yellow: "var(--black)",
  dark: "var(--white)",
  blue: "var(--white)",
  light: "var(--black)",
  outline: "var(--black)",
};
const LINK: Record<string, string> = {
  yellow: "var(--blue)",
  dark: "var(--yellow)",
  blue: "var(--yellow)",
  light: "var(--blue)",
  outline: "var(--blue)",
};

export function PromoCard({
  variant = "yellow",
  heading = "by HUMAN only HUMAN.",
  note = "(SPOILER ALERT: Habrá bocaditos!)",
  body = "Ellos confiaron en nosotros y se quedaron, ahora tú puedes ser 1 de ellos.",
  linkText = "Otra frasesita por aquí",
  icon,
  style,
}: {
  variant?: "yellow" | "dark" | "blue" | "light" | "outline";
  heading?: string;
  note?: string;
  body?: string;
  linkText?: string;
  icon?: ReactNode;
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
        padding: "32px 32px 56px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        gap: 32,
        minHeight: 260,
        boxSizing: "border-box",
        ...style,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ font: "400 28px/1.05 'Manrope',sans-serif", letterSpacing: "-0.03em", color: TEXT[variant] }}>
          {heading}
        </div>
        <div
          style={{
            font: "400 22px 'Reenie Beanie',cursive",
            color: "var(--blue)",
            transform: "rotate(-3deg)",
            transformOrigin: "left center",
          }}
        >
          {note}
        </div>
      </div>
      {icon && <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flex: "1 1 auto" }}>{icon}</div>}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ font: "300 16px/1.4 'Work Sans',sans-serif", color: TEXT[variant] }}>{body}</div>
        <div style={{ font: "400 22px 'Reenie Beanie',cursive", color: LINK[variant] }}>{linkText}</div>
      </div>
    </div>
  );
}
