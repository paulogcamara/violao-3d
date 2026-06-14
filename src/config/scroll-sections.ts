import type { ScrollSection } from "@/types/scroll";

export const SECTIONS: ScrollSection[] = [
  { id: "hero", start: 0.0, end: 0.07, label: "Início" },
  { id: "overview", start: 0.07, end: 0.14, label: "A Origem" },
  { id: "string-e2", start: 0.14, end: 0.22, label: "O Alicerce" },
  { id: "string-a2", start: 0.22, end: 0.30, label: "A Referência" },
  { id: "string-d3", start: 0.30, end: 0.38, label: "O Coração" },
  { id: "string-g3", start: 0.38, end: 0.46, label: "A Voz que Canta" },
  { id: "string-b3", start: 0.46, end: 0.54, label: "A Tensão" },
  { id: "string-e4", start: 0.54, end: 0.62, label: "O Canto" },
  { id: "scales", start: 0.62, end: 0.72, label: "As Vozes Juntas" },
  { id: "interactive", start: 0.72, end: 0.84, label: "Toque" },
  { id: "music", start: 0.84, end: 0.92, label: "Música" },
  { id: "footer", start: 0.92, end: 1.0, label: "Fim" },
];

export const TOTAL_SCROLL_SECTIONS = SECTIONS.length;

// As Seis Vozes — cada corda é uma voz com caráter, emoção e lugar em música
// real. Saiu o verbete técnico (Hz, tipo de nylon, curiosidade científica);
// entrou a alma: o que essa voz É, o que sente, e onde ela vive.
export const STRING_DATA = [
  {
    id: "E2",
    name: "Mi Grave",
    number: "6ª corda",
    note: "E2",
    color: "#C4A35A",
    role: "O Alicerce",
    emotion: "gravidade · raiz",
    soul: "É o chão sob todo o resto. A voz mais grave não disputa atenção: ela sustenta. Quando as outras se calam, é ela que continua, segurando o silêncio para que a música não caia.",
    music: "O pulso grave que anda por baixo de um fado, o passo firme onde a melodia se apoia para poder voar.",
  },
  {
    id: "A2",
    name: "Lá",
    number: "5ª corda",
    note: "A2",
    color: "#B89256",
    role: "A Referência",
    emotion: "certeza · origem",
    soul: "Antes de qualquer música existir, existe o Lá. É por esta nota que o mundo se afina: do violão na sala à orquestra no palco, todos buscam o mesmo Lá para falar a mesma língua.",
    music: "O lá do diapasão, a nota que põe centenas de instrumentos em acordo antes de a primeira sinfonia começar.",
  },
  {
    id: "D3",
    name: "Ré",
    number: "4ª corda",
    note: "D3",
    color: "#A88348",
    role: "O Coração",
    emotion: "calor · centro",
    soul: "Entre o grave e o agudo mora o calor. O Ré é o centro morno do acorde, a voz que não brilha nem pesa: apenas aquece, dá corpo, faz a música soar humana.",
    music: "O tecido quente que enche o choro brasileiro por dentro, a madeira que faz uma roda de samba soar redonda.",
  },
  {
    id: "G3",
    name: "Sol",
    number: "3ª corda",
    note: "G3",
    color: "#E8E0D0",
    role: "A Voz que Canta",
    emotion: "expressão · sopro",
    soul: "Aqui o metal dá lugar ao nylon puro, e o som fica redondo, vivo, capaz de dobrar. O Sol é a primeira voz que canta de verdade: a que desliza, que chora um pouco, que segura uma nota até ela tremer.",
    music: "Onde o solo respira — a corda que ondula nos dedos de um violonista contando uma história sem nenhuma palavra.",
  },
  {
    id: "B3",
    name: "Si",
    number: "2ª corda",
    note: "B3",
    color: "#E8E0D0",
    role: "A Tensão",
    emotion: "saudade · cor",
    soul: "Todas as cordas guardam a mesma distância da vizinha — menos esta. O Si forma o único intervalo de terça do violão, e é essa pequena diferença que dá cor ao acorde: a nota que faz a harmonia doer de tão bonita.",
    music: "A saudade dentro de um acorde menor — o aperto no peito que a gente sente antes mesmo de saber o nome dele.",
  },
  {
    id: "E4",
    name: "Mi Agudo",
    number: "1ª corda",
    note: "E4",
    color: "#E8E0D0",
    role: "O Canto",
    emotion: "anseio · lágrima",
    soul: "No topo do instrumento está a voz que leva a melodia. Fina, clara, penetrante: é por ela que passa o que a música quer dizer. Quando o violão chora, chora aqui.",
    music: "O tremolo infinito de “Recuerdos de la Alhambra”: uma única nota repetida tão rápido que deixa de ser nota e vira lágrima.",
  },
];
