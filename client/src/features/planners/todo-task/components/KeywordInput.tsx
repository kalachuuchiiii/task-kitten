import {
  InputGroup,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { TASK_LIMITS } from "@shared/limits";
import { memo, useMemo, useState } from "react";

export const KeywordInput = memo(({
  handleAddKeyword,
  keywords = []
}: {
  handleAddKeyword: (val: string) => void;
  keywords: string[]

}) => {
  const [keyword, setKeyword] = useState<string>("");
  const { keyword: keywordString, keyword: keywordArray } = TASK_LIMITS;
  const isButtonDisabled = useMemo(() => {
    return keywords.includes(keyword.trim().toLowerCase()) || keyword.length > keywordString.max || keyword.length < keywordString.min || keywords.length > keywordArray.max ;
  }, [keyword, keywords])

  return (
    <InputGroup className="flex items-center justify-between p-3">
      <InputGroupText>Keywords</InputGroupText>
      <InputGroupInput
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        id="keyword-input"
      />
      <InputGroupButton disabled = {isButtonDisabled} onClick={() => handleAddKeyword(keyword)}>Add</InputGroupButton>
    </InputGroup>
  );
});
