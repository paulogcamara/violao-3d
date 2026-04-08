# Violao 3D — Experiencia Interativa

<div align="center">

Uma experiencia web imersiva que explora a anatomia do violao classico atraves de animacoes 3D, scroll cinematografico e sintese de audio em tempo real.

**[Ver Demo ao Vivo](https://paulogcamara.github.io/violao-3d/)**

</div>

---

## Sobre o Projeto

Este projeto e uma experiencia interativa de frontend que combina modelagem 3D procedural, animacoes de scroll cinematograficas e sintese de audio para criar uma jornada educativa e visual pelo violao classico.

O site guia o usuario por **12 secoes** que explicam cada corda, escalas musicais, e permitem interacao direta com um braco de violao virtual — tudo renderizado em tempo real no navegador.

### Destaques Tecnicos

- **Modelo 3D 100% procedural** — Violao construido inteiramente com geometria Three.js (LatheGeometry, TubeGeometry, BoxGeometry), sem modelos externos
- **Texturas de madeira procedurais** — Geradas via Canvas API simulando Spruce, Rosewood, Ebony e Cedar
- **Materiais fisicamente corretos** — MeshPhysicalMaterial com clearcoat para simular verniz
- **Sintese de audio Karplus-Strong** — Sons de cordas gerados em tempo real via Web Audio API, sem arquivos de audio pre-gravados
- **Vibracao de cordas por vertex displacement** — Animacao fisica com onda senoidal fundamental + harmonicos + decaimento exponencial
- **Camera cinematografica** — Path interpolado via CatmullRomCurve3 com 26 keyframes sincronizados ao scroll
- **Iluminacao dinamica** — 12 presets de luz que transitam suavemente entre secoes
- **Fretboard interativo** — 78 posicoes clicaveis (6 cordas x 13 trastes) com audio em tempo real
- **8 acordes pre-definidos** — Do Maior, Re Maior, Mi Maior, Sol Maior, La Maior, La menor, Mi menor, Re menor

---

## Secoes do Site

| # | Secao | Descricao |
|---|-------|-----------|
| 1 | **Hero** | Revelacao cinematografica do violao com titulo animado |
| 2 | **O Violao Classico** | Visao geral com stats em cards (6 cordas, 19 trastes, ~45 notas) |
| 3 | **Mi Grave (E2)** | 6a corda — 82,41 Hz, bordao com revestimento metalico |
| 4 | **La (A2)** | 5a corda — 110 Hz, referencia universal de afinacao |
| 5 | **Re (D3)** | 4a corda — 146,83 Hz, equilibrio entre grave e medio |
| 6 | **Sol (G3)** | 3a corda — 196 Hz, primeira corda de nylon puro |
| 7 | **Si (B3)** | 2a corda — 246,94 Hz, unico intervalo de terca maior |
| 8 | **Mi Agudo (E4)** | 1a corda — 329,63 Hz, brilho em melodias e solos |
| 9 | **Escalas Musicais** | Maior, Menor Natural e Pentatonica com audio |
| 10 | **Explore o Braco** | Fretboard interativo 6x13 + 8 acordes clicaveis |
| 11 | **Musica** | Arpejo automatico com citacao de Victor Hugo |
| 12 | **Creditos** | Tech stack e links |

---

## Tech Stack

| Tecnologia | Funcao |
|------------|--------|
| **React 19** + **TypeScript** | Framework e tipagem |
| **Vite 8** | Build tool |
| **Three.js** + **React Three Fiber** | Engine 3D |
| **@react-three/drei** | Helpers 3D (Environment, Html, useProgress) |
| **@react-three/postprocessing** | Bloom, Vignette, Chromatic Aberration |
| **GSAP** + **ScrollTrigger** | Animacoes de scroll cinematograficas |
| **Lenis** | Smooth scroll (2kb) |
| **Zustand** | Estado global sem re-renders |
| **Tailwind CSS 4** | Estilizacao utility-first |
| **Web Audio API** | Sintese Karplus-Strong em tempo real |

---

## Como Executar

```bash
# Clonar o repositorio
git clone https://github.com/paulogcamara/violao-3d.git
cd violao-3d

# Instalar dependencias
npm install

# Rodar em desenvolvimento
npm run dev

# Build de producao
npm run build
```

---

## Arquitetura

```
src/
├── config/           # Camera path, scroll sections, strings, lighting presets
├── stores/           # Zustand store (scroll state)
├── lib/              # Audio engine (Karplus-Strong), scroll sync (Lenis+GSAP)
├── shaders/          # GLSL vertex/fragment shaders para vibracao de cordas
├── components/
│   ├── layout/       # Canvas wrapper, scroll container, section wrapper
│   ├── html/         # 12 secoes de conteudo DOM (hero, strings, scales, etc.)
│   └── three/        # Componentes R3F (camera, lighting, particles, post-fx)
│       └── guitar/   # Modelo procedural (body, neck, headstock, bridge, strings)
└── types/            # TypeScript interfaces
```

### Fluxo de Dados

```
Lenis (smooth scroll)
  → GSAP ScrollTrigger (observa posicao)
    → Zustand store (progress 0-1)
      → R3F useFrame (camera, luz, cordas — sem re-renders React)
```

---

## Performance

- **Target:** 60fps em hardware mid-range
- **DPR:** Limitado a 1.5x (Canvas)
- **Zero arquivos de audio:** Tudo sintetizado em tempo real
- **Zero modelos externos:** Geometria 100% procedural
- **Bundle:** ~460kb gzipped (inclui Three.js)

---

## Licenca

MIT

---

<div align="center">

Feito com React Three Fiber, GSAP e paixao por interfaces imersivas.

</div>
