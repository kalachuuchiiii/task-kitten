import { Skeleton } from "./skeleton";


export const LinkPlaceholder = () => {
    
     return (
       <div className=" flex items-center my-1 gap-2">
         <Skeleton className="size-4 bg-neutral-200 rounded" />
         <Skeleton className="h-5 bg-neutral-200 w-8/12" />
       </div>
     );
}