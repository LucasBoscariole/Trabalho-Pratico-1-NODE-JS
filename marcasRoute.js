import express from "express";
import {
  listaMaisModelos,
  listaMenosModelos,
  listaModelos,
  maisModelos,
  menosModelos,
} from "./helpers.js";

const marcas = express.Router();

marcas.get("/maisModelos", maisModelos);
marcas.get("/menosModelos", menosModelos);
marcas.get("/listaMaisModelos/:value", listaMaisModelos);
marcas.get("/listaMenosModelos/:value", listaMenosModelos);
marcas.post("/listaModelos", listaModelos);

export default marcas;
