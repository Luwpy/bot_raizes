import { createResponder, ResponderType } from "#base";
import { menus } from "#menus";
import { TabKey } from "shared/tabs.js";

createResponder({
    customId: "tabs/simple/:key",
    types: [ResponderType.Button], cache: "cached",
    async run(interaction, {key}) {
        interaction.update(menus.tabs(key as TabKey))
    },
});