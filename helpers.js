import {
  finalResponseFormatter,
  mesmaQuatidadeDeModelos,
  sortMaisModelos,
  sortMenosModelos,
} from "./utils.js";
import { promises } from "fs";
const { readFile } = promises;

export const maisModelos = async (_, res) => {
  try {
    const sortedCarListMais = await sortMaisModelos();

    // Filtra car-list pelas marcas para ver se há mais de uma marca com a mesma quantidade de modelos em primeiro
    const filtedCarList = await mesmaQuatidadeDeModelos(sortedCarListMais[0]);

    // Retorna a resposta final
    const finalResponse = finalResponseFormatter(filtedCarList);

    res.status(200).send(finalResponse);
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
};

export const menosModelos = async (_, res) => {
  try {
    const sortedCarListMenos = await sortMenosModelos();

    // Filtra car-list pelas marcas para ver se há mais de uma marca com a mesma quantidade de modelos em primeiro
    const filtedCarList = await mesmaQuatidadeDeModelos(sortedCarListMenos[0]);

    // Retorna a resposta final
    const finalResponse = finalResponseFormatter(filtedCarList);

    res.status(200).send(finalResponse);
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
};

export const listaMaisModelos = async (req, res) => {
  try {
    const sortedCarListaMaisModelos = await sortMaisModelos();

    // Formata a resposta, após cortar a quatidade requisitada pelo usuario, contando que já esta sendo retornado baseado no filtro alfabetico em 'sortedCarListaMaisModelos'
    const finalResponseFormatted = sortedCarListaMaisModelos
      .slice(0, parseInt(req.params.value))
      .map((detail) => `${detail.brand} - ${detail.models.length}`);

    res.status(200).send(finalResponseFormatted);
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
};

export const listaMenosModelos = async (req, res) => {
  try {
    const sortedCarListaMenosModelos = await sortMenosModelos();

    // Formata a resposta, após cortar a quatidade requisitada pelo usuario, contando que já esta sendo retornado baseado no filtro alfabetico em 'sortedCarListaMenosModelos'
    const finalResponseFormatted = sortedCarListaMenosModelos
      .slice(0, parseInt(req.params.value))
      .map((detail) => `${detail.brand} - ${detail.models.length}`);

    res.status(200).send(finalResponseFormatted);
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
};

export const listaModelos = async (req, res) => {
  try {
    if (!req.body.hasOwnProperty("nomeMarca")) {
      throw new Error("Label 'nomeMarca' é mandatório!");
    }
    if (req.body.nomeMarca === "") {
      throw new Error("Forneça um valor!");
    }

    const carList = JSON.parse(await readFile(global.filePath));

    // Acha a marca fornecida pelo usúario, se presente, se não, retorna um array vazio.
    const finalCarList =
      carList.find(
        ({ brand }) => brand.toLowerCase() === req.body.nomeMarca.toLowerCase()
      )?.models ?? [];

    res.status(200).send(finalCarList);
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
};
