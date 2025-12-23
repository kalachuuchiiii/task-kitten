import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { useSession } from "@/features/auth";
import { NicknameFormSheet, UsernameFormSheet } from "../components";

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
              <button>Change</button>
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
              <button>Change</button>
            </SheetTrigger>
            <NicknameFormSheet />
          </Sheet>
        </ItemActions>
      </Item>
    </div>
  );
};

export default AccountManager;
