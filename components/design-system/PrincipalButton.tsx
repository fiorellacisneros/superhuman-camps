import { ButtonHTMLAttributes, CSSProperties, useRef } from "react";

const VARIANTS: Record<string, CSSProperties> = {
  primary: { background: "var(--blue)", color: "var(--white)" },
  dark: { background: "var(--black)", color: "var(--white)" },
  light: { background: "var(--white)", color: "var(--black)" },
  outline: {
    background: "transparent",
    color: "var(--white)",
    boxShadow: "inset 0 0 0 1px var(--white)",
  },
};

export function PrincipalButton({
  variant = "dark",
  children,
  style,
  ...rest
}: {
  variant?: "primary" | "dark" | "light" | "outline";
  children?: React.ReactNode;
  style?: CSSProperties;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  const ref = useRef<HTMLButtonElement>(null);
  const base: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: "12px 24px",
    borderRadius: "var(--radius-full)",
    border: "none",
    cursor: "pointer",
    font: "500 20px/1 'Work Sans',sans-serif",
    whiteSpace: "nowrap",
    transition: "opacity 0.15s ease, transform 0.1s ease",
    ...VARIANTS[variant],
    ...style,
  };
  return (
    <button
      ref={ref}
      style={base}
      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = "1";
        e.currentTarget.style.transform = "scale(1)";
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
