// @deno-types="npm:@types/express"
import express, { Request, Response } from "npm:express@4.18.2";
import { Disco } from "./types/disco.ts";
import Discos from "./discos.ts";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  const discos: Disco[] = Discos.getDiscos();
  res.json(discos);
});

app.get("/id/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const disco: Disco | undefined = Discos.getById(parseInt(id));

  if (disco === undefined) {
    return res.status(204).send();
  }

  res.send(disco);
});

app.get("/nombre/:nombre", (req: Request, res: Response) => {
  const nombre = req.params.nombre;

  const discos = Discos.getDiscos();

  res.send(discos.filter((d) => d.nombre === nombre));
});

app.get("/formato/:formato", (req: Request, res: Response) => {
  const formato = req.params.formato;
  const discos = Discos.getDiscos();

  res.send(discos.filter((d) => d.formato === formato));
});

app.get("/pais/:pais", (req: Request, res: Response) => {
  const pais = req.params.pais;
  const discos = Discos.getDiscos();

  res.send(discos.filter((d) => d.pais === pais));
});

app.post("/", (req: Request, res: Response) => {
  const data = req.body;
  const nuevo: Disco = Discos.addDisco(data);
  res.status(201).send(JSON.stringify(nuevo));
});

app.put("/:id", (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const disco: Disco = req.body;

  const updated: Disco | null = Discos.updateDisco(id, disco);
  if (!updated) {
    return res.status(400).send({ error: "No existe un disco con ese id" });
  }

  res.send(updated);
});

app.delete("/:id", (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  Discos.deleteDisco(id);
  res.status(204).send();
});

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
