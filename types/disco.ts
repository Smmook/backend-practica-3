type Formato =
  | "LP"
  | "CD"
  | "single"
  | "reel to reel"
  | "minidisc"
  | "videocd"
  | "otro";

export interface Disco {
  nombre: string;
  autor: string;
  formato: Formato;
  matriz?: number;
  pais: string;
  arte: string;
  id: number | undefined;
}
