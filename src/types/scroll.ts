export interface ScrollSection {
  id: string;
  start: number;
  end: number;
  label: string;
}

export interface ScrollState {
  progress: number;
  currentSection: number;
  sectionProgress: number;
  velocity: number;
}
