const { Collection } = require("discord.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");
const COMMANDS_DIR = "./commands";

module.exports = class CommandLoader {
  constructor(client, token) {
    this.client = client;
    this._loadCommand(token);
  }

  async _loadCommand(token) {
    const slashCommands = [];
    this.client.commands = new Collection();

    const commandFiles = fs.readdirSync(COMMANDS_DIR);
    for (const folder of commandFiles) {
      const selected_folder = fs.readdirSync(`${COMMANDS_DIR}/${folder}`);
      for (const file of selected_folder) {
        const command = require(`.${COMMANDS_DIR}/${folder}/${file}`);
        this.client.commands.set(command.data.name, command);
        slashCommands.push(command.data.toJSON());
      }
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
};
