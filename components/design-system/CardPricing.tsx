import { CSSProperties } from "react";
import { PrincipalButton } from "./PrincipalButton";

export function CardPricing({
  variant = "blue",
  title = "En vivo",
  subtitle = "Conecta y aprende",
  eyebrow = "PRECIO EARLY BIRD",
  price = "$180",
  oldPrice = "$250",
  ctaLabel = "Quiero inscribirme",
  footnote = "*Pago completo o en 2 partes",
  benefits = [
    "12 clases en vivo (30 horas)",
    "Acceso ilimitado al material y las clases",
    "Webflow CMS 1 año gratis",
    "Certificado al completar el programa",
  ],
  onCtaClick,
  style,
}: {
  variant?: "blue" | "dark";
  title?: string;
  subtitle?: string;
  eyebrow?: string;
  price?: string;
  oldPrice?: string;
  ctaLabel?: string;
  footnote?: string;
  benefits?: string[];
  onCtaClick?: () => void;
  style?: CSSProperties;
}) {
  const dark = variant === "dark";
  const bg = dark ? "var(--black)" : "var(--blue)";
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 460,
        flex: "1 1 380px",
        minWidth: 0,
        borderRadius: 16,
        background: bg,
        padding: 48,
        display: "flex",
        flexDirection: "column",
        gap: 40,
        boxSizing: "border-box",
        ...style,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <span style={{ font: "400 48px/1 'Manrope',sans-serif", letterSpacing: "-0.03em", color: "var(--white)" }}>
            {title}
          </span>
          <span style={{ font: "300 24px/1 'Work Sans',sans-serif", color: "var(--white)" }}>{subtitle}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 16 }}>
          <span style={{ font: "500 20px/1 'Work Sans',sans-serif", color: "var(--yellow)" }}>{eyebrow}</span>
          <span style={{ font: "600 48px/1 'Work Sans',sans-serif", color: "var(--yellow)" }}>{price}</span>
          <span
            style={{
              font: "400 24px/1 'Work Sans',sans-serif",
              color: "var(--yellow)",
              textDecoration: "line-through",
            }}
          >
            {oldPrice}
          </span>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <PrincipalButton variant="light" style={{ width: "100%" }} onClick={onCtaClick}>
          {ctaLabel}
        </PrincipalButton>
        <span style={{ font: "300 14px/1 'Work Sans',sans-serif", color: "var(--white)", textAlign: "center" }}>
          {footnote}
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ font: "600 18px/1 'Work Sans',sans-serif", color: "var(--white)", marginBottom: 8 }}>
          Beneficios:
        </span>
        {benefits.map((b, i) => (
          <div
            key={i}
            style={{
              padding: "16px 0",
              borderTop: "1px solid rgba(255,255,255,0.2)",
              borderBottom: i === benefits.length - 1 ? "1px solid rgba(255,255,255,0.2)" : "none",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span style={{ color: "var(--yellow)" }}>✓</span>
            <span style={{ font: "300 16px/1.3 'Work Sans',sans-serif", color: "var(--white)" }}>{b}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
