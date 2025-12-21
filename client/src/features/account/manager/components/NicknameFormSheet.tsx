import {
  InputGroup,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useSession } from "@/features/auth";

export const NicknameFormSheet = () => {
  const { user } = useSession();

  return (
    <SheetContent className="p-3">
      <SheetHeader>
        <SheetTitle>Change Nickname</SheetTitle>
        <SheetDescription>
          You can only change your nickname once every 7 days.
        </SheetDescription>
      </SheetHeader>
      <main>
        <InputGroup>
          <InputGroupText className="pl-2">Nickname</InputGroupText>
          <InputGroupInput placeholder={user?.nickname ?? ''} />
        </InputGroup>
      </main>
      <button className="button-bg w-full p-1.5">Update</button>
    </SheetContent>
  );
};
