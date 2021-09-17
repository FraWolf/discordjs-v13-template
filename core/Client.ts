import { Client, ClientOptions, Collection } from "discord.js";

import CommandHandler from "./CommandHandler";
import EventHandler from "./EventHandler";
import CommandLoader from "./CommandLoader";

import Utils from "./Utils";
import Settings from "./Settings";
import DatabaseHandler from "./Database";
import { Command } from "../types/command";
import { DiscordEvent } from "../types/event";

declare module "discord.js" {
  interface ClientOptions {
    ownerId: string;
    admins: string;
  }
}

export default class BotClient extends Client {
  public Settings: Settings;
  public Utils: Utils;

  public events: Collection<string, DiscordEvent>;
  public commands: Collection<string, Command>;

  constructor(options: ClientOptions) {
    super(options);
    this.Settings = new Settings(this);
    this.Utils = new Utils(this);

    this.commands = new Collection();
    this.events = new Collection();
  }

  async login(token: string) {
    new CommandLoader(this, token);
    new CommandHandler(this);
    new EventHandler(this);
    new DatabaseHandler(this);

    // Login on Discord
    return super.login(token);
  }
}
