import { ButtonGroup } from "@/components/ui/button-group";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
import { ChevronDown, X } from "lucide-react";
import type { TaskForm } from "../types/task";
import { useState, type ChangeEvent } from "react";
import { formatDate } from "@shared/utils";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { KeywordInput } from "./KeywordInput";
import type { TaskFilter } from "@shared/types";
import type { TextChangeEvent } from "../hooks";
import type { InfiniteData, QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { KeywordList } from "./KeywordList";

//  refetchTasks: refetch,
//       handleSelect,
//       handleChangeDescription,
//       handleAddKeyword,
//       handleChangeDateRange,
//       handleRemoveKeyword,
//       filter,

type FilterTaskFormProps = {
    refetchTasks: ( options?: RefetchOptions | undefined) => Promise<QueryObserverResult<InfiniteData<any, unknown>, Error>>;
    handleSelect: (val: string, name: 'status' | 'priority') => void;
    handleChangeDescription: (e: TextChangeEvent) => void;
    handleAddKeyword: (val: string) => void;
    handleRemoveKeyword: (val: string) => void;
    filter: TaskFilter;
    handleChangeDateRange: (e: Date | undefined, name: 'dueRange' | 'startedAtRange', end: boolean) => void;
}

export const FilterTaskForm = ({ refetchTasks, handleSelect, handleChangeDescription, handleChangeDateRange, filter, handleRemoveKeyword, handleAddKeyword }: FilterTaskFormProps) => {

  return (
    <SheetContent className="p-3">
      <SheetHeader>
        <SheetTitle>Filter tasks</SheetTitle>
        <SheetDescription>Filter tasks you want to include</SheetDescription>
      </SheetHeader>
      <Textarea onChange={handleChangeDescription} value = {filter.description} placeholder="Type description keywords you want to filter..." />
      <Item>
        <ItemContent>
          <ItemTitle>Status</ItemTitle>
          <ItemDescription>Choose status you want to filter</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Popover>
            <PopoverTrigger>
              <div className="flex items-center hover:bg-muted hover:rounded px-4 py-2 gap-2">
                Select <ChevronDown size="20" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="space-y-4">
              <Label>Status</Label>
              {taskStatus.map((status) => (
                <div  key ={status} className="flex items-center gap-2">
                  <Checkbox checked = {filter.status.includes(status)} onCheckedChange={() => handleSelect(status, 'status')} /> {capitalize(status)}
                </div>
              ))}
            </PopoverContent>
          </Popover>
        </ItemActions>
      </Item>
      <Item>
        <ItemContent>
          <ItemTitle>Priority</ItemTitle>
          <ItemDescription>Choose priority you want to filter</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Popover>
            <PopoverTrigger>
              <div className="flex items-center hover:bg-muted hover:rounded px-4 py-2 gap-2">
                Select <ChevronDown size="20" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="space-y-3">
              <Label>Priority</Label>
              {taskPriority.map((priority) => (
                <div className="flex items-center gap-2">
                  <Checkbox checked = {filter.priority.includes(priority)} onCheckedChange={() => handleSelect(priority, 'priority')} className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white" />{" "}
                  {capitalize(priority)}
                </div>
              ))}
            </PopoverContent>
          </Popover>
        </ItemActions>
      </Item>
      <div>
        <Item>
          <ItemContent>
            <ItemTitle>Started At</ItemTitle>
            <ItemDescription>Range</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Dialog>
                <DialogTrigger>
                    Start {formatDate(filter.startedAtRange.from)}
                </DialogTrigger>
              <DialogContent className="w-fit flex items-center justify-center">
                <Calendar />
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger>End {formatDate(filter.startedAtRange.to)}</DialogTrigger>
              <DialogContent  className="w-fit flex items-center justify-center">
                <Calendar />
              </DialogContent>
            </Dialog>
          </ItemActions>
        </Item>
        <Item>
          <ItemContent className="flex">
            <ItemTitle>Due</ItemTitle>
            <ItemDescription>Range</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Dialog>
              <DialogTrigger>Start {formatDate(filter.dueRange.from)}</DialogTrigger>
              <DialogContent  className="w-fit flex items-center justify-center">
                <Calendar  mode = 'range' />
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger>End {formatDate(filter.dueRange.to)}</DialogTrigger>
              <DialogContent  className="w-fit flex items-center justify-center">
                <Calendar />
              </DialogContent>
            </Dialog>
          </ItemActions>
        </Item>
      </div>
      <KeywordInput
        handleAddKeyword={handleAddKeyword}
      />
      <KeywordList keywords={filter.keywords} handleRemoveKeyword={handleRemoveKeyword} />
    </SheetContent>
  );
};
