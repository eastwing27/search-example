import {colorValues, matValues, catValues} from "./data"

type colors = typeof colorValues[number];

type materials = typeof matValues[number];

type categories = typeof catValues[number];

type ItemDTO = {
  name: string;
  color: colors;
  material: materials;
  category: categories;
};
