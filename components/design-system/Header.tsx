import { CSSProperties } from "react";

export function Header({
  title = "Complementa tus habilidades",
  subtitle = "Más cursos especializados en herramientas modernas.",
  align = "center",
  color = "var(--black)",
  style,
}: {
  title?: string;
  subtitle?: string;
  align?: "center" | "left";
  color?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 32,
        alignItems: align === "center" ? "center" : "flex-start",
        textAlign: align,
        ...style,
      }}
    >
      <span style={{ font: "400 64px/1 'Manrope',sans-serif", letterSpacing: "-0.03em", color }}>
        {title}
      </span>
      <span style={{ font: "300 24px/1.3 'Work Sans',sans-serif", color }}>{subtitle}</span>
    </div>
  );
}

export function DataStat({
  value = "100%",
  label = "Estudiantes",
  style,
}: {
  value?: string;
  label?: string;
  style?: CSSProperties;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, ...style }}>
      <span style={{ font: "400 64px/1 'Manrope',sans-serif", letterSpacing: "-0.03em", color: "var(--black)" }}>
        {value}
      </span>
      <span style={{ font: "300 28px/1 'Work Sans',sans-serif", color: "var(--black)" }}>{label}</span>
    </div>
  );
}
