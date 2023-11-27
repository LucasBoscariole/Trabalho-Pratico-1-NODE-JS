import express from "express";
import marcas from "./marcasRoute.js";
import { promises } from "fs";
const { readFile, writeFile } = promises;
const PORT = 8080;

global.filePath = "car-list.json";

const app = express();
app.use(express.json());

app.use("/marcas", marcas);

app.listen(PORT, async () => {
  try {
    await readFile(global.filePath);
  } catch {
    writeFile(global.filePath, JSON.stringify([]));
  }
  console.log(`listing on port ${PORT}`);
});
