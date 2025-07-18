import { createCommand } from "#base";
import { menus } from "#menus";
import { ApplicationCommandType } from "discord.js";

createCommand({
  name: "setup",
  description: "app command",
  type: ApplicationCommandType.ChatInput,
  defaultMemberPermissions: ["Administrator"],
  async run(interaction) {
    const { guild } = interaction;

    interaction.reply(menus.setup.main(guild, "channel"));
  },
});
