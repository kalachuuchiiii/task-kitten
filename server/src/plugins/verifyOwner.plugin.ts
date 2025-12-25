import { ForbiddenError } from "@/utils/errors";
import { Document } from "mongoose";


export const verifyOwnerPlugin = <T extends Document>(userField: keyof T, entity: string) => {
  return (schema: any) => {
     schema.methods.verifyOwner = function (candidateId: string) {
        if(String(this[userField]) !== candidateId){
            throw new ForbiddenError('error.forbidden', { entity });
        }
        return this;
     }
   }
}