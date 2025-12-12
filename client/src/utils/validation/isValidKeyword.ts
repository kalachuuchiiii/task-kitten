import { KEYWORD_LIMIT } from "@shared/constants";
import { toast } from "sonner";

export const isValidKeyword = (keyword: string, keywords: string[]) => {
  if (!keyword) return false;
  if (keyword.length > KEYWORD_LIMIT.LENGTH) {
    toast.error(KEYWORD_LIMIT.MESSAGE);
    return false;
  }
  if (keywords.includes(keyword.trim().toLowerCase())) {
    toast.error("Keyword already exists.");
    return false;
  }
  return true;
};
