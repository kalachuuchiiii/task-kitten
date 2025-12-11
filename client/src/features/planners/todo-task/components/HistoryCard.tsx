
import { capitalize } from "@/utils"
import type { TaskHistory, TaskRecordFields } from "@shared/types"
import { formatDate } from "@shared/utils";
import { ChevronRight, GitCommit, LucideSendToBack } from "lucide-react"
import { useTaskActions } from "../hooks";
import { Tooltip, TooltipContent } from "@/components/ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";


const formatValue = (field: string, value: any) => {
    if (value === null) return null;
    if (Array.isArray(value) && value.length === 0) return '---';

    switch (field) {
        case 'due':
        case 'startedAt': return formatDate(value);
        case 'keywords': return (Array.isArray(value) ? value.join(' | ') : String(value));
        default: return typeof value === 'string' ? capitalize(value) : String(value)
    }
}

const ValueDisplay = ({ change }: { change: TaskRecordFields }) => {
    const formattedOldVal = formatValue(change.field, change.oldValue);
    const formattedNewVal = formatValue(change.field, change.newValue);
    return <div className={`${(formattedOldVal === formattedNewVal) || (change.newValue.length === 0 && formattedNewVal === '---') ? 'opacity-50 ' : 'opacity-100 italic '} max-w-lg flex items-center gap-2`}>
        <p>
            {formattedOldVal}
        </p>
        <ChevronRight size={17} />
        <p>
            {formattedNewVal}
        </p>
    </div>
}

const HistoryDisplay = ({ history }: { history: TaskHistory }) => {
    return (<><header className="flex items-center gap-2"> <GitCommit size='20' /> <h1 className="font-semibold text-xl tracking-tight">{history.note}</h1></header>
        <div className="space-y-1 border-l-3 pl-2 w-full ml-2 pb-6 h-full">
            {history.updatedFields.map((change) => <div className="flex text-xs gap-2 items-start">
                <p className="opacity-70">{capitalize(change.field)}</p>
                <p >:</p>
                <ValueDisplay change={change} />
            </div>
            )}
            <p className="text-xs">{formatDate(history.createdAt)}</p>
        </div></>)
}

export const HistoryCard = ({ history }: { history: TaskHistory }) => {

    const { revertTask, isRevertingTask } = useTaskActions();


    return <>
        <div className=" px-4 relative rounded rounded-l-none h-full outline-black/50   w-full ">
            <HistoryDisplay history={history} />

            <AlertDialog>
                <AlertDialogTrigger>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button className="absolute right-10 top-2 hover:bg-muted rounded-full p-2">
                                <LucideSendToBack />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent>
                            Revert task to this state
                        </TooltipContent>
                    </Tooltip>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogTitle>
                        Are you sure you want to revert back to this state?
                    </AlertDialogTitle>
                    <HistoryDisplay history={history} />
                    <AlertDialogAction disabled = {isRevertingTask} onClick={() => revertTask(history._id)}>
                        Revert
                    </AlertDialogAction>
                    <AlertDialogCancel >Cancel</AlertDialogCancel>

                </AlertDialogContent>
            </AlertDialog>


        </div></>
}