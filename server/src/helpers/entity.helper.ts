
import { Model, QueryFilter } from "mongoose";


export class EntityHelper<T> {
  public Entity;
  constructor(Entity: Model<T>) {
    this.Entity = Entity;
  }

 
  getListOfResource = async (
    queryFilter: QueryFilter<T>,
    page: number,
    limit: number,
    sort: -1 | 1
  ) => {
    const skip = (page - 1) * limit;
    const [resourceList, totalResource] = await Promise.all([
      this.Entity.find(queryFilter).sort({ createdAt: sort }).skip(skip).limit(limit),
      this.Entity.countDocuments(queryFilter),
    ]);

    const nextPage = (page * limit) < totalResource ? page + 1 : null;

    return {
      resourceList,
      totalResource,
      nextPage,
    };
  };
}
