import {
  InputGroup,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { useState } from "react";

export const KeywordInput = ({
  handleAddKeyword,

}: {
  handleAddKeyword: (val: string) => void;

}) => {
  const [keyword, setKeyword] = useState<string>("");
  return (
    <InputGroup className="flex items-center justify-between p-3">
      <InputGroupText>Keywords</InputGroupText>
      <InputGroupInput
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        id="keyword-input"
      />
      <InputGroupButton onClick={() => handleAddKeyword(keyword)}>Add</InputGroupButton>
    </InputGroup>
  );
};
