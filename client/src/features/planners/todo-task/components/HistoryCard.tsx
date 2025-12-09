import { capitalize } from "@/utils"
import type { TaskHistoryBatch, TaskHistoryFields } from "@shared/types"
import { formatDate } from "@shared/utils";
import { ChevronRight } from "lucide-react"


const formatValue = (field: string, value: any) => {
    if (value === null) return 'None';
    if (Array.isArray(value) && value.length === 0) return 'None';

    switch (field) {
        case 'due':
        case 'startedAt': return formatDate(value);
        case 'keywords': return (Array.isArray(value) ? value.join(', ') : String(value));
        default: return typeof value === 'string' ? capitalize(value) : String(value)
    }
}

const ValueDisplay = ({ field, value }: { field: string, value: string }) => {
    return <p className={`${value === null || value.length === 0 ? 'opacity-50' : 'opacity-100 '} flex flex-wrap max-w-sm  text-xs`}>
        {formatValue(field, value)}
    </p>
}

export const HistoryCard = ({ history }: { history: TaskHistoryBatch }) => {



    return <div className="p-5 rounded outline-black/50   w-fit m-2">
        <h1 className="font-semibold text-xl tracking-tight">{history.note}</h1>
        <div className="space-y-1">
            {history.updatedFields.map((change) => <div className="flex text-xs gap-2 items-start">
                <p className="opacity-50">{capitalize(change.field)}</p>
                <p >:</p>
                {change.oldValue && <div className="opacity-70"> <ValueDisplay field={change.field} value={change.oldValue} /> </div>}
                {change.oldValue && <ChevronRight size={12} />}
                <ValueDisplay field={change.field} value={change.newValue} />
            
            </div>
            )}
            <p className="text-xs">{formatDate(history.createdAt)}</p>
        </div>
    </div>
}