import { icon } from "#functions";
import { brBuilder } from "@magicyan/discord";

export type TabKey = "tab1" | "tab2";

export interface TabData {
  label: string;
  title: string;
  description: string;
  emoji: string | { id: string };
  link?: {
    label: string;
    url: string;
  };
}

export function tabsData(): Record<TabKey, TabData> {
  return {
    tab1: {
      label: "Primeira aba",
      title: "Primeira aba",
      emoji: icon.boost1,
      description: brBuilder(`essa é a primeira aba`, `estamos em teste`),
    },
    tab2: {
      label: "Segunda aba",
      title: "Segunda aba",
      emoji: icon.url,
      description: brBuilder(`Link para um site`),
      link: {
        label: "link do vídeo",
        url: "https://www.youtube.com/watch?v=sL8UQz2GGLY&t=1157s",
      },
    },
  };
}
