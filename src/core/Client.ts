import { Client, ClientEvents, ClientOptions, Collection } from "discord.js";

import { registerCommandHandler } from "./command_handler";
import { registerEventHandler } from "./event_handler";
import { loadCommands } from "./command_loader";

import { Command } from "../types/command";
import { DiscordEvent } from "../types/event";

declare module "discord.js" {
  interface ClientOptions {
    ownerId: string;
    admins: string;
  }
}

export default class BotClient {
  public events: Collection<string, DiscordEvent<keyof ClientEvents>>;
  public commands: Collection<string, Command>;
  public client: Client;

  constructor(options: ClientOptions) {
    this.client = new Client(options);

    this.commands = new Collection();
    this.events = new Collection();
  }

  async login(token: string) {
    this.commands = await loadCommands(token);
    registerCommandHandler(this, this.commands);

    this.events = registerEventHandler(this);

    // Login on Discord
    return this.client.login(token);
  }
}
