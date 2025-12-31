import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { SheetContent, SheetHeader } from "@/components/ui/sheet"
import { Mail } from "lucide-react"


export const EmailFormSheet = () => {

    return <SheetContent>
        <SheetHeader>
            Email Form
        </SheetHeader>
        <InputGroup>
        <InputGroupAddon>
         <Mail />
         <InputGroupInput placeholder="Email" />
        </InputGroupAddon>
        </InputGroup>
        <footer>
            <button>
                Send Verification Code
            </button>
        </footer>
    </SheetContent>
}