import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useAuthActions } from "@/features/auth";
import { CREDENTIAL_LIMITS } from "@shared/limits";
import type { passwordFormSchema } from "@shared/schema";
import { useState, type FormEvent } from "react";
import { z } from "zod";

const { password } = CREDENTIAL_LIMITS;

export const PasswordFormSheet = () => {
  const [passwordForm, setPasswordForm] = useState<
    z.infer<typeof passwordFormSchema>
  >({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { updatePassword, isUpdatingPassword } = useAuthActions();
  const handleUpdatePassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updatePassword(passwordForm);
  };

  return (
    <SheetContent className="p-3">
      <SheetHeader>
        <SheetTitle>Update Password</SheetTitle>
        <SheetDescription>Update your account password here.</SheetDescription>
      </SheetHeader>
      <form id = 'passwordFormSheet' onSubmit={handleUpdatePassword} className="space-y-4">
        <div className="space-y-2">
          <Label>Old Password</Label>
          <Input
            minLength={password.min}
            maxLength={password.max}
            required
            value={passwordForm.oldPassword}
            name="oldPassword"
            onChange={handleChange}
            placeholder="Old Password"
            type="password"
          />
        </div>
        <div className="space-y-2">
          <Label>New Password</Label>
          <Input
            minLength={password.min}
            maxLength={password.max}
            required
            value={passwordForm.newPassword}
            name="newPassword"
            onChange={handleChange}
            placeholder="New Password"
            type="password"
          />
        </div>
        <div className="space-y-2">
          <Label>Confirm New Password</Label>
          <Input
            minLength={password.min}
            maxLength={password.max}
            required
            value={passwordForm.confirmNewPassword}
            name="confirmNewPassword"
            onChange={handleChange}
            placeholder="Confirm New Password"
            type="password"
          />
        </div>
      </form>
      <footer className="w-full">
        <button type = 'submit' form="passwordFormSheet" className="button-bg w-full p-1.5">Update Password</button>
      </footer>
    </SheetContent>
  );
};
