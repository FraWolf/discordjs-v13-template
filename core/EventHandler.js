const { Collection, MessageEmbed } = require("discord.js");
const fs = require("fs");
const EVENTS_DIR = "./events";

module.exports = class EventHandler {
  constructor(client) {
    this.client = client;
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
};
