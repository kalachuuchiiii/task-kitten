import { X } from "lucide-react"
import { memo } from "react"


export const KeywordList = memo(({ keywords = [], handleRemoveKeyword }:{keywords: string[], handleRemoveKeyword: (val: string) => void}) => {

    return <div className="w-full text-xs  flex flex-wrap items-center gap-1">
         {keywords.map((kw) => (
          <p key = {kw} className="px-2 py-1 bg-muted rounded-lg   w-fit rounded flex items-center gap-1 ">
            {kw} <div className=" hover-translucent">
              <X size="12" onClick={() => handleRemoveKeyword(kw)}  /></div>{" "}
          </p>
        ))}
    </div>
})