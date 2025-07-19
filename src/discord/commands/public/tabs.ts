import { createCommand } from "#base";
import { menus } from "#menus";
import { ApplicationCommandType } from "discord.js";

createCommand({
    name: "tabs",
    description: "app command",
    type: ApplicationCommandType.ChatInput,
    async run(interaction){
        await interaction.reply(menus.tabs("tab1"))
    }
});