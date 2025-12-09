import { ButtonGroup } from "@/components/ui/button-group"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { InputGroup, InputGroupButton, InputGroupInput, InputGroupText, InputGroupTextarea } from "@/components/ui/input-group"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from "@/components/ui/select"
import { capitalize } from "@/utils"
import { taskPriority, taskStatus } from "@shared/constants"
import { ChevronDown, X } from "lucide-react"
import type { TaskForm } from "../types/task"
import { useState, type ChangeEvent } from "react"
import { formatDate } from "@shared/utils"

type TaskFormFieldProps = {
    taskForm: TaskForm;
    handleChangeDescription: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleChangeDate: (val: Date | undefined, field: 'due' | 'startedAt') => void;
    handleAddKeyword: (kw: string) => void;
    handleSelect: (val: string, field: 'priority' | 'status') => void;
    handleRemoveKeyword: (val: string) => void;
}


export const TaskFormFields = ({ taskForm, handleChangeDescription, handleRemoveKeyword, handleChangeDate, handleAddKeyword, handleSelect }: TaskFormFieldProps) => {
    const [keyword, setKeyword] = useState<string>('');

    return (<InputGroup className="flex flex-col gap-2 p-1 items-start">
        <InputGroupTextarea
            placeholder="Describe the task"
            onChange={handleChangeDescription}
            value={taskForm.description}
            name="description"
            className="pt-1 w-full break-all "
        />

        <div className="flex items-center   gap-2">
            <ButtonGroup aria-label="timeframe">
                <Dialog>
                    <DialogTrigger asChild>
                        <InputGroupButton
                            variant="outline"
                            className="text-xs"
                            size="sm"
                        >
                            Started at {formatDate(taskForm.startedAt)} <ChevronDown />
                        </InputGroupButton>
                    </DialogTrigger>
                    <DialogContent className="w-fit flex items-center justify-center">
                        <Calendar mode='single' selected={taskForm.startedAt} onSelect={(val) => handleChangeDate(val, 'startedAt')} />
                    </DialogContent>
                </Dialog>
                <Dialog>
                    <DialogTrigger asChild>
                        <InputGroupButton
                            variant="outline"
                            className="text-xs"
                            size="sm"
                        >
                            Due at {formatDate(taskForm.due)} <ChevronDown />
                        </InputGroupButton>
                    </DialogTrigger>
                    <DialogContent className="w-fit flex items-center justify-center">
                        <Calendar mode='single' selected={taskForm.due} onSelect={(value) => handleChangeDate(value, 'due')} />
                    </DialogContent>
                </Dialog>
            </ButtonGroup>
        </div>
        <ButtonGroup className="flex mb-1 items-center">
            <Select onValueChange={(val) => handleSelect(val, 'status')} >
                <SelectTrigger
                    className={`status-${taskForm.status} text-xs`}
                    size="sm"
                    style={{ height: 24 }}
                >
                    Status {capitalize(taskForm.status)}
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Status</SelectLabel>
                        {taskStatus.map((status) => (
                            <SelectItem value={status}>{capitalize(status)}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Select onValueChange={(val) => handleSelect(val, 'priority')}>
                <SelectTrigger
                    size="sm"
                    className={`priority-${taskForm.priority}   w-fit`}
                    style={{ height: 24 }}
                >{`${capitalize(taskForm.priority)} Priority`}</SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Priority</SelectLabel>
                        {taskPriority.map((status) => (
                            <SelectItem value={status}>{capitalize(status)}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </ButtonGroup>
        <InputGroup className="flex items-center justify-between p-3">
            <InputGroupText >Keywords</InputGroupText>
            <InputGroupInput value={keyword} onChange={(e) => setKeyword(e.target.value)} id='keyword-input' />
            <InputGroupButton onClick={() => handleAddKeyword(keyword)}>Add</InputGroupButton>

        </InputGroup>
        <div className="text-xs  flex flex-wrap items-center gap-1">
            {taskForm.keywords.map((kw) => <p className="px-2 py-1 bg-muted rounded-lg   w-fit rounded flex items-center gap-1 ">{kw} <X size='12' onClick={() => handleRemoveKeyword(kw)} /> </p>)}
        </div>
    </InputGroup>)
}