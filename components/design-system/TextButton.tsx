import { AnchorHTMLAttributes, CSSProperties, ReactNode } from "react";

export function TextButton({
  children,
  style,
  ...rest
}: {
  children?: ReactNode;
  style?: CSSProperties;
} & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        font: "500 20px/1 'Work Sans',sans-serif",
        color: "var(--blue)",
        textDecoration: "none",
        cursor: "pointer",
        ...style,
      }}
      {...rest}
    >
      {children}
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M 8.304 0 L 16 8 L 8.304 16 L 6.836 14.474 L 12.026 9.079 L 0 9.079 L 0 6.921 L 12.026 6.921 L 6.836 1.526 L 8.304 0 Z" />
      </svg>
    </a>
  );
}
