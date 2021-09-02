module.exports = class CommandHandler {
  constructor(client) {
    this.client = client;
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
          .execute(interaction, this.client);
      }
    });
  }
};
