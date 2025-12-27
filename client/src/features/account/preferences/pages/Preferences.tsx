import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemHeader,
  ItemTitle,
} from "@/components/ui/item";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "../hooks";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { LANGUAGES } from "@shared/constants";
import { PageLayout } from "@/components/layout/PageLayout";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const Preferences = () => {
  const { toggleDarkMode, isDarkMode } = useTheme();
  const { i18n, t } = useTranslation();
  const { language, changeLanguage } = i18n;

  useEffect(() => {
    //temporary
    localStorage.setItem("lang", language);
  }, [language]);

  return (
    <div>
      <div className="border rounded-lg p-3">
        <Item>
          <ItemContent>
            <ItemTitle>Dark mode</ItemTitle>
            <ItemDescription>Dark Interface</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Switch checked={isDarkMode} onCheckedChange={toggleDarkMode} />
          </ItemActions>
        </Item>
        <Item>
          <ItemContent>
            <ItemTitle>Language</ItemTitle>
            <ItemDescription>
              {t("preferences.action.change_language")}
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Select
              value={language}
              onValueChange={(val) =>
                changeLanguage(val as (typeof LANGUAGES)[number])
              }
            >
              <SelectTrigger>{language}</SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((lang) => (
                  <SelectItem value={lang}>{lang}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </ItemActions>
        </Item>
      </div>
    </div>
  );
};

export default Preferences;
