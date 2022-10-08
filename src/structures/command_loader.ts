import path from "path";
import { Collection } from "discord.js";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";
import { Command } from "../types/command";
import { requireDirectory } from "../utils/requireDirectory";
import { isDev } from "./constants";

const COMMANDS_DIR = "../commands";

export const loadCommands = async (token: string) => {
  const slashCommands: unknown[] = [];
  const commandsCollection = new Collection<string, Command>();

  const { APPLICATION_ID, DEFAULT_GUILD_ID } = process.env;

  requireDirectory(path.resolve(__dirname, COMMANDS_DIR), (command: Command) => {
    commandsCollection.set(command.data.name, command);
    slashCommands.push(command.data);
  });

  const rest = new REST({ version: "10" }).setToken(token);
  try {
    console.log(`[Notice] Slash commands loaded in ${isDev ? "dev" : "prod"} environment`);
    console.log("[SLASH] Started refreshing application (/) commands.");

    const routing = isDev
      ? Routes.applicationGuildCommands(APPLICATION_ID!, DEFAULT_GUILD_ID!)
      : Routes.applicationCommands(APPLICATION_ID!);

    await rest.put(routing, {
      body: slashCommands,
    });

    console.log("[SLASH] Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
  return commandsCollection;
};
