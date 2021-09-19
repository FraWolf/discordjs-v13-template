import { ClientEvents, Collection, MessageEmbed } from "discord.js";
import events from "../events";
import BotClient from "./Client";

export default class EventHandler {
  constructor(private client: BotClient) {
    this._eventHandler();
  }

  _eventHandler() {
    this.client.events = new Collection();

    for (const event of events) {
      this.client.on(event.name, (...args) => {
        if (
          event.name !== "messageCreate" ||
          (event.name === "messageCreate" &&
            !(args as ClientEvents["messageCreate"])[0].interaction)
        )
          event.execute(this.client, ...args);
      });
      this.client.events.set(event.name, event);
    }
  }
}
