# Violão 3D — Experiência Interativa

<div align="center">

Uma experiência web imersiva que explora a anatomia do violão clássico através de animações 3D, scroll cinematográfico e síntese de áudio em tempo real.

**[Ver Demo ao Vivo](https://paulogcamara.github.io/violao-3d/)**

</div>

---

## Sobre o Projeto

Este projeto é uma experiência interativa de frontend que combina modelagem 3D procedural, animações de scroll cinematográficas e síntese de áudio para criar uma jornada educativa e visual pelo violão clássico.

O site guia o usuário por **12 seções** que explicam cada corda, escalas musicais, e permitem interação direta com um braço de violão virtual — tudo renderizado em tempo real no navegador.

### Destaques Técnicos

- **Modelo 3D 100% procedural** — Violão construído inteiramente com geometria Three.js (LatheGeometry, TubeGeometry, BoxGeometry), sem modelos externos
- **Texturas de madeira procedurais** — Geradas via Canvas API simulando Spruce, Rosewood, Ebony e Cedar
- **Materiais fisicamente corretos** — MeshPhysicalMaterial com clearcoat para simular verniz
- **Síntese de áudio Karplus-Strong** — Sons de cordas gerados em tempo real via Web Audio API, sem arquivos de áudio pré-gravados
- **Vibração de cordas por vertex displacement** — Animação física com onda senoidal fundamental + harmônicos + decaimento exponencial
- **Câmera cinematográfica** — Path interpolado via CatmullRomCurve3 com 26 keyframes sincronizados ao scroll
- **Iluminação dinâmica** — 12 presets de luz que transitam suavemente entre seções
- **Fretboard interativo** — 78 posições clicáveis (6 cordas x 13 trastes) com áudio em tempo real
- **8 acordes pré-definidos** — Dó Maior, Ré Maior, Mi Maior, Sol Maior, Lá Maior, Lá menor, Mi menor, Ré menor

---

## Seções do Site

| # | Seção | Descrição |
|---|-------|-----------|
| 1 | **Hero** | Revelação cinematográfica do violão com título animado |
| 2 | **O Violão Clássico** | Visão geral com stats em cards (6 cordas, 19 trastes, ~45 notas) |
| 3 | **Mi Grave (E2)** | 6ª corda — 82,41 Hz, bordão com revestimento metálico |
| 4 | **Lá (A2)** | 5ª corda — 110 Hz, referência universal de afinação |
| 5 | **Ré (D3)** | 4ª corda — 146,83 Hz, equilíbrio entre grave e médio |
| 6 | **Sol (G3)** | 3ª corda — 196 Hz, primeira corda de nylon puro |
| 7 | **Si (B3)** | 2ª corda — 246,94 Hz, único intervalo de terça maior |
| 8 | **Mi Agudo (E4)** | 1ª corda — 329,63 Hz, brilho em melodias e solos |
| 9 | **Escalas Musicais** | Maior, Menor Natural e Pentatônica com áudio |
| 10 | **Explore o Braço** | Fretboard interativo 6x13 + 8 acordes clicáveis |
| 11 | **Música** | Arpejo automático com citação de Victor Hugo |
| 12 | **Créditos** | Tech stack e links |

---

## Tech Stack

| Tecnologia | Função |
|------------|--------|
| **React 19** + **TypeScript** | Framework e tipagem |
| **Vite 8** | Build tool |
| **Three.js** + **React Three Fiber** | Engine 3D |
| **@react-three/drei** | Helpers 3D (Environment, Html, useProgress) |
| **@react-three/postprocessing** | Bloom, Vignette, Chromatic Aberration |
| **GSAP** + **ScrollTrigger** | Animações de scroll cinematográficas |
| **Lenis** | Smooth scroll (2kb) |
| **Zustand** | Estado global sem re-renders |
| **Tailwind CSS 4** | Estilização utility-first |
| **Web Audio API** | Síntese Karplus-Strong em tempo real |

---

## Como Executar

```bash
# Clonar o repositório
git clone https://github.com/paulogcamara/violao-3d.git
cd violao-3d

# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build de produção
npm run build
```

---

## Arquitetura

```
src/
├── config/           # Camera path, scroll sections, strings, lighting presets
├── stores/           # Zustand store (scroll state)
├── lib/              # Audio engine (Karplus-Strong), scroll sync (Lenis+GSAP)
├── shaders/          # GLSL vertex/fragment shaders para vibração de cordas
├── components/
│   ├── layout/       # Canvas wrapper, scroll container, section wrapper
│   ├── html/         # 12 seções de conteúdo DOM (hero, strings, scales, etc.)
│   └── three/        # Componentes R3F (camera, lighting, particles, post-fx)
│       └── guitar/   # Modelo procedural (body, neck, headstock, bridge, strings)
└── types/            # TypeScript interfaces
```

### Fluxo de Dados

```
Lenis (smooth scroll)
  → GSAP ScrollTrigger (observa posição)
    → Zustand store (progress 0-1)
      → R3F useFrame (câmera, luz, cordas — sem re-renders React)
```

---

## Performance

- **Target:** 60fps em hardware mid-range
- **DPR:** Limitado a 1.5x (Canvas)
- **Zero arquivos de áudio:** Tudo sintetizado em tempo real
- **Zero modelos externos:** Geometria 100% procedural
- **Bundle:** ~460kb gzipped (inclui Three.js)

---

## Licença

MIT

---

<div align="center">

Feito com React Three Fiber, GSAP e paixão por interfaces imersivas.

</div>
