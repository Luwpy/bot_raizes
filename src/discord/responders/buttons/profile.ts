import { createResponder, ResponderType } from "#base";
import { prisma } from "#database";
import { icon } from "#functions";
import { menus } from "#menus";
import { res } from "functions/utils/res.js";

createResponder({
  customId: "profile/:memberId/:action",
  types: [ResponderType.Button],
  cache: "cached",
  async run(interaction, { memberId, action }) {
    const { guild, member: executor } = interaction;
    await interaction.deferUpdate();

    const member = await guild.members.fetch(memberId).catch(() => null);

    if (!member) {
      await interaction.editReply(
        res.warning(`${icon.danger} O membro não está mais no servidor!`),
      );
      return;
    }
    await member.fetch(true);

    switch (action) {
      case "refresh": {
        const data = await prisma.member.findUnique({
          where: {
            id_guildId: {
              id: member.id,
              guildId: member.guild.id,
            },
          },
        });

        await interaction.editReply(
          menus.profile.main(member, executor, data!),
        );
        return;
      }

      case "timeout": {
        await member.timeout(10000, "punimento automático");
        return;
      }
      case "kick": {
        await member.kick("punimento automático");
        return;
      }
      case "ban": {
        await member.ban();
        return;
      }
    }
  },
});
