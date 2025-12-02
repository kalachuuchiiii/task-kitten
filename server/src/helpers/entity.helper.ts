import { NotFoundError } from "@/utils/errors";
import { Model, QueryFilter } from "mongoose";


export class EntityHelper<T> {
  public Entity;
  constructor(Entity: Model<T>) {
    this.Entity = Entity;
  }

  getResource = async (queryFilter: QueryFilter<T>): Promise<T> => {
    const resource = await this.Entity.findOne<T>(queryFilter).orFail(
      new NotFoundError(`${this.Entity.modelName} not found.`)
    );
    return resource;
  };

  getListOfResource = async (
    queryFilter: QueryFilter<T>,
    page: number,
    limit: number
  ) => {
    const skip = (page - 1) * limit;
    const [resourceList, totalResource] = await Promise.all([
      this.Entity.find(queryFilter).skip(skip).limit(limit),
      this.Entity.countDocuments(queryFilter),
    ]);

    const nextPage = skip < totalResource ? page + 1 : null;

    return {
      resourceList,
      totalResource,
      nextPage,
    };
  };
}
