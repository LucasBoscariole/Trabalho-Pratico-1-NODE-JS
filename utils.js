import { promises } from "fs";
const { readFile } = promises;

export const sortMaisModelos = async () => {
  const carList = JSON.parse(await readFile(global.filePath));

  // Sort car-list com as marcas com maiores modelos em primeiro
  const sortedCarList = carList.sort((a, b) => {
    if (b.models.length > a.models.length) return 1;
    if (b.models.length < a.models.length) return -1;
    return a.brand.toLowerCase().localeCompare(b.brand.toLowerCase());
  });

  return sortedCarList;
};

export const sortMenosModelos = async () => {
  const carList = JSON.parse(await readFile(global.filePath));

  // Sort car-list com as marcas com menores modelos em primeiro
  const sortedCarList = carList.sort((a, b) => {
    if (b.models.length > a.models.length) return -1;
    if (b.models.length < a.models.length) return 1;
    return a.brand.toLowerCase().localeCompare(b.brand.toLowerCase());
  });

  return sortedCarList;
};

export const mesmaQuatidadeDeModelos = async (obj) => {
  const carList = JSON.parse(await readFile(global.filePath));
  return carList.filter(
    (details) => details.models.length === obj.models.length
  );
};

export const finalResponseFormatter = (list) => {
  return list.length > 1
    ? list.map((details) => details.brand)
    : list[0]?.brand;
};

// Feito por Lucas Boscariole Silva