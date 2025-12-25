

import z from "zod";
import { Limit } from "../types";


export const applyLimits = (limits: Limit) => {
  let schema = z.string('zod.error.invalid_type').min(limits.min, limits.code).max(limits.max, limits.code)
  if(limits.pattern?.exp && limits?.pattern.code){
   schema = schema.regex(limits.pattern.exp, limits.pattern.code);
  }
  return schema;
}

