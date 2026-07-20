"use client";

import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Tag } from "@/components/design-system/Tag";
import { PrincipalButton } from "@/components/design-system/PrincipalButton";
import { TextButton } from "@/components/design-system/TextButton";
import { Header, DataStat } from "@/components/design-system/Header";
import { CardAprendizaje } from "@/components/design-system/CardAprendizaje";
import { CardPricing } from "@/components/design-system/CardPricing";
import { PromoCard } from "@/components/design-system/PromoCard";
import { Loader } from "@/components/design-system/Loader";

type AppId = "figma" | "webflow" | "finder" | "photos" | "notas" | "spotify" | null;
type HoverId = "figma" | "webflow" | "photos" | "finder" | "notas" | "spotify" | null;

type WhatsAppContact = { name: string; firstName: string; phone: string; photo: string };

const WHATSAPP_CONTACTS: WhatsAppContact[] = [
  { name: "Fio Cisneros", firstName: "Fio", phone: "51936098806", photo: "/superhuman/fio-cisneros.jpg" },
  { name: "Dani Rosas", firstName: "Dani", phone: "51937845233", photo: "/superhuman/mentor-1.jpg" },
];

function beginDrag(
  e: { clientX: number; clientY: number },
  origin: { x: number; y: number },
  setPos: (p: { x: number; y: number }) => void,
  onClick: () => void
) {
  const startX = e.clientX;
  const startY = e.clientY;
  const DRAG_THRESHOLD = 6;
  let moved = false;
  const onMove = (ev: MouseEvent) => {
    const dx = ev.clientX - startX;
    const dy = ev.clientY - startY;
    if (!moved && Math.abs(dx) < DRAG_THRESHOLD && Math.abs(dy) < DRAG_THRESHOLD) return;
    moved = true;
    setPos({ x: origin.x + dx, y: origin.y + dy });
  };
  const onUp = () => {
    window.removeEventListener("mousemove", onMove);
    window.removeEventListener("mouseup", onUp);
    if (!moved) onClick();
  };
  window.addEventListener("mousemove", onMove);
  window.addEventListener("mouseup", onUp);
}

const FIGMA_BENEFITS_LIVE = [
  "10 clases en vivo (24 horas)",
  "Acceso ilimitado al material y las clases",
  "Librería de componentes Figma incluida",
  "Certificado al completar el programa",
];
const FIGMA_BENEFITS_RECORDED = [
  "10 clases grabadas (24 horas)",
  "Acceso limitado al material y las clases",
  "Librería de componentes Figma incluida",
  "Certificado al completar el programa",
];
const WEBFLOW_BENEFITS_RECORDED = [
  "12 clases grabadas (30 horas)",
  "Acceso al material y las clases",
  "2 sesiones grupales para feedback y dudas (1 sesión por mes)",
  "Ejercicios para practicar lo aprendido",
  "Certificado al completar el programa",
];

const WEBFLOW_MODULES = [
  { number: "01", title: "Comprender el valor de Webflow", body: "Qué es Webflow y cómo utilizarlo para crear sitios web sin código. Aprenderás Client-First, naming conventions y organización profesional de proyectos." },
  { number: "02", title: "Identificar y construir layouts profesionales", body: "Usarás Flexbox y Grid para construir layouts responsivos y eficientes. Implementarás buenas prácticas en la maquetación." },
  { number: "03", title: "Gestionar contenido dinámico", body: "Crearás y gestionarás Collections, templates y contenido dinámico. Configurarás relaciones entre colecciones y estructuras escalables." },
  { number: "04", title: "Acelerar con herramientas profesionales", body: "Usarás Relume para construir 10x más rápido con componentes profesionales y workflows optimizados que mejoran tu productividad." },
  { number: "05", title: "Mejorar la experiencia del usuario", body: "Interacciones y animaciones para mejorar la experiencia. Scroll effects, micro-animaciones y transiciones que elevan tu diseño." },
  { number: "06", title: "Publicar y optimizar para resultados", body: "Optimizar y publicar tu sitio web en Webflow, asegurando un rendimiento óptimo, mejor posicionamiento SEO y resultados medibles." },
];

const WEBFLOW_MOTIVOS = [
  { title: "Construye proyectos reales", body: "Crearás sitios web profesionales desde cero. No solo teoría, construirás un proyecto completo que puedes usar en tu portfolio." },
  { title: "Acelera tu carrera profesional", body: "Webflow es una de las herramientas más demandadas en el mercado. Aumenta tu valor como profesional y obtén nuevas oportunidades laborales." },
  { title: "Aprende de expertos certificados", body: "Estudia con Webflow Educators certificados de forHuman, la primera agencia en Perú experta en Webflow." },
];

const WEBFLOW_PERKS = [
  { variant: "blue" as const, heading: "Figma Educator", note: "*Solo proyectos personales", body: "Accede gratis al plan Professional de Figma como participante del camp.", icon: "/superhuman/icon-figma.svg", iconKind: "color" as const },
  { variant: "dark" as const, heading: "Relume Pro — 2 meses gratis", note: "*Durante el curso", body: "Acceso completo a la librería de componentes profesionales. Webflow + Figma integrados. Construye 10x más rápido con componentes pre-diseñados y workflows optimizados.", icon: "/superhuman/icon-relume.png", iconKind: "color" as const },
  { variant: "yellow" as const, heading: "Merch oficial", note: "*Válido para Perú", body: "Participa de las actividades que tendremos presenciales y llévate merch oficial.", icon: "/superhuman/icon-webflow-mark.svg", iconKind: "mask" as const },
];

const WEBFLOW_FAQ = [
  { q: "¿Necesito saber código?", a: "No. Webflow Camp es un curso de nivel básico, pensado para personas que están empezando. No necesitas conocimientos previos de programación para llevar el curso con éxito." },
  { q: "¿Necesito saber diseño?", a: "Tampoco. Durante el curso trabajaremos con un diseño en Figma que usaremos en clase para desarrollarlo paso a paso en Webflow. Además, para el proyecto final podrás usar una herramienta con IA que te ayudará a generar un diseño base, llevarlo a Figma y luego desarrollarlo en Webflow." },
  { q: "¿Las clases quedan grabadas?", a: "Sí. Todas las clases se graban y se suben al día siguiente para que puedas verlas con calma o ponerte al día si no pudiste asistir en vivo." },
  { q: "¿Cómo funciona la modalidad On-Demand?", a: "Las clases principales se dictan en vivo martes y jueves de 7 a 9pm Perú y se graban. Como estudiante On-Demand recibirás las grabaciones al día siguiente. Además tendrás acceso a 2 sesiones grupales en vivo al mes para resolver dudas junto a otros estudiantes On-Demand." },
  { q: "¿Cómo funcionan los retos semanales?", a: "Cada semana tendrás un reto práctico donde aplicarás lo aprendido en clase. Estos retos te ayudan a consolidar el conocimiento y avanzar paso a paso en tu proyecto final." },
  { q: "¿Qué necesito técnicamente?", a: "• Laptop\n• Conexión a internet estable\n• Ganas de construir 🚀" },
  { q: "¿Se puede pagar en 2 cuotas?", a: "Sí. Ofrecemos pago en 2 partes: 50% al momento de inscribirte y 50% antes de que inicien las clases." },
];

const REAL_PHOTOS = ["/superhuman/mentor-1.jpg", "/superhuman/mentor-2.jpg", "/superhuman/fio-cisneros.jpg"];

function PhotoSlot({ index }: { index: number }) {
  const src = REAL_PHOTOS[index % REAL_PHOTOS.length];
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="Foto"
      style={{ width: "100%", aspectRatio: "1 / 1", borderRadius: 10, objectFit: "cover", display: "block" }}
    />
  );
}

function TrafficLights({ onClose, hovered, onHoverChange }: { onClose: () => void; hovered: boolean; onHoverChange: (v: boolean) => void }) {
  const dot = (bg: string, glyph: ReactNode, onClick?: () => void) => (
    <div
      onClick={onClick}
      style={{
        width: 16,
        height: 16,
        borderRadius: "50%",
        background: bg,
        boxShadow: "inset 0 0 0 0.5px rgba(0,0,0,0.45)",
        cursor: onClick ? "pointer" : undefined,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {hovered && glyph}
    </div>
  );
  return (
    <div style={{ display: "flex", gap: 8 }} onMouseEnter={() => onHoverChange(true)} onMouseLeave={() => onHoverChange(false)}>
      {dot("#FF5C60", <div style={{ width: 11, height: 11, background: "url(/superhuman/icon-traffic-close.svg) center / contain no-repeat" }} />, onClose)}
      {dot("#FAC800", <div style={{ width: 11, height: 2, background: "url(/superhuman/icon-traffic-minimize.svg) center / contain no-repeat" }} />)}
      {dot("#35C759", <div style={{ width: 11, height: 11, background: "url(/superhuman/icon-traffic-maximize.svg) center / contain no-repeat" }} />)}
    </div>
  );
}

function WindowChrome({
  title,
  bg = "var(--white)",
  onClose,
  closing = false,
  sidebar,
  onToggleSidebar,
  inset = { top: "5%", left: "7%", right: "7%", bottom: "5%" },
  titleBarVariant = "dark",
  children,
}: {
  title: string;
  bg?: string;
  onClose: () => void;
  closing?: boolean;
  sidebar?: ReactNode;
  onToggleSidebar?: () => void;
  inset?: { top?: string; left: string; right: string; bottom?: string };
  titleBarVariant?: "dark" | "light";
  children: ReactNode;
}) {
  const titleColor = titleBarVariant === "light" ? "#0D0D0D" : "#F7F7F7";
  const fitHeight = !inset.bottom;
  const [trafficHover, setTrafficHover] = useState(false);
  const appWindow = (
    <div
      className={`shs-app-window${closing ? " shs-app-window-closing" : ""}`}
      style={{
        position: fitHeight ? "relative" : "absolute",
        top: fitHeight ? undefined : inset.top,
        left: fitHeight ? undefined : inset.left,
        right: fitHeight ? undefined : inset.right,
        bottom: fitHeight ? undefined : inset.bottom,
        width: fitHeight ? "100%" : undefined,
        maxHeight: fitHeight ? "100%" : undefined,
        background: bg,
        borderRadius: 14,
        overflow: "hidden",
        boxShadow: "0 30px 80px rgba(0,0,0,0.55)",
        display: "flex",
        flexDirection: "column",
      }}
      onClick={(e) => e.stopPropagation()}
    >
        <div
          style={{
            height: 32,
            background:
              titleBarVariant === "light"
                ? "rgba(128,128,128,0.55)"
                : "linear-gradient(rgba(30,30,30,0.55),rgba(30,30,30,0.55)),#1E1E1E",
            backdropFilter: titleBarVariant === "light" ? "blur(80px)" : "blur(5px)",
            display: "flex",
            alignItems: "center",
            padding: "0 14px",
            position: "relative",
            flexShrink: 0,
            boxShadow: "inset 0 0 0 0.67px rgba(255,255,255,0.1)",
          }}
        >
          <TrafficLights onClose={onClose} hovered={trafficHover} onHoverChange={setTrafficHover} />
          {onToggleSidebar && (
            <div
              onClick={onToggleSidebar}
              style={{
                width: 26,
                height: 24,
                marginLeft: 14,
                borderRadius: 6,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: 19,
                  height: 15,
                  backgroundColor: titleColor,
                  WebkitMaskImage: "url(/superhuman/icon-sidebar-toggle.svg)",
                  maskImage: "url(/superhuman/icon-sidebar-toggle.svg)",
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  maskPosition: "center",
                }}
              />
            </div>
          )}
          <span
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              font: "500 13px/1 'Work Sans',sans-serif",
              color: titleColor,
              whiteSpace: "nowrap",
            }}
          >
            {title}
          </span>
        </div>
        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
          {sidebar}
          <div className="shs-scroll" style={{ overflowY: "auto", flex: 1, background: bg }}>
            {children}
          </div>
        </div>
      </div>
  );

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 100,
        background: "rgba(0,0,0,0.3)",
        opacity: closing ? 0 : 1,
        transition: closing ? "opacity 0.22s ease" : undefined,
        pointerEvents: closing ? "none" : undefined,
      }}
      onClick={onClose}
    >
      {fitHeight ? (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: inset.left,
            right: inset.right,
            transform: "translateY(-50%)",
            maxHeight: "80%",
            display: "flex",
          }}
        >
          {appWindow}
        </div>
      ) : (
        appWindow
      )}
    </div>
  );
}

const FINDER_SECTIONS = [
  { id: "nosotras", label: "Nosotras" },
  { id: "cifras", label: "Cifras" },
  { id: "mentores", label: "Mentores" },
];

const FIGMA_SECTIONS = [
  { id: "figma-inicio", label: "Inicio" },
  { id: "figma-programa", label: "Programa" },
  { id: "figma-bono", label: "Bono" },
  { id: "figma-social", label: "Cupos" },
  { id: "figma-precios", label: "Precios" },
];

const WEBFLOW_SECTIONS = [
  { id: "webflow-inicio", label: "Inicio" },
  { id: "webflow-programa", label: "Programa" },
  { id: "webflow-motivos", label: "Motivos" },
  { id: "webflow-bono", label: "Regalos" },
  { id: "webflow-social", label: "Testimonios" },
  { id: "webflow-precios", label: "Precios" },
  { id: "webflow-mentores", label: "Mentoras" },
  { id: "webflow-faq", label: "Preguntas" },
];

const WEBFLOW_TESTIMONIALS = [
  {
    quote:
      "Un programa muy bueno para cualquier nivel de experiencia en Webflow. Dani y Fio son muy agradables, accesibles, sobretodo orientadas a las buenas prácticas dentro de Webflow. Fue un excelente curso para partir de una buena base.",
    author: "Alumna, Webflow Camp",
  },
  {
    quote: "Excelente curso, siembra muy buenas bases para trabajar con Webflow.",
    author: "Alumno, Webflow Camp",
  },
];

const FOTOS_SECTIONS = [
  { id: "favoritos", label: "Favoritos", icon: "/superhuman/icon-favoritos.svg" },
  { id: "mascotas", label: "Mascotas", icon: "/superhuman/icon-mascotas.svg" },
  { id: "recientes", label: "Reciente", icon: "/superhuman/icon-reciente.svg" },
];

function AppSidebar({
  label = "Secciones",
  sections,
  active,
  onSelect,
  open,
}: {
  label?: string;
  sections: { id: string; label: string; icon?: string }[];
  active: string;
  onSelect: (id: string) => void;
  open: boolean;
}) {
  return (
    <div
      style={{
        width: open ? 190 : 0,
        flexShrink: 0,
        background: "#E6E6E6",
        borderRight: open ? "1px solid rgba(13,13,13,0.08)" : "none",
        overflow: "hidden",
        transition: "width 0.24s cubic-bezier(0.22, 1, 0.36, 1)",
        boxSizing: "border-box",
      }}
    >
      <div style={{ width: 190, padding: "20px 10px", boxSizing: "border-box" }}>
        <div style={{ font: "600 11px/1 'Inconsolata',monospace", letterSpacing: "0.12em", color: "#6B6B6B", textTransform: "uppercase", padding: "0 10px", marginBottom: 10 }}>
          {label}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {sections.map((s) => {
            const isActive = active === s.id;
            return (
              <div
                key={s.id}
                onClick={() => onSelect(s.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 9,
                  padding: "8px 10px",
                  borderRadius: 7,
                  background: isActive ? "#F2F2F2" : "transparent",
                  boxShadow: isActive ? "0 0 0 1px rgba(13,13,13,0.06)" : "none",
                  transition: "background 0.22s ease, box-shadow 0.22s ease",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    width: 14,
                    height: 14,
                    flexShrink: 0,
                    backgroundColor: "#0078F0",
                    WebkitMaskImage: `url(${s.icon ?? "/superhuman/icon-doc.svg"})`,
                    maskImage: `url(${s.icon ?? "/superhuman/icon-doc.svg"})`,
                    WebkitMaskSize: "contain",
                    maskSize: "contain",
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                    maskPosition: "center",
                  }}
                />
                <span style={{ font: "400 13px/1.2 'Work Sans',sans-serif", color: "#0D0D0D" }}>{s.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function MobileScreen({
  title,
  bg,
  onClose,
  closing = false,
  children,
}: {
  title: string;
  bg: string;
  onClose: () => void;
  closing?: boolean;
  children: ReactNode;
}) {
  const [trafficHover, setTrafficHover] = useState(false);
  return (
    <div
      className={`shs-app-window${closing ? " shs-app-window-closing" : ""}`}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 60,
        background: bg,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          height: "calc(env(safe-area-inset-top, 0px) + 32px)",
          background: "linear-gradient(rgba(30,30,30,0.55),rgba(30,30,30,0.55)),#1E1E1E",
          display: "flex",
          alignItems: "flex-end",
          padding: "0 14px 8px",
          position: "relative",
          flexShrink: 0,
          boxShadow: "inset 0 0 0 0.67px rgba(255,255,255,0.1)",
        }}
      >
        <TrafficLights onClose={onClose} hovered={trafficHover} onHoverChange={setTrafficHover} />
        <span
          style={{
            position: "absolute",
            left: "50%",
            bottom: 8,
            transform: "translateX(-50%)",
            font: "500 13px/1 'Work Sans',sans-serif",
            color: "#F7F7F7",
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </span>
      </div>
      <div className="shs-scroll" style={{ flex: 1, overflowY: "auto", background: bg, WebkitOverflowScrolling: "touch" }}>
        {children}
      </div>
    </div>
  );
}

function LoadingScreen() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Loader size={30} />
    </div>
  );
}

function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1, minWidth: 320 }}>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={item.q}
            style={{
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.16)",
              padding: "20px 24px",
              cursor: "pointer",
            }}
            onClick={() => setOpenIndex(isOpen ? null : i)}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
              <span style={{ font: "500 18px/1.3 'Work Sans',sans-serif", color: "var(--white)" }}>{item.q}</span>
              <span
                style={{
                  font: "400 22px/1 'Work Sans',sans-serif",
                  color: "var(--yellow)",
                  transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                  transition: "transform 0.2s ease",
                  flexShrink: 0,
                }}
              >
                +
              </span>
            </div>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.33, 1, 0.68, 1] }}
                  style={{ overflow: "hidden" }}
                >
                  <p style={{ font: "300 15px/1.5 'Work Sans',sans-serif", color: "rgba(255,255,255,0.75)", margin: "16px 0 0", whiteSpace: "pre-line" }}>
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

function Reveal({
  children,
  delay = 0,
  style,
}: {
  children: ReactNode;
  delay?: number;
  style?: CSSProperties;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.33, 1, 0.68, 1] }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

function RevealGroup({
  children,
  style,
  staggerDelay = 0.08,
}: {
  children: ReactNode[];
  style?: CSSProperties;
  staggerDelay?: number;
}) {
  return (
    <div style={style}>
      {children.map((child, i) => (
        <Reveal key={i} delay={i * staggerDelay}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}

function MomentumCard({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  const [hover, setHover] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  return (
    <motion.div
      style={{ cursor: "default", ...style }}
      onMouseEnter={() => setHover(true)}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const relX = (e.clientX - rect.left) / rect.width - 0.5;
        const relY = (e.clientY - rect.top) / rect.height - 0.5;
        setOffset({ x: relX * 14, y: relY * 14 });
      }}
      onMouseLeave={() => {
        setHover(false);
        setOffset({ x: 0, y: 0 });
      }}
      animate={{ x: offset.x, y: offset.y - (hover ? 6 : 0) }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
    >
      {children}
    </motion.div>
  );
}

function StackedPerks({ items }: { items: typeof WEBFLOW_PERKS }) {
  const [order, setOrder] = useState(items.map((_, i) => i));
  const next = () => setOrder((o) => [...o.slice(1), o[0]]);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 32 }}>
      <div style={{ position: "relative", width: 410, height: 300 }}>
        {items.map((item, i) => {
          const pos = order.indexOf(i);
          const tilt = pos === 0 ? 0 : pos % 2 === 0 ? pos * 2 : pos * -2;
          return (
            <motion.div
              key={item.heading}
              animate={{ y: pos * 16, scale: 1 - pos * 0.05, rotate: tilt, zIndex: items.length - pos }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              style={{ position: "absolute", inset: 0, pointerEvents: pos === 0 ? "auto" : "none" }}
            >
              <div style={{ position: "relative" }}>
                <PromoCard variant={item.variant} heading={item.heading} note={item.note} body={item.body} linkText="" style={{ width: 410, height: 260 }} />
                {item.iconKind === "mask" ? (
                  <div
                    style={{
                      position: "absolute",
                      top: 32,
                      right: 32,
                      width: 32,
                      height: 32,
                      backgroundColor: item.variant === "yellow" ? "var(--black)" : "var(--white)",
                      WebkitMaskImage: `url(${item.icon})`,
                      maskImage: `url(${item.icon})`,
                      WebkitMaskSize: "contain",
                      maskSize: "contain",
                      WebkitMaskRepeat: "no-repeat",
                      maskRepeat: "no-repeat",
                      WebkitMaskPosition: "center",
                      maskPosition: "center",
                    }}
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.icon} alt="" style={{ position: "absolute", top: 32, right: 32, width: 40, height: 40, borderRadius: 10, objectFit: "contain" }} />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
      <button
        onClick={next}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          padding: "12px 24px",
          borderRadius: "var(--radius-full)",
          border: "none",
          background: "var(--white)",
          color: "var(--black)",
          font: "500 16px/1 'Work Sans',sans-serif",
          cursor: "pointer",
        }}
      >
        <span style={{ fontSize: 18 }}>↻</span> Descubre
      </button>
    </div>
  );
}

function FigmaBody() {
  return (
    <>
      <section id="figma-inicio" style={{ padding: "64px 64px 56px 64px", display: "flex", flexDirection: "column", gap: 24 }}>
        <Tag>Nuevo · Inicia 10 Marzo · 15 plazas · 4 semanas</Tag>
        <h1 style={{ font: "400 56px/1 'Manrope',sans-serif", letterSpacing: "-0.03em", color: "var(--black)", margin: 0, maxWidth: 820 }}>
          Figma Camp
        </h1>
        <p style={{ font: "300 22px/1.3 'Work Sans',sans-serif", color: "var(--black)", maxWidth: 680, margin: 0 }}>
          Programa intensivo para dominar Figma: sistemas de diseño, prototipado y handoff con desarrollo. De cero a listo para producción.
        </p>
        <div style={{ display: "flex", gap: 24, marginTop: 8 }}>
          <PrincipalButton variant="primary">Quiero inscribirme</PrincipalButton>
          <TextButton href="#">Ver beneficios</TextButton>
        </div>
      </section>
      <section id="figma-programa" style={{ padding: "0 64px 80px 64px", display: "flex", flexDirection: "column", gap: 32 }}>
        <Header
          title="El programa"
          subtitle="Al finalizar tendrás el conocimiento y las herramientas para diseñar, prototipar y entregar interfaces listas para producción."
          align="left"
        />
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          <CardAprendizaje number="01" title="Fundamentos de Figma" body="Interfaz, componentes y auto layout para trabajar rápido y ordenado." />
          <CardAprendizaje number="02" title="Sistemas de diseño" body="Variables, estilos y librerías compartidas para escalar cualquier proyecto." />
          <CardAprendizaje number="03" title="Prototipado y handoff" body="Interacciones realistas y especificaciones claras para developers." />
        </div>
      </section>
      <section id="figma-bono" style={{ background: "var(--black)", padding: 64, display: "flex", justifyContent: "center" }}>
        <PromoCard variant="yellow" />
      </section>
      <section id="figma-social" style={{ background: "var(--blue-light)", padding: "48px 64px", display: "flex", alignItems: "center", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
        <Tag style={{ background: "var(--pure-white)" }}>Primera edición · Grupo reducido</Tag>
        <span style={{ font: "400 22px/1.3 'Manrope',sans-serif", color: "var(--black)", textAlign: "center" }}>
          Solo 15 cupos por cohorte, para que la mentoría sea realmente 1 a 1.
        </span>
      </section>
      <section id="figma-precios" style={{ padding: "80px 64px", display: "flex", flexDirection: "column", gap: 32, alignItems: "center" }}>
        <Header title="Tarjetas de precio" subtitle="Elige la modalidad que más te convenga." />
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center" }}>
          <CardPricing variant="blue" title="En vivo" subtitle="Conecta y aprende" price="$150" oldPrice="$220" benefits={FIGMA_BENEFITS_LIVE} />
          <CardPricing variant="dark" title="Grabado" subtitle="Aprende a tu ritmo" price="$100" oldPrice="$150" benefits={FIGMA_BENEFITS_RECORDED} />
        </div>
      </section>
    </>
  );
}

function WebflowBody() {
  return (
    <>
      <section id="webflow-inicio" style={{ padding: "64px 64px 56px 64px", display: "flex", flexDirection: "column", gap: 24 }}>
        <Reveal>
          <Tag>Early Bird · Inicia 25 Febrero · 15 plazas · 5 semanas</Tag>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 style={{ font: "400 56px/1 'Manrope',sans-serif", letterSpacing: "-0.03em", color: "var(--black)", margin: 0, maxWidth: 820 }}>
            Webflow Camp
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p style={{ font: "300 22px/1.3 'Work Sans',sans-serif", color: "var(--black)", maxWidth: 680, margin: 0 }}>
            Programa intensivo donde aprendes a construir sitios web profesionales desde la maquetación hasta la publicación, aplicando buenas prácticas. Sin código. Sin excusas.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <div style={{ display: "flex", gap: 24, marginTop: 8 }}>
            <PrincipalButton variant="primary">Quiero inscribirme</PrincipalButton>
            <TextButton href="#">Ver beneficios</TextButton>
          </div>
        </Reveal>
      </section>
      <section id="webflow-programa" style={{ padding: "0 64px 80px 64px", display: "flex", flexDirection: "column", gap: 32 }}>
        <Header
          title="El programa"
          subtitle="Al finalizar tendrás el conocimiento y las herramientas para crear y lanzar sitios web sin depender de código."
          align="left"
        />
        <RevealGroup style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          {WEBFLOW_MODULES.map((m) => (
            <CardAprendizaje key={m.number} number={m.number} title={m.title} body={m.body} />
          ))}
        </RevealGroup>
      </section>
      <section id="webflow-motivos" style={{ background: "var(--gray-100)", padding: "64px", display: "flex", flexDirection: "column", gap: 32 }}>
        <Header title="De principiante a builder profesional" subtitle="Motivos para llevar el curso" align="left" />
        <RevealGroup style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          {WEBFLOW_MOTIVOS.map((m) => (
            <div
              key={m.title}
              style={{
                width: 340,
                background: "var(--pure-white)",
                borderRadius: "var(--radius-md)",
                padding: 28,
                display: "flex",
                flexDirection: "column",
                gap: 16,
                boxSizing: "border-box",
              }}
            >
              <div style={{ width: 32, height: 4, borderRadius: 2, background: "var(--blue)" }} />
              <div style={{ font: "400 24px/1.15 'Manrope',sans-serif", letterSpacing: "-0.03em", color: "var(--black)" }}>{m.title}</div>
              <div style={{ font: "300 15px/1.4 'Work Sans',sans-serif", color: "var(--gray-500)" }}>{m.body}</div>
            </div>
          ))}
        </RevealGroup>
      </section>
      <section id="webflow-bono" style={{ background: "var(--black)", padding: 64, display: "flex", flexDirection: "column", gap: 32, alignItems: "center" }}>
        <Header
          title="No solo aprendes. También tienes regalos."
          subtitle="Cada estudiante recibe acceso a herramientas profesionales de la industria."
          color="var(--white)"
        />
        <Reveal>
          <StackedPerks items={WEBFLOW_PERKS} />
        </Reveal>
      </section>
      <section id="webflow-social" style={{ background: "var(--blue-light)", padding: "64px", display: "flex", flexDirection: "column", gap: 40, alignItems: "center" }}>
        <RevealGroup style={{ display: "flex", gap: 64, flexWrap: "wrap", justifyContent: "center" }}>
          <DataStat value="150+" label="Alumnos formados en Webflow Camp" />
          <DataStat value="9.3/10" label="Recomendarían el curso a un amigo o colega" />
          <DataStat value="15" label="Cupos por cohorte — grupo reducido" />
        </RevealGroup>
        <RevealGroup style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center" }}>
          {WEBFLOW_TESTIMONIALS.map((t) => (
            <div
              key={t.author}
              style={{
                width: 360,
                background: "var(--pure-white)",
                borderRadius: "var(--radius-md)",
                padding: 28,
                display: "flex",
                flexDirection: "column",
                gap: 16,
                boxSizing: "border-box",
              }}
            >
              <span style={{ font: "300 17px/1.5 'Work Sans',sans-serif", color: "var(--black)" }}>
                &ldquo;{t.quote}&rdquo;
              </span>
              <span style={{ font: "500 13px/1 'Work Sans',sans-serif", color: "var(--blue)" }}>{t.author}</span>
            </div>
          ))}
        </RevealGroup>
      </section>
      <section id="webflow-precios" style={{ padding: "80px 64px", display: "flex", flexDirection: "column", gap: 32, alignItems: "center" }}>
        <Header title="Tarjetas de precio" subtitle="Elige la modalidad que más te convenga." />
        <RevealGroup style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center" }}>
          <CardPricing
            variant="blue"
            title="En vivo"
            subtitle="Conecta y aprende"
            price="$180"
            oldPrice="$250"
            onCtaClick={() =>
              window.open(
                `https://api.whatsapp.com/send/?phone=%2B51936098806&text=${encodeURIComponent("Hola Fio, me interesa el curso en vivo")}&type=phone_number&app_absent=0`,
                "_blank",
                "noopener,noreferrer"
              )
            }
          />
          <CardPricing
            variant="dark"
            title="On-Demand"
            subtitle="Aprende a tu ritmo"
            price="$120"
            oldPrice="$180"
            footnote="*Pago único - La grabación es de las clases en vivo"
            benefits={WEBFLOW_BENEFITS_RECORDED}
            onCtaClick={() =>
              window.open(
                `https://api.whatsapp.com/send/?phone=%2B51936098806&text=${encodeURIComponent("Hola Fio, me interesa el curso on-demand")}&type=phone_number&app_absent=0`,
                "_blank",
                "noopener,noreferrer"
              )
            }
          />
        </RevealGroup>
      </section>
      <section id="webflow-mentores" style={{ padding: "80px 64px", display: "flex", flexDirection: "column", gap: 40 }}>
        <Header title="Aprende de Webflow Educators certificadas" subtitle="Al finalizar tendrás el conocimiento y las herramientas para crear y lanzar sitios web sin depender de código." align="left" />
        <RevealGroup style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          <MomentumCard style={{ width: 260, borderRadius: "var(--radius-md)", overflow: "hidden", position: "relative" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/superhuman/fio-cisneros.jpg" alt="Fiorella Cisneros" style={{ width: "100%", aspectRatio: "4 / 5", objectFit: "cover", display: "block" }} />
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "24px 20px", background: "linear-gradient(0deg, rgba(0,0,0,0.75), transparent)" }}>
              <div style={{ font: "500 20px/1 'Manrope',sans-serif", color: "var(--white)" }}>Fiorella Cisneros</div>
              <div style={{ font: "300 13px/1 'Work Sans',sans-serif", color: "rgba(255,255,255,0.8)" }}>Webflow Educator</div>
            </div>
          </MomentumCard>
          <MomentumCard style={{ width: 260, borderRadius: "var(--radius-md)", overflow: "hidden", position: "relative" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/superhuman/mentor-1.jpg" alt="Danitza Rosas" style={{ width: "100%", aspectRatio: "4 / 5", objectFit: "cover", display: "block" }} />
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "24px 20px", background: "linear-gradient(0deg, rgba(0,0,0,0.75), transparent)" }}>
              <div style={{ font: "500 20px/1 'Manrope',sans-serif", color: "var(--white)" }}>Danitza Rosas</div>
              <div style={{ font: "300 13px/1 'Work Sans',sans-serif", color: "rgba(255,255,255,0.8)" }}>Webflow Designer</div>
            </div>
          </MomentumCard>
        </RevealGroup>
      </section>
      <section id="webflow-faq" style={{ background: "var(--black)", padding: "80px 64px", display: "flex", gap: 64, flexWrap: "wrap" }}>
        <Reveal style={{ maxWidth: 400, display: "flex", flexDirection: "column", gap: 16 }}>
          <span style={{ font: "600 13px/1 'Inconsolata',monospace", letterSpacing: "0.1em", color: "var(--yellow)", textTransform: "uppercase" }}>
            Antes de empezar
          </span>
          <h2 style={{ font: "400 40px/1.15 'Manrope',sans-serif", letterSpacing: "-0.03em", color: "var(--white)", margin: 0 }}>
            ¿Tienes dudas? Aquí las resolvemos
          </h2>
          <p style={{ font: "300 16px/1.4 'Work Sans',sans-serif", color: "rgba(255,255,255,0.75)", margin: 0 }}>
            Sabemos que siempre surgen preguntas. Aquí te dejamos las respuestas a las dudas más frecuentes sobre Webflow Camp.
          </p>
        </Reveal>
        <FaqAccordion items={WEBFLOW_FAQ} />
      </section>
    </>
  );
}

function FinderBody() {
  return (
    <>
      <section id="nosotras" style={{ padding: "80px 64px", display: "flex", flexDirection: "column", gap: 24 }}>
        <span style={{ font: "600 13px/1 'Inconsolata',monospace", letterSpacing: "0.1em", color: "var(--gray-500)", textTransform: "uppercase" }}>
          00 — NOSOTRAS
        </span>
        <h1 style={{ font: "400 52px/1.1 'Manrope',sans-serif", letterSpacing: "-0.03em", color: "var(--black)", margin: 0, maxWidth: 820 }}>
          De agencia a escuela: <span style={{ fontStyle: "italic", color: "var(--blue)" }}>así nació superHuman.</span>
        </h1>
        <p style={{ font: "300 22px/1.4 'Work Sans',sans-serif", color: "var(--black)", maxWidth: 720, margin: 0 }}>
          forHuman Studio es la primera agencia en Perú certificada como Webflow Expert y Webflow Educator. Después de construir sitios para decenas de marcas, decidimos enseñar lo que sabemos — así nació superHuman School.
        </p>
        <p style={{ font: "300 20px/1.4 'Work Sans',sans-serif", color: "var(--gray-500)", maxWidth: 720, margin: 0 }}>
          Hoy formamos builders que lanzan su propia marca, sin depender de agencias ni de código. Webflow Camp y Figma Camp son el punto de partida.
        </p>
      </section>
      <section id="cifras" style={{ background: "var(--blue-light)", padding: 64, display: "flex", gap: 64, flexWrap: "wrap", justifyContent: "center" }}>
        <DataStat value="100%" label="Estudiantes practicando en vivo" />
        <DataStat value="+200" label="Builders graduados en LATAM" />
        <DataStat value="2" label="Programas: Webflow Camp y Figma Camp" />
      </section>
      <section id="mentores" style={{ padding: "80px 64px", display: "flex", flexDirection: "column", gap: 40 }}>
        <Header title="Aprende de Webflow Educators certificadas" subtitle="Mentoras activas en la industria, enseñando lo que aplican todos los días." align="left" />
        <RevealGroup style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.2, ease: [0.33, 1, 0.68, 1] }}
            style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start", width: 220, cursor: "default" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/superhuman/fio-cisneros.jpg" style={{ width: 96, height: 96, borderRadius: "50%", objectFit: "cover" }} alt="Fiorella Cisneros" />
            <span style={{ font: "500 18px/1 'Work Sans',sans-serif", color: "var(--black)" }}>Fiorella Cisneros</span>
            <span style={{ font: "300 15px/1.3 'Work Sans',sans-serif", color: "var(--gray-500)" }}>Webflow Educator, forHuman Studio</span>
          </motion.div>
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.2, ease: [0.33, 1, 0.68, 1] }}
            style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start", width: 220, cursor: "default" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/superhuman/mentor-1.jpg" style={{ width: 96, height: 96, borderRadius: "50%", objectFit: "cover" }} alt="Danitza Rosas" />
            <span style={{ font: "500 18px/1 'Work Sans',sans-serif", color: "var(--black)" }}>Danitza Rosas</span>
            <span style={{ font: "300 15px/1.3 'Work Sans',sans-serif", color: "var(--gray-500)" }}>Webflow Designer, forHuman Studio</span>
          </motion.div>
        </RevealGroup>
      </section>
    </>
  );
}

function FotosSection({ id, title, count }: { id: string; title: string; count: number }) {
  return (
    <div id={id} style={{ padding: "16px 20px 28px" }}>
      <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", marginBottom: 14, aspectRatio: "16 / 8" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={REAL_PHOTOS[0]} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent 60%)" }} />
        <div style={{ position: "absolute", left: 16, bottom: 12, color: "#F7F7F7" }}>
          <div style={{ font: "700 22px/1 'Manrope',sans-serif" }}>{title}</div>
          <div style={{ font: "400 12px/1 'Work Sans',sans-serif", opacity: 0.85 }}>{count} fotos</div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
        {Array.from({ length: count }).map((_, i) => (
          <PhotoSlot key={i} index={i} />
        ))}
      </div>
    </div>
  );
}

function FotosBody() {
  return (
    <div className="shs-scroll" style={{ overflowY: "auto", flex: 1, background: "var(--white)", paddingBottom: 24 }}>
      <FotosSection id="favoritos" title="Favoritos" count={6} />
      <FotosSection id="mascotas" title="Mascotas" count={6} />
      <FotosSection id="recientes" title="Reciente" count={6} />
    </div>
  );
}

const SPOTIFY_PLAYLIST_URL = "https://open.spotify.com/embed/playlist/1B4v3p7vMeE1GVJBMjd1Ft?utm_source=generator&theme=0";

function SpotifyBody() {
  return (
    <div style={{ flex: 1, background: "#0D0D0D", padding: 24, boxSizing: "border-box", overflowY: "auto" }}>
      <iframe
        title="Playlist de Spotify"
        style={{ borderRadius: 12, border: 0 }}
        src={SPOTIFY_PLAYLIST_URL}
        width="100%"
        height="352"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    </div>
  );
}

const FULL_MONTHS = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

function formatNotesDateTime(date: Date) {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${date.getDate()} de ${FULL_MONTHS[date.getMonth()]} de ${date.getFullYear()}, ${hours}:${minutes}`;
}

function ManifiestoHighlight({ children }: { children: ReactNode }) {
  return <span className="shs-ios-select">{children}</span>;
}

function ManifiestoBody({ now, compact = false }: { now: Date | null; compact?: boolean }) {
  const pad = compact ? "16px 20px 40px" : "24px 56px 64px";
  return (
    <div style={{ padding: pad, display: "flex", flexDirection: "column", gap: 20, maxWidth: 720 }}>
      <span style={{ font: "400 13px/1 'Work Sans',sans-serif", color: "rgba(247,247,247,0.5)", textAlign: "center" }}>
        {now ? formatNotesDateTime(now) : ""}
      </span>
      <h1
        style={{
          fontFamily: "'Manrope', sans-serif",
          fontWeight: 700,
          fontSize: compact ? 26 : 38,
          lineHeight: 1.15,
          letterSpacing: "-0.01em",
          color: "#F7F7F7",
          margin: 0,
        }}
      >
        Aprender se aprende haciendo.
      </h1>
      <p style={{ font: `300 ${compact ? 15 : 18}px/1.6 'Work Sans',sans-serif`, color: "rgba(247,247,247,0.9)", margin: 0 }}>
        Creemos que el mejor diseño no se enseña con slides, se enseña construyendo. superHuman School nace de forHuman Studio: la misma agencia que factura, entrega y se equivoca en proyectos reales — ahora enseñando lo que de verdad usamos, no lo que se ve bien en un curso.
      </p>
      <p style={{ font: `300 ${compact ? 15 : 18}px/1.6 'Work Sans',sans-serif`, color: "rgba(247,247,247,0.9)", margin: 0 }}>
        No queremos graduados con certificado. Queremos builders con criterio: personas que salgan de acá sabiendo defender una decisión de diseño, no solo ejecutarla. Por eso cada camp lo dan quienes hoy mismo siguen
        <ManifiestoHighlight>trabajando con clientes reales, no solo enseñando teoría</ManifiestoHighlight>.
      </p>
      <p style={{ font: `300 ${compact ? 15 : 18}px/1.6 'Work Sans',sans-serif`, color: "rgba(247,247,247,0.9)", margin: 0 }}>
        En un mercado saturado de cursos grabados y certificados de fin de semana, el diferencial va a seguir siendo el mismo:
        <ManifiestoHighlight>oficio, criterio y comunidad</ManifiestoHighlight>.
      </p>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", marginTop: compact ? 8 : 24 }}>
        <span style={{ font: `400 ${compact ? 30 : 38}px/1 'Reenie Beanie',cursive`, color: "#F7F7F7" }}>Dani y Fio</span>
      </div>
    </div>
  );
}

function ContactIcon({ contact, size = 64 }: { contact: WhatsAppContact; size?: number }) {
  const badge = Math.round(size * 0.37);
  return (
    <>
      <div style={{ position: "relative", width: size, height: size }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={contact.photo} style={{ width: size, height: size, borderRadius: "50%", objectFit: "cover" }} alt={contact.name} />
        <div
          style={{
            position: "absolute",
            bottom: -3,
            right: -3,
            width: badge,
            height: badge,
            borderRadius: Math.round(badge * 0.3),
            background: "url(/superhuman/icon-whatsapp.svg) center / cover no-repeat",
            boxShadow: "0 2px 6px rgba(0,0,0,0.4)",
          }}
        />
      </div>
      <span
        style={{
          font: "400 11px/1.2 'Work Sans',sans-serif",
          color: "#F7F7F7",
          textShadow: "0 1px 3px rgba(0,0,0,0.6)",
          textAlign: "center",
          maxWidth: "100%",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {contact.name}
      </span>
    </>
  );
}

const dockIconBase: CSSProperties = { width: 56, height: 56, borderRadius: 14, cursor: "pointer", position: "relative" };

function DockTooltip({ label }: { label: string }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 80,
        left: "50%",
        transform: "translateX(-50%)",
        background: "rgba(30,30,30,0.92)",
        backdropFilter: "blur(10px)",
        color: "#F7F7F7",
        font: "400 13px/1 'Work Sans',sans-serif",
        padding: "8px 14px",
        borderRadius: 9,
        whiteSpace: "nowrap",
        boxShadow: "0 6px 18px rgba(0,0,0,0.35)",
        zIndex: 5,
      }}
    >
      {label}
      <div
        style={{
          position: "absolute",
          top: "100%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 0,
          height: 0,
          borderLeft: "6px solid transparent",
          borderRight: "6px solid transparent",
          borderTop: "6px solid rgba(30,30,30,0.92)",
        }}
      />
    </div>
  );
}

function DockIcon({
  label,
  hoverId,
  hovered,
  onHover,
  onClick,
  open = false,
  children,
}: {
  label: string;
  hoverId: HoverId;
  hovered: HoverId;
  onHover: (v: HoverId) => void;
  onClick?: () => void;
  open?: boolean;
  children: ReactNode;
}) {
  return (
    <div style={{ position: "relative" }} onMouseEnter={() => onHover(hoverId)} onMouseLeave={() => onHover(null)}>
      {hovered === hoverId && <DockTooltip label={label} />}
      <div className="shs-dock-icon" onClick={onClick} style={dockIconBase}>
        {children}
      </div>
      {open && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: -7,
            transform: "translateX(-50%)",
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: "#F7F7F7",
          }}
        />
      )}
    </div>
  );
}

const MENU_BAR_DAYS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const MENU_BAR_MONTHS = [
  "ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic",
];

function formatMenuBarDateTime(date: Date) {
  const day = MENU_BAR_DAYS[date.getDay()];
  const month = MENU_BAR_MONTHS[date.getMonth()];
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${day} ${date.getDate()} ${month}  ${hours}:${minutes}`;
}

export function MacDesktopExperience() {
  const [isMobile, setIsMobile] = useState(false);
  const [openApp, setOpenApp] = useState<AppId>(null);
  const [loadingApp, setLoadingApp] = useState<AppId>(null);
  const [closingApp, setClosingApp] = useState<AppId>(null);
  const [hoveredApp, setHoveredApp] = useState<HoverId>(null);
  const [now, setNow] = useState<Date | null>(null);
  const [deviceScale, setDeviceScale] = useState(1);
  const [folderPos, setFolderPos] = useState({ x: 0, y: 52 });
  const [contactPositions, setContactPositions] = useState(
    WHATSAPP_CONTACTS.map((_, i) => ({ x: 0, y: 168 + i * 116 }))
  );
  const [finderSidebarOpen, setFinderSidebarOpen] = useState(false);
  const [finderSection, setFinderSection] = useState("nosotras");
  const [figmaSidebarOpen, setFigmaSidebarOpen] = useState(false);
  const [figmaSection, setFigmaSection] = useState("figma-inicio");
  const [webflowSidebarOpen, setWebflowSidebarOpen] = useState(false);
  const [webflowSection, setWebflowSection] = useState("webflow-inicio");
  const [fotosSidebarOpen, setFotosSidebarOpen] = useState(false);
  const [fotosSection, setFotosSection] = useState("favoritos");

  const goToSection = (setActive: (id: string) => void, id: string) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    if (window.innerWidth >= 860) {
      setFinderSidebarOpen(true);
      setFigmaSidebarOpen(true);
      setWebflowSidebarOpen(true);
      setFotosSidebarOpen(true);
    }
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 860);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const w = window.innerWidth;
    setFolderPos({ x: w - 168, y: 56 });
    setContactPositions([
      { x: w - 360, y: 220 },
      { x: w - 150, y: 320 },
    ]);
  }, []);

  useEffect(() => {
    setNow(new Date());
    const tick = setInterval(() => setNow(new Date()), 1000 * 30);
    return () => clearInterval(tick);
  }, []);

  const openWhatsApp = (contact: WhatsAppContact) => {
    const text = encodeURIComponent(`Hola ${contact.firstName}, me interesa el curso en vivo`);
    window.open(`https://api.whatsapp.com/send/?phone=%2B${contact.phone}&text=${text}&type=phone_number&app_absent=0`, "_blank", "noopener,noreferrer");
  };

  const closeApp = () => {
    setLoadingApp(null);
    if (!openApp) return;
    setClosingApp(openApp);
    setOpenApp(null);
    window.setTimeout(() => setClosingApp(null), 220);
  };

  const openWindow = (id: Exclude<AppId, null>) => {
    if (id !== "photos") {
      setOpenApp(id);
      return;
    }
    setLoadingApp(id);
    setOpenApp(null);
    window.setTimeout(() => {
      setOpenApp(id);
      setLoadingApp(null);
    }, 700);
  };

  const windowTitles: Record<Exclude<AppId, null>, string> = {
    figma: "superHuman — Figma Camp",
    webflow: "superHuman — Webflow Camp",
    finder: "Finder — forHuman",
    photos: "Fotos",
    notas: "Manifiesto.txt",
    spotify: "Spotify — Playlist",
  };

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden", fontFamily: "'Work Sans',sans-serif", background: "#000" }}>
      {!isMobile && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            background: "linear-gradient(160deg,#1c2c8f 0%,#012EDC 26%,#0D0D0D 68%,#000000 100%)",
          }}
        >
          {/* Menu bar */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 28,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 16px",
              zIndex: 50,
              font: "400 13px/1 'Work Sans',sans-serif",
              color: "#F7F7F7",
              textShadow: "0 1px 3px rgba(0,0,0,0.35)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <div style={{ width: 14, height: 14, background: "url(/superhuman/logo-superhuman.svg) center / contain no-repeat" }} />
              <span style={{ fontWeight: 700 }}>superHuman</span>
              <span>Archivo</span>
              <span>Edición</span>
              <span>Ver</span>
              <span>Ventana</span>
              <span>Ayuda</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <circle cx="10" cy="10" r="7" stroke="#F7F7F7" strokeWidth="2" />
                <line x1="15.5" y1="15.5" x2="21" y2="21" stroke="#F7F7F7" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <svg width="16" height="12" viewBox="0 0 19 12">
                <path d="M9.5 3.2C11.8 3.2 13.9 4.1 15.4 5.6L16.5 4.5C14.7 2.7 12.2 1.5 9.5 1.5C6.8 1.5 4.3 2.7 2.5 4.5L3.6 5.6C5.1 4.1 7.2 3.2 9.5 3.2Z" fill="#F7F7F7" />
                <path d="M9.5 6.8C10.9 6.8 12.1 7.3 13 8.2L14.1 7.1C12.8 5.9 11.2 5.1 9.5 5.1C7.8 5.1 6.2 5.9 4.9 7.1L6 8.2C6.9 7.3 8.1 6.8 9.5 6.8Z" fill="#F7F7F7" />
                <circle cx="9.5" cy="10.5" r="1.5" fill="#F7F7F7" />
              </svg>
              <div style={{ width: 22, height: 11, border: "1.4px solid rgba(247,247,247,0.7)", borderRadius: 3, padding: 1.5, display: "flex", position: "relative" }}>
                <div style={{ width: "75%", height: "100%", background: "#F7F7F7", borderRadius: 1 }} />
                <div style={{ position: "absolute", right: -3, top: 3, width: 2, height: 5, background: "rgba(247,247,247,0.7)", borderRadius: "0 1px 1px 0" }} />
              </div>
              <span style={{ font: "400 13px/1 'Work Sans',sans-serif" }}>
                {now ? formatMenuBarDateTime(now) : ""}
              </span>
            </div>
          </div>

          {/* Widgets */}
          <div style={{ position: "absolute", top: 44, left: 24, display: "flex", flexDirection: "column", gap: 12, zIndex: 20, width: 320 }}>
            {/* Calendar widget */}
            <div
              style={{
                borderRadius: 20,
                background: "rgba(20,26,54,0.55)",
                backdropFilter: "blur(24px)",
                padding: 18,
                display: "flex",
                gap: 14,
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 2, flexShrink: 0 }}>
                <span style={{ font: "600 11px/1 'Inconsolata',monospace", letterSpacing: "0.08em", color: "rgba(247,247,247,0.6)", textTransform: "uppercase" }}>
                  {now ? MENU_BAR_DAYS[now.getDay()] : ""}
                </span>
                <span style={{ font: "400 40px/1 'Manrope',sans-serif", color: "#F7F7F7", letterSpacing: "-0.03em" }}>{now ? now.getDate() : ""}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1, minWidth: 0 }}>
                <span style={{ font: "600 11px/1 'Inconsolata',monospace", letterSpacing: "0.08em", color: "rgba(247,247,247,0.5)", textTransform: "uppercase" }}>Agosto</span>
                <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 12, padding: "8px 11px" }}>
                  <div style={{ font: "600 13px/1.3 'Work Sans',sans-serif", color: "#F7F7F7" }}>Webflow Camp</div>
                  <div style={{ font: "400 12px/1.3 'Inconsolata',monospace", color: "rgba(247,247,247,0.6)" }}>Mar y Jue · 7–9pm Perú</div>
                </div>
                <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 12, padding: "8px 11px", display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 20, height: 20, borderRadius: 6, background: "var(--blue)", flexShrink: 0 }} />
                  <div>
                    <div style={{ font: "600 13px/1.3 'Work Sans',sans-serif", color: "#F7F7F7" }}>Figma Camp</div>
                    <div style={{ font: "400 12px/1.3 'Inconsolata',monospace", color: "rgba(247,247,247,0.6)" }}>Mar y Jue · 7–9pm Perú</div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              {/* Reminders-style widget */}
              <div
                style={{
                  flex: 1,
                  minWidth: 0,
                  borderRadius: 20,
                  background: "rgba(28,22,20,0.55)",
                  backdropFilter: "blur(24px)",
                  padding: 16,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)",
                }}
              >
                <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                  <span style={{ font: "700 15px/1 'Work Sans',sans-serif", color: "#F7F7F7" }}>Hoy</span>
                  <span style={{ font: "500 12px/1 'Work Sans',sans-serif", color: "rgba(247,247,247,0.5)" }}>4</span>
                </div>
                {["Webflow Camp — Mar y Jue", "Figma Camp — Mar y Jue", "Cupos Early Bird", "Certificado final"].map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
                    <div style={{ width: 14, height: 14, borderRadius: "50%", boxShadow: "inset 0 0 0 1.5px rgba(247,247,247,0.5)", flexShrink: 0 }} />
                    <span
                      style={{
                        font: "300 12px/1.3 'Work Sans',sans-serif",
                        color: "rgba(247,247,247,0.92)",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Weather-style widget */}
              <div
                style={{
                  flex: 1,
                  minWidth: 0,
                  borderRadius: 20,
                  background: "rgba(28,22,20,0.55)",
                  backdropFilter: "blur(24px)",
                  padding: 16,
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)",
                }}
              >
                <span style={{ font: "600 13px/1 'Work Sans',sans-serif", color: "#F7F7F7" }}>Lima</span>
                <span style={{ font: "300 40px/1 'Manrope',sans-serif", color: "#F7F7F7", letterSpacing: "-0.03em" }}>19°</span>
                <svg width="26" height="18" viewBox="0 0 26 18" fill="none" style={{ marginTop: 2 }}>
                  <path
                    d="M6.5 13.5C3.46 13.5 1 11.14 1 8.25C1 5.36 3.46 3 6.5 3C7.03 3 7.54 3.08 8.02 3.22C8.98 1.5 10.87 0.5 13 0.5C15.99 0.5 18.46 2.63 18.94 5.4C21.24 5.75 23 7.68 23 10C23 12.49 20.98 14.5 18.5 14.5H7C6.83 14.5 6.66 14.5 6.5 14.5"
                    stroke="rgba(247,247,247,0.85)"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span style={{ font: "400 13px/1.3 'Work Sans',sans-serif", color: "rgba(247,247,247,0.85)" }}>Nublado</span>
                <span style={{ font: "300 12px/1.3 'Work Sans',sans-serif", color: "rgba(247,247,247,0.6)" }}>Máx.: 25° Mín.: 19°</span>
              </div>
            </div>
          </div>

          {/* Folder icon */}
          <div
            style={{ position: "absolute", left: folderPos.x, top: folderPos.y, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "grab", width: 84, zIndex: 20, userSelect: "none" }}
            onMouseDown={(e) => beginDrag(e, folderPos, setFolderPos, () => openWindow("finder"))}
          >
            <div style={{ width: 64, height: 59, background: "url(/superhuman/icon-folder.svg) center / contain no-repeat" }} />
            <span style={{ font: "400 12px/1.2 'Work Sans',sans-serif", color: "#F7F7F7", textShadow: "0 1px 3px rgba(0,0,0,0.6)" }}>forHuman</span>
          </div>

          {/* WhatsApp contact icons */}
          {WHATSAPP_CONTACTS.map((contact, i) => (
            <div
              key={contact.name}
              style={{ position: "absolute", left: contactPositions[i].x, top: contactPositions[i].y, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer", width: 84, zIndex: 20, userSelect: "none" }}
              onClick={() => openWhatsApp(contact)}
            >
              <ContactIcon contact={contact} />
            </div>
          ))}

          {/* Dock */}
          <div
            style={{
              position: "absolute",
              bottom: 14,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              alignItems: "flex-end",
              gap: 14,
              background: "rgba(247,247,247,0.25)",
              backdropFilter: "blur(24px)",
              borderRadius: 22,
              padding: "10px 14px",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.3)",
              zIndex: 30,
            }}
          >
            <DockIcon label="Finder" hoverId="finder" hovered={hoveredApp} onHover={setHoveredApp} onClick={() => openWindow("finder")} open={openApp === "finder"}>
              <div style={{ width: 56, height: 56, borderRadius: 14, background: "url(/superhuman/icon-finder-app.svg) center / cover no-repeat" }} />
            </DockIcon>
            <DockIcon label="Figma Camp" hoverId="figma" hovered={hoveredApp} onHover={setHoveredApp} onClick={() => openWindow("figma")} open={openApp === "figma"}>
              <div style={{ width: 56, height: 56, borderRadius: 14, background: "url(/superhuman/icon-figma.svg) center / cover no-repeat" }} />
            </DockIcon>
            <DockIcon label="Webflow Camp" hoverId="webflow" hovered={hoveredApp} onHover={setHoveredApp} onClick={() => openWindow("webflow")} open={openApp === "webflow"}>
              <div style={{ width: 56, height: 56, borderRadius: 14, background: "url(/superhuman/icon-webflow.svg) center / cover no-repeat" }} />
            </DockIcon>
            <DockIcon label="Fotos" hoverId="photos" hovered={hoveredApp} onHover={setHoveredApp} onClick={() => openWindow("photos")} open={openApp === "photos" || loadingApp === "photos"}>
              <div style={{ width: 56, height: 56, borderRadius: 14, background: "url(/superhuman/icon-fotos.svg) center / cover no-repeat" }} />
            </DockIcon>
            <DockIcon label="Notas" hoverId="notas" hovered={hoveredApp} onHover={setHoveredApp} onClick={() => openWindow("notas")} open={openApp === "notas"}>
              <div style={{ width: 56, height: 56, borderRadius: 14, background: "url(/superhuman/icon-notas.svg) center / cover no-repeat" }} />
            </DockIcon>
            <DockIcon label="Spotify" hoverId="spotify" hovered={hoveredApp} onHover={setHoveredApp} onClick={() => openWindow("spotify")} open={openApp === "spotify"}>
              <div style={{ width: 56, height: 56, borderRadius: 14, background: "url(/superhuman/icon-spotify.svg) center / cover no-repeat" }} />
            </DockIcon>
          </div>

          {loadingApp === "photos" && (
            <WindowChrome title={windowTitles.photos} bg="#1c1c1e" onClose={closeApp}>
              <LoadingScreen />
            </WindowChrome>
          )}
          {(openApp === "figma" || closingApp === "figma") && (
            <WindowChrome
              title={windowTitles.figma}
              onClose={closeApp}
              closing={closingApp === "figma"}
              onToggleSidebar={() => setFigmaSidebarOpen((v) => !v)}
              sidebar={<AppSidebar sections={FIGMA_SECTIONS} active={figmaSection} onSelect={(id) => goToSection(setFigmaSection, id)} open={figmaSidebarOpen} />}
            >
              <FigmaBody />
            </WindowChrome>
          )}
          {(openApp === "webflow" || closingApp === "webflow") && (
            <WindowChrome
              title={windowTitles.webflow}
              onClose={closeApp}
              closing={closingApp === "webflow"}
              onToggleSidebar={() => setWebflowSidebarOpen((v) => !v)}
              sidebar={<AppSidebar sections={WEBFLOW_SECTIONS} active={webflowSection} onSelect={(id) => goToSection(setWebflowSection, id)} open={webflowSidebarOpen} />}
            >
              <WebflowBody />
            </WindowChrome>
          )}
          {(openApp === "finder" || closingApp === "finder") && (
            <WindowChrome
              title={windowTitles.finder}
              onClose={closeApp}
              closing={closingApp === "finder"}
              onToggleSidebar={() => setFinderSidebarOpen((v) => !v)}
              sidebar={<AppSidebar sections={FINDER_SECTIONS} active={finderSection} onSelect={(id) => goToSection(setFinderSection, id)} open={finderSidebarOpen} />}
              inset={{ top: "10%", left: "14%", right: "14%", bottom: "10%" }}
            >
              <FinderBody />
            </WindowChrome>
          )}
          {(openApp === "photos" || closingApp === "photos") && (
            <WindowChrome
              title={windowTitles.photos}
              bg="var(--white)"
              onClose={closeApp}
              closing={closingApp === "photos"}
              onToggleSidebar={() => setFotosSidebarOpen((v) => !v)}
              sidebar={<AppSidebar label="Destacadas" sections={FOTOS_SECTIONS} active={fotosSection} onSelect={(id) => goToSection(setFotosSection, id)} open={fotosSidebarOpen} />}
              inset={{ left: "16%", right: "16%" }}
            >
              <FotosBody />
            </WindowChrome>
          )}
          {(openApp === "notas" || closingApp === "notas") && (
            <WindowChrome
              title={windowTitles.notas}
              bg="#0D0D0D"
              onClose={closeApp}
              closing={closingApp === "notas"}
              inset={{ left: "24%", right: "24%" }}
            >
              <ManifiestoBody now={now} />
            </WindowChrome>
          )}
          {(openApp === "spotify" || closingApp === "spotify") && (
            <WindowChrome
              title={windowTitles.spotify}
              bg="#0D0D0D"
              onClose={closeApp}
              closing={closingApp === "spotify"}
              inset={{ left: "30%", right: "30%" }}
            >
              <SpotifyBody />
            </WindowChrome>
          )}
        </div>
      )}

      {isMobile && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            overflowY: "auto",
            overflowX: "hidden",
            WebkitOverflowScrolling: "touch",
            background: "linear-gradient(160deg,#1c2c8f 0%,#012EDC 30%,#0D0D0D 75%)",
          }}
        >
          <div
            style={{
              position: "fixed",
              left: "50%",
              bottom: "calc(env(safe-area-inset-bottom, 0px) + 8px)",
              transform: "translateX(-50%)",
              width: 134,
              height: 5,
              borderRadius: 100,
              background: "rgba(247,247,247,0.7)",
              zIndex: 90,
              pointerEvents: "none",
            }}
          />
          {loadingApp === "photos" && (
            <div
              className="shs-app-window"
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 70,
                background: "#000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Loader size={30} />
            </div>
          )}

          {!openApp && !loadingApp && (
            <div style={{ display: "flex", flexDirection: "column", minHeight: "100dvh" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "calc(env(safe-area-inset-top,0px) + 14px) 16px 0",
                  color: "#F7F7F7",
                  textShadow: "0 1px 3px rgba(0,0,0,0.35)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 13, height: 13, background: "url(/superhuman/logo-superhuman.svg) center / contain no-repeat" }} />
                  <span style={{ font: "700 12px/1 'Work Sans',sans-serif" }}>superHuman</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <svg width="14" height="10.5" viewBox="0 0 19 12">
                    <path d="M9.5 3.2C11.8 3.2 13.9 4.1 15.4 5.6L16.5 4.5C14.7 2.7 12.2 1.5 9.5 1.5C6.8 1.5 4.3 2.7 2.5 4.5L3.6 5.6C5.1 4.1 7.2 3.2 9.5 3.2Z" fill="#F7F7F7" />
                    <path d="M9.5 6.8C10.9 6.8 12.1 7.3 13 8.2L14.1 7.1C12.8 5.9 11.2 5.1 9.5 5.1C7.8 5.1 6.2 5.9 4.9 7.1L6 8.2C6.9 7.3 8.1 6.8 9.5 6.8Z" fill="#F7F7F7" />
                    <circle cx="9.5" cy="10.5" r="1.5" fill="#F7F7F7" />
                  </svg>
                  <div style={{ width: 19, height: 9.5, border: "1.2px solid rgba(247,247,247,0.7)", borderRadius: 3, padding: 1.5, display: "flex", position: "relative" }}>
                    <div style={{ width: "75%", height: "100%", background: "#F7F7F7", borderRadius: 1 }} />
                    <div style={{ position: "absolute", right: -2.5, top: 2.5, width: 1.5, height: 4, background: "rgba(247,247,247,0.7)", borderRadius: "0 1px 1px 0" }} />
                  </div>
                  <span style={{ font: "400 12px/1 'Work Sans',sans-serif" }}>{now ? formatMenuBarDateTime(now) : ""}</span>
                </div>
              </div>
              <div style={{ padding: "14px 16px 16px", display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ borderRadius: 22, background: "rgba(13,13,13,0.4)", backdropFilter: "blur(24px)", padding: 16, display: "flex", flexDirection: "column", gap: 9, boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 2 }}>
                    <span style={{ font: "400 34px/1 'Manrope',sans-serif", color: "#F7F7F7", letterSpacing: "-0.03em" }}>{now ? now.getDate() : ""}</span>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span style={{ font: "600 10px/1 'Inconsolata',monospace", letterSpacing: "0.08em", color: "rgba(247,247,247,0.75)", textTransform: "uppercase" }}>
                        {now ? MENU_BAR_MONTHS[now.getMonth()] : ""}
                      </span>
                      <span style={{ font: "400 10px/1.2 'Inconsolata',monospace", color: "rgba(247,247,247,0.5)" }}>{now ? now.getFullYear() : ""}</span>
                    </div>
                  </div>
                  {[
                    ["Webflow Camp", "Mar y Jue · 7–9pm Perú"],
                    ["Figma Camp", "Mar y Jue · 7–9pm Perú"],
                  ].map(([title, detail]) => (
                    <div key={title} style={{ background: "rgba(255,255,255,0.09)", borderRadius: 10, padding: "8px 10px" }}>
                      <div style={{ font: "500 13px/1.3 'Work Sans',sans-serif", color: "#F7F7F7" }}>{title}</div>
                      <div style={{ font: "400 11px/1.3 'Inconsolata',monospace", color: "rgba(247,247,247,0.6)" }}>{detail}</div>
                    </div>
                  ))}
                </div>
                <div style={{ borderRadius: 22, background: "rgba(13,13,13,0.4)", backdropFilter: "blur(24px)", padding: 16, display: "flex", flexDirection: "column", gap: 10, boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ font: "500 13px/1 'Work Sans',sans-serif", color: "#F7F7F7" }}>Próximos lanzamientos</span>
                    <span style={{ font: "600 11px/1 'Work Sans',sans-serif", color: "#F7F7F7", background: "rgba(255,255,255,0.15)", borderRadius: 999, padding: "3px 8px" }}>4</span>
                  </div>
                  {["Webflow Camp — Mar y Jue", "Figma Camp — Mar y Jue", "Cupos Early Bird limitados", "Certificado al completar"].map((item) => (
                    <div key={item} style={{ display: "flex", alignItems: "center", gap: 9 }}>
                      <div style={{ width: 15, height: 15, borderRadius: "50%", boxShadow: "inset 0 0 0 1.5px rgba(247,247,247,0.55)", flexShrink: 0 }} />
                      <span style={{ font: "300 12px/1.3 'Work Sans',sans-serif", color: "rgba(247,247,247,0.92)" }}>{item}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginTop: 8 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }} onClick={() => openWindow("photos")}>
                    <div style={{ width: 56, height: 56, borderRadius: 14, background: "url(/superhuman/icon-fotos.svg) center / cover no-repeat", cursor: "pointer" }} />
                    <span style={{ font: "400 11px/1 'Work Sans',sans-serif", color: "#F7F7F7", textShadow: "0 1px 3px rgba(0,0,0,0.6)" }}>Fotos</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }} onClick={() => openWindow("spotify")}>
                    <div style={{ width: 56, height: 56, borderRadius: 14, background: "url(/superhuman/icon-spotify.svg) center / cover no-repeat", cursor: "pointer" }} />
                    <span style={{ font: "400 11px/1 'Work Sans',sans-serif", color: "#F7F7F7", textShadow: "0 1px 3px rgba(0,0,0,0.6)" }}>Spotify</span>
                  </div>
                  {WHATSAPP_CONTACTS.map((contact) => (
                    <div
                      key={contact.name}
                      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer", width: "100%", minWidth: 0 }}
                      onClick={() => openWhatsApp(contact)}
                    >
                      <ContactIcon contact={contact} size={56} />
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: "auto", padding: "10px 14px calc(env(safe-area-inset-bottom,0px) + 16px)", display: "flex", justifyContent: "center" }}>
                <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", width: "100%", background: "rgba(247,247,247,0.22)", backdropFilter: "blur(24px)", borderRadius: 26, padding: "12px 14px", boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.3)" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }} onClick={() => openWindow("finder")}>
                    <div style={{ width: 56, height: 56, borderRadius: 14, background: "url(/superhuman/icon-finder-app.svg) center / cover no-repeat", cursor: "pointer" }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }} onClick={() => openWindow("figma")}>
                    <div style={{ width: 56, height: 56, borderRadius: 14, background: "url(/superhuman/icon-figma.svg) center / cover no-repeat", cursor: "pointer" }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }} onClick={() => openWindow("webflow")}>
                    <div style={{ width: 56, height: 56, borderRadius: 14, background: "url(/superhuman/icon-webflow.svg) center / cover no-repeat", cursor: "pointer" }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }} onClick={() => openWindow("notas")}>
                    <div style={{ width: 56, height: 56, borderRadius: 14, background: "url(/superhuman/icon-notas.svg) center / cover no-repeat", cursor: "pointer" }} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {(openApp === "figma" || closingApp === "figma") && (
            <MobileScreen title={windowTitles.figma} bg="var(--white)" onClose={closeApp} closing={closingApp === "figma"}>
              <FigmaBody />
            </MobileScreen>
          )}

          {(openApp === "webflow" || closingApp === "webflow") && (
            <MobileScreen title={windowTitles.webflow} bg="var(--white)" onClose={closeApp} closing={closingApp === "webflow"}>
              <WebflowBody />
            </MobileScreen>
          )}

          {(openApp === "finder" || closingApp === "finder") && (
            <MobileScreen title={windowTitles.finder} bg="var(--white)" onClose={closeApp} closing={closingApp === "finder"}>
              <FinderBody />
            </MobileScreen>
          )}

          {(openApp === "photos" || closingApp === "photos") && (
            <MobileScreen title={windowTitles.photos} bg="var(--white)" onClose={closeApp} closing={closingApp === "photos"}>
              <FotosBody />
            </MobileScreen>
          )}

          {(openApp === "notas" || closingApp === "notas") && (
            <MobileScreen title={windowTitles.notas} bg="#0D0D0D" onClose={closeApp} closing={closingApp === "notas"}>
              <ManifiestoBody now={now} compact />
            </MobileScreen>
          )}

          {(openApp === "spotify" || closingApp === "spotify") && (
            <MobileScreen title={windowTitles.spotify} bg="#0D0D0D" onClose={closeApp} closing={closingApp === "spotify"}>
              <SpotifyBody />
            </MobileScreen>
          )}
        </div>
      )}
    </div>
  );
}
