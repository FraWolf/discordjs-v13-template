import { Collection } from "discord.js";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { Command } from "../types/command";
import { requireDirectory } from "../utils/requireDirectory";

const COMMANDS_DIR = "./commands";

export const loadCommands = async (token: string) => {
  const slashCommands: unknown[] = [];
  const commandsCollection = new Collection<string, Command>();

  const { APPLICATION_ID, DEFAULT_GUILD_ID } = process.env;

  requireDirectory(COMMANDS_DIR, (command: Command) => {
    commandsCollection.set(command.data.name, command);
    slashCommands.push(command.data.toJSON());
  });

  const rest = new REST({ version: "9" }).setToken(token);
  try {
    console.log("[SLASH] Started refreshing application (/) commands.");

    // Load all commands

    await rest.put(
      Routes.applicationGuildCommands(APPLICATION_ID!, DEFAULT_GUILD_ID!),
      {
        body: slashCommands,
      }
    );

    // Setup commands permissions

    console.log("[SLASH] Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
  return commandsCollection;
};
