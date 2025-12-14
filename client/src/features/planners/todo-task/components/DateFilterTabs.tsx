import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { capitalize } from "@/utils";
import { COMPARISON_OPERATORS } from "@shared/constants";
import { formatDate } from "@shared/utils";
import { CalendarCogIcon, ChevronRight } from "lucide-react";
import { useContext } from "react";
import { TaskContext } from "../context";
import { Button } from "@/components/ui/button";

const RenderDate = ({ date }: { date: Date | undefined }) => {
  return (
    <div>
      {date ? (
        <p>{formatDate(date)}</p>
      ) : (
        <p className="opacity-60 font-thin">Not specified</p>
      )}
    </div>
  );
};

export const DateFilterTabs = () => {
  const filterControl = useContext(TaskContext);

  if (!filterControl) return null;

  const {
    selectOperator,
    selectSpecificDate,
    handleChangeDateRange,
    filter,
  } = filterControl;

  const { due, startedAt } = filter;

  return (
    <Tabs defaultValue="range">
      <TabsList>
        <TabsTrigger value="range">Timeframe Scope</TabsTrigger>
        <TabsTrigger value="single">Single Date</TabsTrigger>
      </TabsList>
      <TabsContent value="single" className="border-1 rounded-lg">
        {" "}
        <Item>
          <ItemContent>
            <ItemTitle>Started Date</ItemTitle>
            <ItemDescription>
              This filter overrides Timeframe Scope
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Dialog>
              <DialogTrigger>
              <Button variant = 'ghost' className="flex items-center gap-2">
                  <CalendarCogIcon size="20" />
                </Button>
              </DialogTrigger>
              <DialogContent className="flex flex-col items-center justify-center w-fit">
                <DialogTitle>Single date</DialogTitle>
                <Calendar
                  selected={startedAt.specific?.date}
                  onSelect={(value) => selectSpecificDate(value, "startedAt")}
                  mode="single"
                />
              </DialogContent>
            </Dialog>
          </ItemActions>
          <Item className="w-full">
            <ItemActions className="w-full">
              <Select
                onValueChange={(value) => selectOperator(value, "startedAt")}
              >
                <div className="flex justify-between items-center w-full">
                  <SelectTrigger>
                    {capitalize(startedAt.specific?.operator)}
                  </SelectTrigger>
                  <RenderDate date={startedAt.specific?.date} />
                </div>
                <SelectContent>
                  {COMPARISON_OPERATORS.map((op) => (
                    <SelectItem key={op} value={op}>
                      {capitalize(op)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </ItemActions>
          </Item>
        </Item>
        <Item>
          <ItemContent>
            <ItemTitle>Due Date</ItemTitle>
            <ItemDescription>
              This filter overrides Timeframe Scope
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Dialog>
              <DialogTrigger>
                <Button variant = 'ghost' className="flex items-center gap-2">
                  <CalendarCogIcon size="20" />
                </Button>
              </DialogTrigger>
              <DialogContent className="flex flex-col items-center justify-center w-fit">
                <DialogTitle>Single date</DialogTitle>
                <Calendar
                  selected={due.specific?.date}
                  onSelect={(value) => selectSpecificDate(value, "due")}
                  mode="single"
                />
              </DialogContent>
            </Dialog>
          </ItemActions>
          <Item className="w-full">
            <ItemActions className="w-full">
              <Select onValueChange={(value) => selectOperator(value, "due")}>
                <div className="flex justify-between items-center w-full">
                  <SelectTrigger>
                    {capitalize(due.specific?.operator)}
                  </SelectTrigger>
                  <RenderDate date={due.specific?.date} />
                </div>
                <SelectContent>
                  {COMPARISON_OPERATORS.map((op) => (
                    <SelectItem key={op} value={op}>
                      {capitalize(op)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </ItemActions>
          </Item>
        </Item>
      </TabsContent>{" "}

      <TabsContent value="range" className="border-1 rounded-lg">
        {" "}
     
        <Item>
          <ItemContent>
            <ItemTitle>Started At</ItemTitle>
            <ItemDescription>Range</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Dialog>
              <DialogTrigger>
                <div className="flex gap-2 items-center">
                  <RenderDate date={startedAt.range?.from} />{" "}
                  <ChevronRight size="20" />{" "}
                  <RenderDate date={startedAt.range?.to} />
                </div>
              </DialogTrigger>
              <DialogContent className="w-fit flex flex-col items-center justify-center">
                <DialogTitle>Start time scope</DialogTitle>
                <Calendar
                  numberOfMonths={2}
                  selected={startedAt?.range}
                  onSelect={handleChangeDateRange("startedAt")}
                  mode="range"
                />
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
              <DialogTrigger>
                <div className="flex gap-2 items-center">
                  <RenderDate date={due.range?.from} />{" "}
                  <ChevronRight size="20" /> <RenderDate date={due.range?.to} />
                </div>
              </DialogTrigger>
              <DialogContent className="w-fit flex items-center justify-center">
                <Calendar
                  mode="range"
                  onSelect={handleChangeDateRange("due")}
                  selected={due.range}
                  numberOfMonths={2}
                />
              </DialogContent>
            </Dialog>
          </ItemActions>
        </Item>
      </TabsContent>{" "}
    
    </Tabs>
  );
};
