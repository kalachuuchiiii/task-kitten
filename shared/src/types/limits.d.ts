import { LocaleKeys } from "./localeKeys";




export type Limit = {
    min: number;
    max: number;
    code: LocaleKeys,
    pattern?: {
        exp?: RegExp;
        code?: LocaleKeys;
    }
}

export type LimitsDict<T> = {
    [k in T]: Limit
}