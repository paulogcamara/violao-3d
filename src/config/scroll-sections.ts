import type { ScrollSection } from "@/types/scroll";

export const SECTIONS: ScrollSection[] = [
  { id: "hero", start: 0.0, end: 0.07, label: "Inicio" },
  { id: "overview", start: 0.07, end: 0.14, label: "O Violao" },
  { id: "string-e2", start: 0.14, end: 0.22, label: "Mi Grave" },
  { id: "string-a2", start: 0.22, end: 0.30, label: "La" },
  { id: "string-d3", start: 0.30, end: 0.38, label: "Re" },
  { id: "string-g3", start: 0.38, end: 0.46, label: "Sol" },
  { id: "string-b3", start: 0.46, end: 0.54, label: "Si" },
  { id: "string-e4", start: 0.54, end: 0.62, label: "Mi Agudo" },
  { id: "scales", start: 0.62, end: 0.72, label: "Escalas" },
  { id: "interactive", start: 0.72, end: 0.84, label: "Explore" },
  { id: "music", start: 0.84, end: 0.92, label: "Musica" },
  { id: "footer", start: 0.92, end: 1.0, label: "Creditos" },
];

export const TOTAL_SCROLL_SECTIONS = SECTIONS.length;

// Dados de cada corda para as secoes de scroll
export const STRING_DATA = [
  {
    id: "E2",
    name: "Mi Grave",
    number: "6a corda",
    note: "E2",
    frequency: "82,41 Hz",
    type: "Bordao (nylon revestido com metal)",
    description:
      "A corda mais grossa e grave do violao. Produz um som profundo e encorpado que serve como fundacao harmonica. E a referencia para afinacao padrao.",
    curiosity:
      "O Mi grave vibra a 82,41 Hz — tao lento que e possivel ver a corda vibrando a olho nu.",
    color: "#C4A35A",
  },
  {
    id: "A2",
    name: "La",
    number: "5a corda",
    note: "A2",
    frequency: "110 Hz",
    type: "Bordao (nylon revestido com metal)",
    description:
      "A nota La a 110 Hz e a frequencia de referencia universal para afinacao de orquestras. No violao, e o ponto de partida para afinar todas as outras cordas.",
    curiosity:
      "O La 440 Hz (duas oitavas acima) e o diapasao padrao desde 1955, definido pela ISO.",
    color: "#B89256",
  },
  {
    id: "D3",
    name: "Re",
    number: "4a corda",
    note: "D3",
    frequency: "146,83 Hz",
    type: "Bordao (nylon revestido com metal)",
    description:
      "A ultima das cordas graves (bordoes). O Re equilibra o registro grave e medio, sendo essencial para acordes como Re Maior e Sol Maior.",
    curiosity:
      "As tres cordas graves sao feitas de nylon multifilamento envolto em fio de cobre ou prata para adicionar massa.",
    color: "#A88348",
  },
  {
    id: "G3",
    name: "Sol",
    number: "3a corda",
    note: "G3",
    frequency: "196 Hz",
    type: "Nylon puro (monofilamento)",
    description:
      "A primeira das cordas agudas. O Sol marca a transicao entre bordoes e primas, com um timbre quente e redondo caracteristico do nylon puro.",
    curiosity:
      "Esta e a corda que mais frequentemente desafina, pois o nylon puro e mais sensivel a temperatura e umidade.",
    color: "#E8E0D0",
  },
  {
    id: "B3",
    name: "Si",
    number: "2a corda",
    note: "B3",
    frequency: "246,94 Hz",
    type: "Nylon puro (monofilamento)",
    description:
      "A corda Si e mais fina que a Sol e produz um som mais brilhante. E a unica corda que forma um intervalo de terca maior com sua vizinha (Sol).",
    curiosity:
      "O intervalo Sol-Si (terca maior) e diferente de todos os outros intervalos entre cordas adjacentes, que sao quartas justas.",
    color: "#E8E0D0",
  },
  {
    id: "E4",
    name: "Mi Agudo",
    number: "1a corda",
    note: "E4",
    frequency: "329,63 Hz",
    type: "Nylon puro (monofilamento)",
    description:
      "A corda mais fina e aguda. Duas oitavas acima da 6a corda, o Mi agudo brilha em melodias e solos, com um timbre claro e penetrante.",
    curiosity:
      "Apesar de ser a mais fina, esta corda suporta uma tensao de aproximadamente 7 kg para manter a afinacao correta.",
    color: "#E8E0D0",
  },
];
