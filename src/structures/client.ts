import { Client, ClientEvents, ClientOptions, Collection } from "discord.js";

import { registerCommandHandler } from "./command_handler";
import { registerEventHandler } from "./event_handler";

import { CommandsCollection, EventsCollection } from "../types/event";
import { loadCommands } from "./command_loader";

export default class BotClient {
  public events: EventsCollection;
  public commands: CommandsCollection;
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
