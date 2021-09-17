import { Collection, MessageEmbed } from "discord.js";
import fs from "fs";
import BotClient from "./Client";
const EVENTS_DIR = "./events";

export default class EventHandler {
  constructor(private client: BotClient) {
    this._eventHandler();
  }

  _eventHandler() {
    this.client.events = new Collection();

    const eventsFolder = fs.readdirSync(EVENTS_DIR);
    for (const folder of eventsFolder) {
      const selected_folder = fs.readdirSync(`${EVENTS_DIR}/${folder}`);
      for (const file of selected_folder) {
        const event = require(`.${EVENTS_DIR}/${folder}/${file}`);
        this.client.on(event.name, (...args) => {
          if (
            event.name !== "messageCreate" ||
            (event.name === "messageCreate" && !args[0].interaction)
          )
            event.execute(this.client, MessageEmbed, ...args);
        });
        this.client.events.set(event.name, event);
      }
    }
  }
}
