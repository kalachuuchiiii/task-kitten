import { ButtonGroup } from "@/components/ui/button-group";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import {
  COMPARISON_OPERATORS,
  taskPriority,
  taskStatus,
} from "@shared/constants";
import {
  CalendarCogIcon,
  ChevronDown,
  ChevronRight,
  Filter,
  X,
} from "lucide-react";
import type { TaskForm } from "../types/task";
import { useContext, useState, type ChangeEvent } from "react";
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
  ItemFooter,
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
import type {
  InfiniteData,
  QueryObserverResult,
  RefetchOptions,
} from "@tanstack/react-query";
import { KeywordList } from "./KeywordList";
import type { DateRange, OnSelectHandler } from "react-day-picker";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TaskContext } from "../context";
import { LoadingDisplay } from "@/components/ui/LoadingDisplay";
import { DateFilterTabs } from "./DateFilterTabs";

//  refetchTasks: refetch,
//       handleSelect,
//       handleChangeDescription,
//       handleAddKeyword,
//       handleChangeDateRange,
//       handleRemoveKeyword,
//       filter,

export const FilterTaskForm = () => {
  const filterControl = useContext(TaskContext);
  if (!filterControl) return null;

  const {
    refetchTasks,
    handleSelect,
    handleChangeDescription,
    filter,
    handleRemoveKeyword,
    handleAddKeyword,
    resetFilterAndRefetch,
    isFetchingTasks,
  } = filterControl;

  return (
    <SheetContent className="p-3 overflow-y-auto">
      <SheetHeader>
        <SheetTitle>Advanced filter</SheetTitle>
        <SheetDescription>Filter tasks you want to include</SheetDescription>
      </SheetHeader>
      <Textarea
        onChange={handleChangeDescription}
        value={filter.description}
        placeholder="Type description keywords you want to filter..."
      />
      <Item>
        {" "}
        {/**status start */}
        <ItemContent>
          <ItemTitle>Status</ItemTitle>
          <ItemDescription>Status you want to filter</ItemDescription>
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
                <div key={status} className="flex items-center gap-2">
                  <Checkbox
                    checked={filter.status.includes(status)}
                    onCheckedChange={() => handleSelect(status, "status")}
                  />{" "}
                  {capitalize(status)}
                </div>
              ))}
            </PopoverContent>
          </Popover>
        </ItemActions>
        <ItemFooter>
          <div className="text-xs flex items-center gap-1 ">
            {filter.status.map((st) => (
              <p className="px-3 py-1 truncate rounded-xl border">
                {capitalize(st)}
              </p>
            ))}
          </div>
        </ItemFooter>
      </Item>
      <div></div>
      {/**status end */}
      <Item>
        {" "}
        {/**priority start */}
        <ItemContent>
          <ItemTitle>Priority</ItemTitle>
          <ItemDescription>Priorities you want to filter</ItemDescription>
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
                <div key={priority} className="flex items-center gap-2">
                  <Checkbox
                    checked={filter.priority.includes(priority)}
                    onCheckedChange={() => handleSelect(priority, "priority")}
                    className=" "
                  />{" "}
                  {capitalize(priority)}
                </div>
              ))}
            </PopoverContent>
          </Popover>
        </ItemActions>
        <ItemFooter>
          <div className="text-xs flex items-center gap-1">
            {filter.priority.map((pr) => (
              <p className="px-3 py-1 truncate rounded-xl border">
                {capitalize(pr)}
              </p>
            ))}
          </div>
        </ItemFooter>
      </Item>{" "}
      {/**priority end */}
      <DateFilterTabs />
      <KeywordInput handleAddKeyword={handleAddKeyword} />
      <KeywordList
        keywords={filter.keywords}
        handleRemoveKeyword={handleRemoveKeyword}
      />
      <footer className="space-y-1 transition-all ">
        <button
         disabled={isFetchingTasks}
          className="button-bg w-full   p-1.5 rounded-lg"
          onClick={() => refetchTasks()}
        >
          <p>Filter</p>
        </button>
        <button
          disabled={isFetchingTasks}
          className=" w-full disabled:opacity-50 hover-highlight flex flex-col p-1.5 rounded-lg"
          onClick={resetFilterAndRefetch}
        >
          <p>Reset</p>
        </button>
      </footer>
    </SheetContent>
  );
};
