import { settings } from "#settings";
import { brBuilder, createContainer, createRow } from "@magicyan/discord";
import {
  ButtonBuilder,
  ButtonStyle,
  type InteractionReplyOptions,
} from "discord.js";

export function setupMenu<R>(): R {
  const container = createContainer(settings.colors.azoxo);

  return {
    flags: ["Ephemeral", "IsComponentsV2"],
    components: [container],
  } satisfies InteractionReplyOptions as R;
}
