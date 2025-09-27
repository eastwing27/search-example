import { adjectives, catValues, colorValues, matValues, nouns } from "@/types/data";
import { categories, colors, ItemDTO, materials } from "@/types/types";
import { NextApiRequest, NextApiResponse } from "next";

const random = <T extends readonly string[]>(arr: T) =>
    arr[Math.floor(Math.random()*arr.length)];

const generateName = () => {
  const adj = random(adjectives);
  const noun = random(nouns);
  const n = Math.floor(Math.random() * 1000).toString();
  return `${adj} ${noun} #${n}`;
};

const generateItem = (cols: colors[], mats: materials[], cats: categories[]): ItemDTO => {
  return {
    name: generateName(),
    color: (cols.length > 0 ? random(cols) : random(colorValues)) as colors,
    material: (mats.length > 0 ? random(mats) : random(matValues)) as materials,
    category: (cats.length  > 0 ? random(cats) : random(catValues)) as categories
  }
}

function* generateSearchResponse (count: number, cols: colors[], mats: materials[], cats: categories[]) : Generator<ItemDTO> {
  for (let i = 0; i < count; i++)
    yield generateItem(cols, mats, cats)
}

enum wordType { color, material, category, unknown }

const parse = (search: string): [string, wordType][] => {
  const words = search.toLowerCase().split(" ");
  return words.map(word => {
    if (colorValues.some( c => c === word)) return [word, wordType.color];
    if (matValues.some(m => m === word)) return [word, wordType.material];
    const cat = catValues.find(cat => cat === word || (word.length > 3 && cat.includes(word)));
    if (cat) return [cat, wordType.category];
    
    return [word, wordType.unknown];
  })
};

const mockSearchResponse = (search: string) => {
  const parsed = parse(search);

  const find = <T extends string>(t: wordType) => [...new Set(parsed.filter(([_, pt]) => pt === t).map(([w,_]) => w as T))];
  const cols = find<colors>(wordType.color);
  const mats = find<materials>(wordType.material);
  const cats = find<categories>(wordType.category);

  return generateSearchResponse(30, cols, mats, cats).toArray();
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "GET") return res.status(405);

    const search = req.query.search;
    if (!search) return await res.status(400);

    const results = mockSearchResponse(search as string);
    return await res.status(200).json(results);
  } catch (exn) {
    console.error(exn);
    return await res.status(500);
  }
}

