import { Collection } from "discord.js";
import { Command } from "../types/command";
import BotClient from "./client";

export const registerCommandHandler = (client: BotClient, commands: Collection<string, Command>) => {
  client.client.on("interactionCreate", async (interaction) => {
    if (interaction.isChatInputCommand() && commands.has(interaction.commandName)) {
      await commands
        .get(interaction.commandName)
        ?.execute(interaction, client)
        .catch((e) => {
          console.log(e.message);
        });
    } else if (interaction.isAutocomplete() && commands.has(interaction.commandName)) {
      // @ts-ignore
      await commands
        .get(interaction.commandName)
        ?.autocomplete(interaction, client)
        .catch((e) => {
          console.log(e.message);
        });
    }
  });
};
