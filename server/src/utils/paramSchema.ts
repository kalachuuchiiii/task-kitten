import z from "zod";


export const paramSchema = z.object({ 
    limit: z.preprocess((val) => {
        if(!val)return 5;
        return Number(val);
    }, z.number().default(5)),
    page: z.preprocess((val) => {
        if(!val)return 1;
        return Number(val);
    }, z.number().default(1)),
    sort: z.preprocess((val) => {
        if(!val)return -1;
        return Number(val);
    }, z.union([z.literal(1), z.literal(-1)]))
}).strip();