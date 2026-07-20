# SuperHuman School

> La escuela de forHuman Studio — Webflow Camp y Figma Camp, construye sitios web profesionales sin código.

## Brand Identity

- **Personalidad:** Cercana, directa, con humor sutil — "by HUMAN only HUMAN."
- **Colores:** Negro `#0D0D0D`, blanco/hueso `#F7F7F7`, amarillo `#FFBE00`, azul `#012EDC`, azul claro `#DEE3FB` (fondos de tags)
- **Fuentes:** Manrope (títulos), Work Sans (texto), Inconsolata (etiquetas/fechas en mayúscula), Reenie Beanie (acentos manuscritos)

## Pages

- **Homepage** (`/`) — Una experiencia interactiva tipo "escritorio de Mac" a pantalla completa. Simula un desktop de macOS (en pantallas grandes) o la pantalla de inicio de un iPhone (en pantallas angostas), con un dock/apps que abren "ventanas" con el contenido real del sitio: Figma Camp, Webflow Camp, la historia de forHuman ("Finder"), y una galería de fotos.

## Cómo funciona la experiencia principal

Al entrar al sitio ves un escritorio con:
- Un widget de calendario y uno de "próximos lanzamientos" (arriba a la izquierda)
- Un ícono de carpeta "forHuman" (arriba a la derecha) que abre la historia de la escuela
- Un dock abajo con: Finder, Figma Camp, Webflow Camp, Fotos, Notas (decorativo) y Spotify (decorativo)

Al hacer clic en Figma o Webflow se abre una "ventana" con la landing page de venta de ese curso (descripción, módulos del programa, precios). Al hacer clic en el ícono de carpeta o Finder se abre la historia de forHuman Studio. Fotos abre una galería (con espacios reservados para fotos reales).

En pantallas de celular, todo el mismo contenido se muestra dentro de un marco de iPhone realista, con los mismos accesos como pantalla de inicio.

## Components

- **components/MacDesktopExperience.tsx** — el componente principal que arma toda la experiencia (escritorio, ventanas, dock, versión mobile).
- **components/design-system/** — piezas reutilizables de la marca SuperHuman School: `Tag`, `PrincipalButton`, `TextButton`, `Header` (+ `DataStat`), `CardAprendizaje`, `CardPricing`, `PromoCard`, `IOSDevice` (marco de iPhone).

## Content Status

- [x] Logo: usando texto ("SuperHuman®" + "SCHOOL" manuscrito) — no se encontró un archivo de logo real
- [x] Fotos: mentores reales (`mentor-1.jpg`, `mentor-2.jpg`); la galería "Fotos" usa espacios reservados etiquetados a la espera de fotos reales
- [x] Copy: contenido final, tomado directamente del diseño entregado

## Recent Changes

- 2026-07-16: Se construyó la experiencia principal completa a partir de un diseño entregado por el usuario (hecho con Claude Design), incluyendo el design system de marca "SuperHuman School" (colores, tipografías, componentes de botones/tarjetas/precios) y el simulador de escritorio macOS / iPhone.
- 2026-07-16: Arreglado el celular (iPhone) en pantallas móviles — antes se veía cortado arriba y abajo porque tenía un tamaño fijo que no se ajustaba a cada pantalla; ahora se escala automáticamente para que siempre entre completo (barra de hora arriba y dock abajo visibles). También la hora que se muestra en la barra superior de macOS y en la pantalla del iPhone ahora es la hora real del dispositivo de quien visita el sitio (antes estaba fija en un valor de ejemplo).
- 2026-07-16: Al abrir la app de **Fotos** (desktop y mobile) ahora aparece un loader girando tipo "beachball" de Mac por un instante, y luego se muestra la galería con placeholders tipo "skeleton" (cajas con brillo animado) en vez de texto, a la espera de que se suban las fotos reales. Las demás apps (Figma Camp, Webflow Camp, Finder) siguen abriendo al instante, sin loader.
- 2026-07-16: Ahora las apps abiertas (Figma Camp, Webflow Camp, Finder, Fotos) muestran un puntito debajo de su ícono en el dock, igual que en una Mac real. También se agregó una animación de cierre: las ventanas ya no desaparecen de golpe, se encogen y desvanecen suavemente al cerrarlas (antes solo tenían animación de apertura).
- 2026-07-16: En la barra de menú de escritorio (arriba, donde dice "Archivo, Edición, Ver..."), se reemplazó el punto negro por el logo real de superHuman (la "S"), y los textos del menú ("Archivo", "Edición", "Ver", "Ventana", "Ayuda") pasaron de gris a negro sólido para que se vean nítidos.
- 2026-07-16: Se corrigió el nombre de la marca a "superHuman" (s minúscula, H mayúscula) en todos los textos visibles del sitio. También se agrandaron los íconos de cerrar/minimizar/maximizar dentro de las ventanas (semáforos), que se veían muy pequeños.
- 2026-07-16: Se rediseñaron los widgets del escritorio para que se vean como los widgets reales de macOS: el widget de calendario ahora tiene el día grande a la izquierda y los próximos eventos como tarjetas a la derecha (estilo "Mañana"); se agregó un widget de Recordatorios ("Hoy" + contador + checklist) y un widget de Clima (Lima, temperatura, nublado, máx/mín), organizados igual que en una Mac real.
- 2026-07-16: El ícono de **Notas** (antes decorativo) ahora abre "Manifiesto.txt" — una carta/manifiesto de la marca al estilo editor de texto: fondo gris claro tipo papel, título grande en itálica (usando la fuente Manrope del sistema, no una fuente externa), párrafos sobre por qué existe superHuman School, frases clave resaltadas en azul, y firmado en cursiva como "forHuman Studio". Funciona igual en desktop y mobile.
- 2026-07-16: La barra de menú de escritorio (arriba) ahora es transparente de verdad (se ve el fondo azul detrás, sin panel claro) y todo su contenido (logo, "Archivo/Edición/...", iconos, hora) pasó a blanco para que se lea sobre el fondo oscuro. También la hora ya no muestra "a.m./p.m." — ahora es formato 24 horas ("23:32").
- 2026-07-16: El Manifiesto (app Notas) cambió a fondo negro estilo Notas de Mac, con la fecha y hora completas arriba en gris ("16 de julio de 2026, 23:35", siempre la hora real). Las frases resaltadas del texto ahora usan nuestro amarillo de marca (con un fondo bien sutil, baja opacidad) en vez de azul, con pequeños puntos amarillos a los lados imitando el look de selección de texto de Mac.
- 2026-07-16: Se agregaron accesos directos de **WhatsApp** en el escritorio: dos íconos con foto real y nombre ("Fio Cisneros" y "Dani Rosas", con el badge verde de WhatsApp), junto a la carpeta "forHuman". En desktop se pueden arrastrar libremente con el mouse igual que en una Mac real (en mobile no se pueden arrastrar, solo tocar). Un clic directo (sin arrastrar) sobre cualquiera de los dos abre WhatsApp con su número real y un mensaje ya escrito ("Hola Fio/Dani, me interesa el curso en vivo") — sin pasos intermedios. En mobile los mismos dos íconos aparecen en la pantalla de inicio.
- 2026-07-17: Se agregó un **sidebar tipo Finder** a la ventana "Finder" (Nosotras), con secciones "Nosotras", "Cifras" y "Mentores" — cada una lleva directo a esa parte de la página. Tiene un botón para abrir/cerrar el sidebar en la barra de título (junto a los semáforos). También: los íconos del escritorio (carpeta + WhatsApp) ahora están repartidos de forma más natural en vez de alineados en columna; se corrigió un pequeño conflicto donde a veces un clic se registraba como arrastre; y la ventana de "Finder" se redujo de tamaño (antes ocupaba casi toda la pantalla).
- 2026-07-17: Se ajustaron los íconos del sidebar de Finder: los ítems de sección ("Nosotras", "Cifras", "Mentores") ahora usan el ícono de documento (en negro, y en blanco cuando la sección está activa/seleccionada) en vez del ícono de carpeta. El botón de abrir/cerrar sidebar (junto a los semáforos) ahora usa el ícono real de "sidebar" de Mac, en blanco para que se vea sobre la barra de título oscura.
- 2026-07-17: El sidebar ahora también aparece en **Figma Camp** y **Webflow Camp**, con sus propias secciones (Inicio, Programa, Bono, Precios) que llevan directo a cada parte de esas páginas. Abrir/cerrar el sidebar ahora es una animación suave, no un corte abrupto. Además: solo la carpeta "forHuman" se puede arrastrar en el escritorio (los íconos de Fio y Dani quedaron fijos, solo con clic), y la ventana de Notas se hizo más angosta para que no sobre tanto espacio a los costados del texto.
- 2026-07-17: El fondo del sidebar (en Finder, Figma y Webflow) cambió a un gris sólido `#E6E6E6` (antes era gris translúcido con blur, lo que hacía que la palabra "Secciones" casi no se viera). El texto "Secciones" ahora es gris oscuro para que se lea bien sobre ese fondo.
- 2026-07-17: La sección activa del sidebar ya no se resalta en azul sólido (se sentía muy saturado) — ahora usa un gris muy claro `#F2F2F2` con un borde sutil, manteniendo el texto en negro siempre. Los íconos de documento (Nosotras, Cifras, Mentores, etc.) ahora son azules (`#0078F0`), igual que en Finder real, en vez de negros.
- 2026-07-17: La foto de **Fio Cisneros** (accesos directos de WhatsApp) ahora es una foto real de la usuaria, en vez del placeholder de mentora.
- 2026-07-17: La ventana de **Notas** (Manifiesto) ahora ajusta su alto al contenido en vez de estirarse a casi toda la pantalla — se centra verticalmente y crece solo lo que el texto necesita (con un límite de 80% de alto, por si el texto crece mucho).
- 2026-07-17: Las frases resaltadas del Manifiesto ahora replican exactamente el estilo de selección de texto de iOS/Mac (barritas verticales a los costados + puntos redondos en las esquinas), con nuestro amarillo de marca en vez del azul de sistema.
- 2026-07-17: Arreglado un glitch al abrir la ventana de Notas — antes aparecía abajo y "saltaba" hacia arriba al centrarse. También se corrigió que el estilo de selección no se estaba viendo (el CSS no se había recompilado); ya se ve correctamente.
- 2026-07-17: En el Manifiesto: el título ya no está en itálica, y la firma cambió de "FIRMADO / forHuman Studio" a solo "Dani y Fio" en cursiva.
- 2026-07-17: El ícono de **Spotify** (antes decorativo) ahora abre una ventana con la playlist real embebida (el reproductor oficial de Spotify), tanto en desktop como en mobile.
- 2026-07-17: **Fotos** ahora tiene su propio sidebar ("Destacadas": Favoritos, Mascotas, Reciente) igual que Finder/Figma/Webflow, con fondo blanco (antes era negro) y alto ajustado al contenido. Las fotos ya no son placeholders grises — usan las fotos reales que tenemos (mentores y Fio).
- 2026-07-17: Rediseño grande de la experiencia **mobile**: antes todo el sitio se mostraba dentro de un marco de iPhone falso (con notch y esquinas redondeadas) escalado para caber en la pantalla — esto causaba que no se pudiera hacer scroll bien. Ahora, en celular, cada sección (Figma Camp, Webflow Camp, Finder, Fotos, Notas, Spotify) se abre como una pantalla real a todo lo ancho del dispositivo, con scroll nativo. Ya no se simula la forma de un teléfono.
- 2026-07-17: Ajustes finos de mobile: se quitó el sidebar por completo en celular (solo existe en desktop); la barra superior de cada app en mobile ahora se ve igual que en desktop (semáforos rojo/amarillo/verde, fondo oscuro, título centrado); el dock de la pantalla de inicio ya no queda "flotando" a la mitad — se ancla al final real de la pantalla; se agregó una barra con el logo, hora y fecha arriba del home de mobile; los íconos de Fio Cisneros y Dani Rosas ahora miden lo mismo que Fotos/Spotify en la grilla, con el nombre recortado con "…" si no cabe; y en Fotos, cada álbum (Favoritos, Mascotas, Reciente) ahora muestra una foto de portada con el nombre superpuesto, seguida de una grilla de 6 fotos cuadradas (antes 3 rectangulares).

- 2026-07-20: Se agregó una sección de **prueba social y cupos** en Webflow Camp y Figma Camp (antes de precios): Webflow Camp muestra 150+ alumnos formados, 9.3/10 de recomendación y 2 testimonios reales (tomados de la encuesta de satisfacción, con autorización para compartir); Figma Camp (primera edición) solo muestra el aviso de "15 cupos, grupo reducido" sin inventar datos que no existen todavía.
- 2026-07-20: Se importó el contenido real de la landing de Webflow Camp (descargado del sitio en Webflow) que antes no estaba en la versión de Ship Studio: los 6 módulos completos del programa (antes solo había 3), una nueva sección "Motivos para llevar el curso", los 3 regalos/perks reales (Figma Educator gratis, Relume Pro 2 meses, Merch oficial — antes esa sección mostraba texto de relleno sin contenido real), y un FAQ con 7 preguntas frecuentes reales con acordeón (se puede hacer clic para expandir cada respuesta). También se corrigieron los nombres de las mentoras en la sección "Nosotras" del Finder: ahora dice Fiorella Cisneros (Webflow Educator) y Danitza Rosas (Webflow Designer) en vez de los títulos genéricos que había antes. Los botones de "Quiero inscribirme" de Webflow Camp ahora abren WhatsApp directo con Fio, con un mensaje distinto según si elegiste "En vivo" u "On-Demand".

- 2026-07-20: Se agregaron animaciones reales a Webflow Camp (antes no tenía ninguna, ya que las animaciones de tu sitio en Webflow usan el motor propio de Webflow y no se pueden copiar directo a React). Se instaló la librería `framer-motion` y ahora: el texto del hero aparece con una entrada suave escalonada; las tarjetas de módulos, motivos, regalos, testimonios y precios aparecen con un fade-in hacia arriba a medida que haces scroll; el FAQ se expande y contrae con una animación suave de altura (antes aparecía de golpe); y las tarjetas de mentoras (Fiorella y Danitza) tienen un pequeño efecto al pasar el mouse.

- 2026-07-20: Se agregó la sección "Aprende de Webflow Educators certificadas" directamente dentro de la página de Webflow Camp (antes solo estaba en Finder/Nosotras, y no se veía al entrar al curso) — muestra a Fiorella Cisneros y Danitza Rosas con foto grande y un efecto de tarjeta que sigue el cursor al pasar el mouse (parecido al efecto real de tu sitio). También se reemplazaron los 3 "regalos" en fila por un **mazo de tarjetas apiladas real** con botón "Descubre" que las va rotando una por una, igual que en tu sitio de Webflow.

- 2026-07-20: Se agregaron los 3 logos reales a las tarjetas de "Regalos" (antes no tenían ícono): Figma Educator usa el logo real de Figma, Relume Pro usa el logo real de Relume (extraído de tu archivo de Webflow), y Merch oficial usa el logo de Webflow. Los archivos nuevos quedaron en `public/superhuman/`: `icon-relume.png` y `icon-webflow-mark.svg`.

## How to Customize

- **Cambiar precios o beneficios de los cursos:** en `components/MacDesktopExperience.tsx`, busca `FigmaBody` o `WebflowBody` y edita los valores de `price`, `oldPrice` o las listas de beneficios.
- **Cambiar textos generales:** están directamente en `components/MacDesktopExperience.tsx`, organizados por sección (igual que se ven en pantalla).
- **Cambiar colores de marca:** en `app/globals.css`, en la sección de tokens (`--black`, `--white`, `--yellow`, `--blue`, etc.).
- **Agregar fotos reales:** reemplaza los archivos en `public/superhuman/` o dime qué fotos quieres usar y las agrego por ti.
