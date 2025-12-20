import { createRestraints } from "../utils"




export const TASK_LIMIT = {
    description: createRestraints(1, 5000, 'Task Description'),
    keywordString: createRestraints(1, 12, 'Keyword'),
    keywordArray: createRestraints(1, 6, 'Keywords', { message: 'A task can only contain up to 6 keywords.'}),
}

export const HISTORY_RECORD_LIMIT = {
    note: createRestraints(0, 250, 'Update Note')
}