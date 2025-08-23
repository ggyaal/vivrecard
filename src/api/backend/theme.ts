import { DefaultTheme } from "styled-components/dist/types";
import requestAutoRefresh from "../../utils/requestAutoRefresh";
import { darkTheme, lightTheme } from "../../styles/theme";
import { HiSun } from "react-icons/hi";
import { HiMoon } from "react-icons/hi2";
import { IconType } from "react-icons";
import { debounce } from "lodash";

export const getTheme = async (memberId: string): Promise<string> => {
  const res = await requestAutoRefresh({
    path: `/api/v1/members/${memberId}/themes`,
    requiredLogin: true,
  });

  if (!res.isSuccess) {
    return "light";
  }

  return res.data.name as string;
};

export const updateOrCreateTheme = async (
  memberId: string,
  name: string
): Promise<string> => {
  const res = await requestAutoRefresh({
    path: `/api/v1/members/${memberId}/themes`,
    method: "POST",
    requiredLogin: true,
    body: { name },
  });

  if (!res.isSuccess) {
    return "light";
  }

  return res.data.name as string;
};

export const lazyUpdateOrCreateTheme = debounce((memberId, name) => {
  updateOrCreateTheme(memberId, name);
}, 600);

const theme = {
  light: lightTheme,
  dark: darkTheme,
} as const;

const themeIcon = {
  light: HiSun,
  dark: HiMoon,
};

type ThemeKey = keyof typeof theme;
type ThemeIconKey = keyof typeof themeIcon;

const isValidTheme = (t: any): t is ThemeKey => Object.keys(theme).includes(t);
const isValidThemeIcon = (t: any): t is ThemeIconKey =>
  Object.keys(themeIcon).includes(t);

export const getThemeByName = (name: string): DefaultTheme => {
  return isValidTheme(name) ? theme[name] : theme["light"];
};

export const getThemeIconByName = (name: string): IconType => {
  return isValidThemeIcon(name) ? themeIcon[name] : themeIcon["light"];
};

export function changeThemeByName(name: string): string {
  if (!isValidTheme(name)) return "light";
  const keys = Object.keys(theme);

  const idx = (keys.indexOf(name) + 1) % keys.length;

  return Object.keys(theme)[idx];
}
