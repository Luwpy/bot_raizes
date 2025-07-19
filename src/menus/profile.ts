import { icon } from "#functions";
import { settings } from "#settings";
import {
  brBuilder,
  createContainer,
  createMediaGallery,
  createRow,
  createThumbArea,
  Separator,
} from "@magicyan/discord";
import { Member } from "@prisma/client";
import {
  ButtonBuilder,
  ButtonStyle,
  GuildMember,
  time,
  type InteractionReplyOptions,
} from "discord.js";
import { calculateLevel } from "functions/utils/xp.js";
import { userStatus } from "shared/status.js";

export function profileMenu<R>(
  member: GuildMember,
  executor: GuildMember,
  memberData: Member,
): R {
  const { guild, roles, user, presence } = member;

  const joinedAt = member.joinedAt ?? new Date();
  const noRoles = roles.highest.id === guild.id;

  const highestRole = noRoles ? "\ `Sem cargo`\ " : roles.highest;

  const bannerUrl = member.displayBannerURL({ size: 512 });

  const banner = bannerUrl ? createMediaGallery(bannerUrl) : null;

  const thumbArea = createThumbArea({
    content: brBuilder(
      `## Perfil de ${member.displayName}`,
      `\`"${memberData.sentence}"\``,
      `${highestRole} ${member} **@${user.username}**`,
      presence ? `${icon.signal} Status: ${userStatus(presence.status)}` : null,
      `${icon.calendar} Entrou no servidor ${time(joinedAt, "R")}`,
    ),
    thumbnail: member.displayAvatarURL({ size: 1024 }),
  });

  const roleList = Array.from(roles.cache.values()).filter(
    (r) => r.id !== member.guild.id,
  );

  const rolesContent = noRoles
    ? null
    : brBuilder(
        `### ${icon.role} Cargos`,
        roleList.map((role) => role.toString()).join(", "),
      );

  const level = calculateLevel(memberData.xp);

  const characterContent = brBuilder(
    `### ${icon.chart} Personagem`,
    "> Informações do personagem",
    `**Dinheiro:** ${memberData.money} ${icon.moneybag}`,
    `**Nível:** ${level.level}`,
    `**XP:** ${memberData.xp}`,
    `**XP Necessário para o próximo nível:** ${level.xpToNextLevel}`,
  );

  const customId = (action: string) => `profile/${member.id}/${action}`;

  const row = createRow(
    new ButtonBuilder({
      customId: customId("refresh"),
      style: ButtonStyle.Success,
      emoji: icon.reload,
    }),
    new ButtonBuilder({
      customId: customId("timeout"),
      style: ButtonStyle.Danger,
      emoji: icon.timedout,
      label: "Castigo",
      disabled:
        executor.id === member.id ||
        !executor.permissions.has("ModerateMembers"),
    }),
    new ButtonBuilder({
      customId: customId("kick"),
      style: ButtonStyle.Secondary,
      emoji: icon.invisible,
      label: "Expulsar",
      disabled:
        executor.id === member.id || !executor.permissions.has("KickMembers"),
    }),
    new ButtonBuilder({
      customId: customId("ban"),
      style: ButtonStyle.Danger,
      emoji: icon.hammer,
      label: "Banir",
      disabled:
        executor.id === member.id || !executor.permissions.has("BanMembers"),
    }),
  );

  const container = createContainer({
    accentColor: noRoles ? settings.colors.default : member.displayHexColor,
    components: [
      banner,
      thumbArea,
      Separator.Large,
      rolesContent,
      characterContent,
      Separator.Default,
      row,
      `- Painel de perfil de ${member.displayName}`,
    ],
  });

  return {
    flags: ["IsComponentsV2"],
    components: [container],
  } satisfies InteractionReplyOptions as R;
}
