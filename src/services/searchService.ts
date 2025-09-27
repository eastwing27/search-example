import { ItemDTO } from "@/types/types";
import { getRequest } from "./_base";

export const search = (searchString: string) =>
  getRequest<ItemDTO[]>(`/api/v1/search/${searchString}`);