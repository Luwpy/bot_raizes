import { createCommand } from "#base";
import { prisma } from "#database";
import { icon } from "#functions";
import { menus } from "#menus";
import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
} from "discord.js";
import { res } from "functions/utils/res.js";

createCommand({
  name: "profile",
  description: "Comandos relacionado ao menu de perfil",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "view",
      description: "Veja o perfil de um usuário",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "member",
          description: "Mencione um membro para ver o perfil",
          type: ApplicationCommandOptionType.User,
          required: false,
        },
      ],
    },
    {
      name: "edit",
      description: "Use esse comando para definir a frase do seu personagem",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "sentence",
          description: "Defina a frase do seu personagem",
          type: ApplicationCommandOptionType.String,
          required: true,
          maxLength: 100,
        },
      ],
    },
  ],
  async run(interaction) {
    const { guild, options, member: executor } = interaction;

    switch (options.getSubcommand(true)) {
      case "view": {
        const member = options.getMember("member") || executor;

        await interaction.reply(
          res.warning(
            `${icon.spinning} Buscando informações do membro! Aguarde...`,
          ),
        );

        await member.fetch();

        const memberData = await prisma.member.upsert({
          where: {
            id_guildId: {
              id: member.id,
              guildId: guild.id,
            },
          },
          update: {},
          create: {
            id: member.id,
            guildId: guild.id,
            xp: 0,
            money: 0,
          },
        });

        await interaction.editReply(
          menus.profile.main(member, executor, memberData),
        );

        return;
      }

      case "edit": {
        const sentence = options.getString("sentence", true);

        await prisma.member.update({
          where: {
            id_guildId: {
              id: executor.id,
              guildId: guild.id,
            },
          },
          data: {
            sentence,
          },
        });

        await interaction.reply(
          res.success(
            `${icon.check} Sua frase foi atualizada para: \`${sentence}\``,
          ),
        );

        return;
      }
    }
  },
});
