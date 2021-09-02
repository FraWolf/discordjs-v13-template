module.exports = {
  name: "ready",
  async execute(client, MessageEmbed) {
    // Starting debug
    console.log(
      `[DISCORD] Ready as ${client.user.tag} - Loaded ${client.commands.size} commands and ${client.events.size} events`
    );

    // Setup bot presence
    client.user.setPresence({
      activities: [{ type: "PLAYING", name: "DiscordJS v13 Template" }],
      status: "online",
    });

    // @Note: This command is used to clear all slash commands registered in the default guild
    // Get all slash commands
    const allCommands = await client.guilds.cache
      .get(client.Settings.default_guild_id)
      .commands.fetch();

    // Delete all commands
    allCommands.forEach((command) => {
      command.delete();
    });
  },
};
