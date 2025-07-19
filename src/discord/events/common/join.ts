import { createEvent } from "#base";
import { prisma } from "#database";

createEvent({
  name: "bot_add",
  event: "guildCreate",
  async run(guild) {
    const action = await prisma.guild.upsert({
      where: { id: guild.id },
      update: {},
      create: {
        id: guild.id,
      },
    });
    console.log("Bot added to guild: ", guild.name);

    console.log(action);
  },
});

createEvent({
  name: "member_join",
  event: "guildMemberAdd",
  async run(member) {
    const action = await prisma.member.upsert({
      where: {
        id_guildId: {
          id: member.id,
          guildId: member.guild.id,
        },
      },
      update: {},
      create: {
        id: member.id,
        guildId: member.guild.id,
        xp: 0,
        money: 0,
      },
    });

    console.log("Member joined:", member.user.username);
    console.log(action);
  },
});

createEvent({
  name: "quick_fix",
  event: "interactionCreate",
  async run(interaction) {
    const action = await prisma.guild.upsert({
      where: { id: interaction.guild!.id },
      update: {},
      create: {
        id: interaction.guild!.id,
      },
    });
  },
});
