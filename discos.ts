import { Disco } from "./types/disco.ts";

let discos: Disco[] = [];
let id = 0;

const getDiscos = (): Disco[] => discos;

const getById = (id: number): Disco | undefined =>
  discos.find((d) => d.id === id);

const addDisco = (disco: Disco): Disco => {
  disco.id = id++;
  discos.push(disco);
  return disco;
};

const updateDisco = (id: number, disco: Disco): Disco | null => {
  const index = discos.findIndex((d) => d.id === id);
  if (index === -1) return null;

  discos[index] = { ...disco, id: id };
  return discos[index];
};

const deleteDisco = (id: number): void => {
  discos = discos.filter((d) => d.id !== id);
};

export default { getDiscos, addDisco, getById, updateDisco, deleteDisco };
