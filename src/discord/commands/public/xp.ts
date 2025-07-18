import { createCommand } from "#base";
import { prisma } from "#database";
import { menus } from "#menus";
import { ApplicationCommandType } from "discord.js";

createCommand({
  name: "xp",
  description: "app command",
  type: ApplicationCommandType.ChatInput,
  async run(interaction) {
    const { guild, member: executor } = interaction;

    const memberData = await prisma.member.upsert({
      where: {
        id_guildId: {
          id: executor.id,
          guildId: guild.id,
        },
      },
      update: {},
      create: {
        id: executor.id,
        guildId: guild.id,
        xp: 0,
        money: 0,
      },
    });

    console.log(memberData);

    interaction.reply(menus.xp.profile(guild, memberData));
  },
});
