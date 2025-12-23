import type { LocaleKeys } from "@/lib/internalization/i18n.schema";

export type RouteLink = {
  code: LocaleKeys,
  path: string;
  icon?: JSX.Element;
};