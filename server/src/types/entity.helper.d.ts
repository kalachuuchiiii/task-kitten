import { QueryFilter } from "mongoose";

export type ResourceQuery<T> = {
  queryFilter: QueryFilter<T>;
  userId: string;
  ownerField: Extract<keyof T, string>;
};
