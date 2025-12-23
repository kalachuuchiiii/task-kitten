import type { LocaleKeys } from "@/lib/internalization/i18n.schema";
import {  useTranslation } from "react-i18next";

export const PageLayout = ({
  title,
  description,
  children,
}: {
  title: LocaleKeys;
  description?: LocaleKeys;
  children: React.ReactNode;
}) => {
  const { t } = useTranslation();
  return (
    <div className="py-12  w-full  ">
      <header className="text-center px-20 mb-10">
        <h1 className="h-full w-full my-2 text-center text-4xl font-bold tracking-tight">
          <p>{t(title)}</p>
        </h1>
        {description && (
          <p className="opacity-80">
            <p>{t(description)}</p>
          </p>
        )}
      </header>
      <main className="w-full px-10">{children}</main>
    </div>
  );
};
