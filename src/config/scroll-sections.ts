import type { ScrollSection } from "@/types/scroll";

export const SECTIONS: ScrollSection[] = [
  { id: "hero", start: 0.0, end: 0.07, label: "Início" },
  { id: "overview", start: 0.07, end: 0.14, label: "O Violão" },
  { id: "string-e2", start: 0.14, end: 0.22, label: "Mi Grave" },
  { id: "string-a2", start: 0.22, end: 0.30, label: "Lá" },
  { id: "string-d3", start: 0.30, end: 0.38, label: "Ré" },
  { id: "string-g3", start: 0.38, end: 0.46, label: "Sol" },
  { id: "string-b3", start: 0.46, end: 0.54, label: "Si" },
  { id: "string-e4", start: 0.54, end: 0.62, label: "Mi Agudo" },
  { id: "scales", start: 0.62, end: 0.72, label: "Escalas" },
  { id: "interactive", start: 0.72, end: 0.84, label: "Explore" },
  { id: "music", start: 0.84, end: 0.92, label: "Música" },
  { id: "footer", start: 0.92, end: 1.0, label: "Créditos" },
];

export const TOTAL_SCROLL_SECTIONS = SECTIONS.length;

// Dados de cada corda para as seções de scroll
export const STRING_DATA = [
  {
    id: "E2",
    name: "Mi Grave",
    number: "6ª corda",
    note: "E2",
    frequency: "82,41 Hz",
    type: "Bordão (nylon revestido com metal)",
    description:
      "A corda mais grossa e grave do violão. Produz um som profundo e encorpado que serve como fundação harmônica. É a referência para afinação padrão.",
    curiosity:
      "O Mi grave vibra a 82,41 Hz — tão lento que é possível ver a corda vibrando a olho nu.",
    color: "#C4A35A",
  },
  {
    id: "A2",
    name: "Lá",
    number: "5ª corda",
    note: "A2",
    frequency: "110 Hz",
    type: "Bordão (nylon revestido com metal)",
    description:
      "A nota Lá a 110 Hz é a frequência de referência universal para afinação de orquestras. No violão, é o ponto de partida para afinar todas as outras cordas.",
    curiosity:
      "O Lá 440 Hz (duas oitavas acima) é o diapasão padrão desde 1955, definido pela ISO.",
    color: "#B89256",
  },
  {
    id: "D3",
    name: "Ré",
    number: "4ª corda",
    note: "D3",
    frequency: "146,83 Hz",
    type: "Bordão (nylon revestido com metal)",
    description:
      "A última das cordas graves (bordões). O Ré equilibra o registro grave e médio, sendo essencial para acordes como Ré Maior e Sol Maior.",
    curiosity:
      "As três cordas graves são feitas de nylon multifilamento envolto em fio de cobre ou prata para adicionar massa.",
    color: "#A88348",
  },
  {
    id: "G3",
    name: "Sol",
    number: "3ª corda",
    note: "G3",
    frequency: "196 Hz",
    type: "Nylon puro (monofilamento)",
    description:
      "A primeira das cordas agudas. O Sol marca a transição entre bordões e primas, com um timbre quente e redondo característico do nylon puro.",
    curiosity:
      "Esta é a corda que mais frequentemente desafina, pois o nylon puro é mais sensível a temperatura e umidade.",
    color: "#E8E0D0",
  },
  {
    id: "B3",
    name: "Si",
    number: "2ª corda",
    note: "B3",
    frequency: "246,94 Hz",
    type: "Nylon puro (monofilamento)",
    description:
      "A corda Si é mais fina que a Sol e produz um som mais brilhante. É a única corda que forma um intervalo de terça maior com sua vizinha (Sol).",
    curiosity:
      "O intervalo Sol-Si (terça maior) é diferente de todos os outros intervalos entre cordas adjacentes, que são quartas justas.",
    color: "#E8E0D0",
  },
  {
    id: "E4",
    name: "Mi Agudo",
    number: "1ª corda",
    note: "E4",
    frequency: "329,63 Hz",
    type: "Nylon puro (monofilamento)",
    description:
      "A corda mais fina e aguda. Duas oitavas acima da 6ª corda, o Mi agudo brilha em melodias e solos, com um timbre claro e penetrante.",
    curiosity:
      "Apesar de ser a mais fina, esta corda suporta uma tensão de aproximadamente 7 kg para manter a afinação correta.",
    color: "#E8E0D0",
  },
];
