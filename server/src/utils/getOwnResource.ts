import { Model, QueryFilter } from "mongoose"
import { ForbiddenError, NotFoundError } from "./errors/Errors";



type ResourceKeys<T> = { queryFilter: QueryFilter<T>; userId: string; ownerField: Extract<keyof T, string> };

export const getOwnResource = async <T>(
  Model: Model<T>,
  { queryFilter, userId , ownerField }: ResourceKeys<T>
) => {
  const resource = await Model.findOne<T>(queryFilter)
    .orFail(new NotFoundError("Resource not found."))
    .lean<T>();
  const isOwnResource = String(resource[ownerField]) === userId;
  if(!isOwnResource)throw new ForbiddenError("You do not have access to this resource");

  return resource;
};