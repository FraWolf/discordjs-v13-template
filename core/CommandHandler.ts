import { Collection } from "discord.js";
import { Command } from "../types/command";
import BotClient from "./Client";

export const registerCommandHandler = (
  client: BotClient,
  commands: Collection<string, Command>
) => {
  client.client.on("interactionCreate", async (interaction) => {
    if (interaction.isCommand() && commands.has(interaction.commandName)) {
      await commands.get(interaction.commandName)?.execute(interaction, client);
    }
  });
};
