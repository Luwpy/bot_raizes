import { settings } from "#settings";
import {
  brBuilder,
  createContainer,
  createLinkButton,
  createRow,
  createSeparator,
  wrapButtons,
} from "@magicyan/discord";
import {
  ButtonBuilder,
  ButtonStyle,
  type InteractionReplyOptions,
} from "discord.js";
import { TabKey, tabsData } from "shared/tabs.js";

export function simpleTabsMenu<R>(tab: TabKey): R {
  const tabs = tabsData();
  const data = tabs[tab];

  const container = createContainer(
    settings.colors.azoxo,
    ...wrapButtons(
      5,
      Object.entries(tabs).map(
        ([key, data]) =>
          new ButtonBuilder({
            customId: `tabs/simple/${key}`,
            label: data.label,
            emoji: data.emoji,
            disabled: key === tab,
            style: key === tab 
            ? ButtonStyle.Primary 
            : ButtonStyle.Secondary,
          })),
    ),
    createSeparator(),
    brBuilder(
        `# ${data.emoji} ${data.title}`,
        data.description
    ),
    data.link
    ? createLinkButton({ url: data.link.url, label: data.link.label})
    : null
  );

  return {
    flags: ["Ephemeral", "IsComponentsV2"],
    components: [container],
  } satisfies InteractionReplyOptions as R;
}
