import { settings } from "#settings";
import {
  brBuilder,
  createContainer,
  createEmbed,
  createRow,
  createSeparator,
} from "@magicyan/discord";
import { Member } from "@prisma/client";
import {
  ButtonBuilder,
  ButtonStyle,
  Guild,
  GuildMember,
  RPCVoiceSettingsInput,
  type InteractionReplyOptions,
} from "discord.js";

export function xpMenu<R>(guild: Guild, data: Member): R {
  const container = createContainer(
    settings.colors.azoxo,
    brBuilder(`Teste`),
    createSeparator(),
    brBuilder("Test"),
  );

  return {
    flags: ["Ephemeral", "IsComponentsV2"],
    components: [container],
  } satisfies InteractionReplyOptions as R;
}

export function xpUpdate<R>(
  color: string,
  target: GuildMember,
  data: Member,
): R {
  const xpContent = brBuilder(
    `@${target.user.username}, seu xp foi atualizado!`,
    `**XP:** ${data.xp}`,
  );

  const container = createContainer({
    accentColor: color,
    components: [xpContent],
  });

  return {
    flags: ["Ephemeral", "IsComponentsV2"],
    components: [container],
  } satisfies InteractionReplyOptions as R;
}
