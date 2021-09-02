module.exports = class Settings {
  constructor(client) {
    this.client = client;
  }

  // Basic bot required informations
  client_id = "BOT_CLIENT_ID";
  default_guild_id = "DEFAULT_GUILD_ID"; // @Note: The default guild id is for testing slash commands before you set it to global
};
