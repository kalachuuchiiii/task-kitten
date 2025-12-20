import { ButtonGroup } from "@/components/ui/button-group";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  InputGroup,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import { capitalize } from "@/utils";
import { taskPriority, taskStatus } from "@shared/constants";
import { CalendarCogIcon, ChevronDown, X } from "lucide-react";
import type { TaskForm } from "../types/task";
import { memo, useState, type ChangeEvent } from "react";
import { formatDate } from "@shared/utils";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { KeywordInput } from "./KeywordInput";
import { KeywordList } from "./KeywordList";
import { Button } from "@/components/ui/button";
import { TASK_LIMIT } from "@shared/limits";

type TaskFormFieldProps = {
  taskForm: TaskForm;
  handleChangeDescription: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleChangeDate: (val: Date | undefined, field: "due" | "startedAt") => void;
  handleAddKeyword: (kw: string) => void;
  handleSelect: (val: string, field: "priority" | "status") => void;
  handleRemoveKeyword: (val: string) => void;
};

export const TaskFormFields = memo(
  ({
    taskForm,
    handleChangeDescription,
    handleRemoveKeyword,
    handleChangeDate,
    handleAddKeyword,
    handleSelect,
    ...props
  }: TaskFormFieldProps & React.FormHTMLAttributes<HTMLFormElement>) => {
    return (
      <form {...props} className="flex flex-col w-full gap-6 p-1 items-start">
        <div className="w-full space-y-2">
          <div className="w-full space-y-2">
            <Label>Description</Label>
            <Textarea
              required
              maxLength={TASK_LIMIT.description.MAX}
              minLength={TASK_LIMIT.description.MIN}
              placeholder="Describe the task"
              onChange={handleChangeDescription}
              value={taskForm.description}
              name="description"
              className="pt-1 w-full break-all "
            />
          </div>
          <div className="flex mb-1 gap-2 items-center">
            <Select onValueChange={(val) => handleSelect(val, "status")}>
              <SelectTrigger
                className={` text-xs`}
                size="sm"
                style={{ height: 24 }}
              >
                Status {capitalize(taskForm.status)}
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  {taskStatus.map((status) => (
                    <SelectItem key={status} value={status}>
                      {capitalize(status)}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select onValueChange={(val) => handleSelect(val, "priority")}>
              <SelectTrigger
                size="sm"
                className={` text-xs  w-fit`}
                style={{ height: 24 }}
              >{`${capitalize(taskForm.priority)} Priority`}</SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Priority</SelectLabel>
                  {taskPriority.map((status) => (
                    <SelectItem key={status} value={status}>
                      {capitalize(status)}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="w-full space-y-2">
          <header className="px-2 py-1">
            <Label>Timeframe</Label>
          </header>
          <div className="border rounded-lg">
            <Dialog>
              <Item className="w-full ">
                <ItemContent>
                  <ItemTitle>
                    Started at {formatDate(taskForm.startedAt)}
                  </ItemTitle>
                  <ItemDescription>When did the task start</ItemDescription>
                </ItemContent>
                <ItemActions>
                  <DialogTrigger asChild className="w-full ">
                    <Button size="sm" variant={"ghost"}>
                      {" "}
                      <CalendarCogIcon />
                    </Button>
                  </DialogTrigger>
                </ItemActions>
              </Item>

              <DialogContent className="w-fit flex items-center justify-center">
                <Calendar
                  mode="single"
                  selected={taskForm.startedAt}
                  onSelect={(val) => handleChangeDate(val, "startedAt")}
                />
              </DialogContent>
            </Dialog>
            <Dialog>
              <Item className="w-full">
                <ItemContent>
                  <ItemTitle>Due at {formatDate(taskForm.due)}</ItemTitle>
                  <ItemDescription>When will the task end</ItemDescription>
                </ItemContent>
                <ItemActions>
                  <DialogTrigger asChild className="w-full ">
                    <Button size="sm" variant={"ghost"}>
                      <CalendarCogIcon />
                    </Button>
                  </DialogTrigger>
                </ItemActions>
              </Item>
              <DialogContent className="w-fit flex items-center justify-center">
                <Calendar
                  mode="single"
                  selected={taskForm.due}
                  onSelect={(value) => handleChangeDate(value, "due")}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <KeywordInput
          keywords={taskForm.keywords}
          handleAddKeyword={handleAddKeyword}
        />
        <KeywordList
          keywords={taskForm.keywords}
          handleRemoveKeyword={handleRemoveKeyword}
        />
      </form>
    );
  }
);
