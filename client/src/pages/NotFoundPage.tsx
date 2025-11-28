import { Separator } from "@/components/ui/separator"




const NotFoundPage = () => {
  return (
    <div className="h-120 flex items-center justify-center">
      <div className="flex text-4xl font-bold h-12 tracking-tighter items-center gap-2">
        <p>404</p> <Separator orientation="vertical" className="bg-black"  /> <p>Page not found</p>
      </div>
    </div>
  );
}

export default NotFoundPage