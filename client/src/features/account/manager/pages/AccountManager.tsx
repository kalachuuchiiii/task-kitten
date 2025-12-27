import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { useSession } from "@/features/auth";
import { NicknameFormSheet, PasswordFormSheet, UsernameFormSheet } from "../components";
import { Button } from "@/components/ui/button";
import { PencilLineIcon, UserLock } from "lucide-react";

const AccountManager = () => {
  const { user } = useSession();

  if (!user) return;
  return (
    <div>
      <Item>
        <ItemContent>
          <ItemTitle>Username</ItemTitle>
          <ItemDescription>{user?.username}</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Sheet>
            <SheetTrigger>
              <Button variant={"outline"}>
                <PencilLineIcon />
              </Button>
            </SheetTrigger>

            <UsernameFormSheet />
          </Sheet>
        </ItemActions>
      </Item>
      <Item>
        <ItemContent>
          <ItemTitle>Nickname</ItemTitle>
          <ItemDescription>{user?.nickname ?? "None"}</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Sheet>
            <SheetTrigger>
              <Button variant={"outline"}>
                <PencilLineIcon />
              </Button>
            </SheetTrigger>
            <NicknameFormSheet />
          </Sheet>
        </ItemActions>
      </Item>
      <Item>
        <ItemContent>
          <ItemTitle>Password</ItemTitle>
          <ItemDescription>Change your password</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Sheet>
            <SheetTrigger>
              <Button variant={"outline"}>
                <UserLock />
              </Button>
            </SheetTrigger>
           <PasswordFormSheet />
          </Sheet>
        </ItemActions>
      </Item>
    </div>
  );
};

export default AccountManager;
