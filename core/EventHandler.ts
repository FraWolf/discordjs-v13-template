import { ClientEvents, Collection, MessageEmbed } from "discord.js";
import events from "../events";
import { DiscordEvent } from "../types/event";
import BotClient from "./Client";

export const registerEventHandler = (client: BotClient) => {
  const eventsCollection = new Collection<string, DiscordEvent>();

  for (const event of events) {
    client.on(event.name, (...args) => {
      if (
        event.name !== "messageCreate" ||
        (event.name === "messageCreate" &&
          !(args as ClientEvents["messageCreate"])[0].interaction)
      )
        event.execute(client, ...args);
    });
    eventsCollection.set(event.name, event);
  }

  return eventsCollection;
};
