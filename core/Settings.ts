import BotClient from "./Client";

export default class Settings {
  constructor(private client: BotClient) {}

  // Basic bot required informations
  client_id = process.env.APPLICATION_ID!;
  default_guild_id = process.env.DEFAULT_GUILD_ID!; // @Note: The default guild id is for testing slash commands before you set it to global
}
