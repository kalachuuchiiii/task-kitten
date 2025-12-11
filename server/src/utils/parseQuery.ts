import { MongooseQueryParser } from "mongoose-query-parser";

export const parseQuery = (
  query: string,
  options: { blacklist: string[] } = { blacklist: [] }
) => {
  const parser = new MongooseQueryParser({ blacklist: options.blacklist });
  const parsed = parser.parse(query);
  return parsed;
};

