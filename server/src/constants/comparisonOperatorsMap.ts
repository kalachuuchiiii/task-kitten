import { COMPARISON_OPERATORS } from "@shared/constants";


export const comparisonOperatorsMap: Record<typeof COMPARISON_OPERATORS[number], string> = {
    'greater_than': '$gt',
    'less_than': '$lt',
    'equal_to': '$eq',
    'greater_than_or_equal': '$gte',
    'less_than_or_equal':'$lte'
} as const;