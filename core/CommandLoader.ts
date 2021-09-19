import { Collection } from "discord.js";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import BotClient from "./Client";
import commands from "../commands";

export default class CommandLoader {
  constructor(private client: BotClient, token: string) {
    this._loadCommand(token);
  }

  async _loadCommand(token: string) {
    const slashCommands = [];
    this.client.commands = new Collection();

    for (const command of commands) {
      this.client.commands.set(command.data.name, command);
      slashCommands.push(command.data.toJSON());
    }

    const rest = new REST({ version: "9" }).setToken(token);
    try {
      console.log("[SLASH] Started refreshing application (/) commands.");

      // Load all commands

      await rest.put(
        Routes.applicationGuildCommands(
          this.client.Settings.client_id,
          this.client.Settings.default_guild_id
        ),
        {
          body: slashCommands,
        }
      );

      // Setup commands permissions

      console.log("[SLASH] Successfully reloaded application (/) commands.");
    } catch (error) {
      console.error(error);
    }
  }
}
