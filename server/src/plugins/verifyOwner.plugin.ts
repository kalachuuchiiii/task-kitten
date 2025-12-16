import { Document } from "mongoose";


export const verifyOwnerPlugin = <T extends Document>(userField: keyof T) => {
  return (schema: any) => {
     schema.methods.verifyOwner = function (candidateId: string) {
        if(String(this[userField]) !== candidateId){
            throw new Error('You do not have access to this resource.');
        }
        return this;
     }
   }
}