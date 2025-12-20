import {  isValidLength } from "@/utils/validation";
import { COMPARISON_OPERATORS } from "@shared/constants";
import type { TaskFilter } from "@shared/types";
import { normalize } from "@shared/utils";
import { useState } from "react";
import { toast } from "sonner";
import { create } from "zustand";
import type { TextChangeEvent } from "./useTaskForm";
import type { DateRange, OnSelectHandler } from "react-day-picker";
import { initialFilterValues } from "../constants";
import { TASK_LIMIT } from "@shared/limits";


export const useFilterTask = () => {
     const [filter, setFilter] = useState<TaskFilter>(initialFilterValues);


      
  const selectOperator = (value: string, name: 'startedAt' | 'due') => {
     if(!COMPARISON_OPERATORS.includes(value as typeof COMPARISON_OPERATORS[number])){
         toast.error('Invalid operator');
         return;
     }
     console.log(filter, value);
     setFilter((prev) => ({...prev,
      [name]: {
        ...prev[name],
        specific: {
          ...prev[name].specific,
          operator: value
        }
      }
     }))
  }

  const handleAddKeyword = (kw: string) => {
    setFilter((prev) => ({
      ...prev,
      keywords: [...prev.keywords, kw],
    }));
  };

  const handleRemoveKeyword = (val: string) => {
      const remainingKeywords = filter.keywords.filter(
        (keyword) => normalize(keyword) !== normalize(val)
      );
      setFilter((prev) => ({
        ...prev,
        keywords: remainingKeywords,
      }));
    };

     const handleChangeDescription = (e: TextChangeEvent) => {
        const { value } = e.target;
        if (!isValidLength(value, TASK_LIMIT.description)) return;
        setFilter((prev) => ({
          ...prev,
          description: value,
        }));
      };

       const handleChangeDateRange = (name: 'due' | 'startedAt') => {
    const fn: OnSelectHandler<DateRange | undefined> = (select) => {
      setFilter((prev) => ({
        ...prev,
        [name]: {
            ...prev[name],
          range: select,      
        }
      }));
    };
    return fn;
  };

  
  const handleSelect = (value: string, name: "status" | "priority") => {
    const isAlreadySelected = filter[name].some((k) => k === value);
    if (isAlreadySelected) {
      const remainingItems = filter[name].filter((k) => k !== value);
      setFilter((prev) => ({
        ...prev,
        [name]: remainingItems,
      }));
      return;
    }

    setFilter((prev) => ({
      ...prev,
      [name]: [...prev[name], value],
    }));
  };

   const selectSpecificDate = (value: Date | undefined, name: 'due' | 'startedAt') => {
    setFilter((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        specific: {
          ...prev[name].specific,
          date: value
        }
      }
    }));
  };

  const resetFilter = () => {
    setFilter(initialFilterValues);
  }
  

  return { filter, selectOperator, resetFilter, handleAddKeyword, normalize, handleChangeDescription,handleChangeDateRange, handleSelect, selectSpecificDate, handleRemoveKeyword}
}