import BotClient from "./Client";

export default class CommandHandler {
  constructor(private client: BotClient) {
    this._commandHandler();
  }

  async _commandHandler() {
    this.client.on("interactionCreate", async (interaction) => {
      if (
        interaction.isCommand() &&
        this.client.commands.has(interaction.commandName)
      ) {
        await this.client.commands
          .get(interaction.commandName)
          ?.execute(interaction, this.client);
      }
    });
  }
}
