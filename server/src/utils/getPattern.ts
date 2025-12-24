import { Limit } from "@shared/types";


export const getPattern = (limit: Limit) => {
    if(limit.pattern && limit.pattern.exp && limit.pattern.code){
        return limit.pattern;
    }
    return {
        exp: /.*/,
        code: ''
    }
}