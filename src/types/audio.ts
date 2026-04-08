export type StringId = "E2" | "A2" | "D3" | "G3" | "B3" | "E4";

export interface StringNote {
  id: StringId;
  meshName: string;
  note: string;
  frequency: number;
  color: string;
  amplitude: number;
  damping: number;
}
