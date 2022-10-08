import path from "path";
import { ClientEvents, Collection } from "discord.js";
import { WrappedEvents } from "../types/event";
import { requireDirectory } from "../utils/requireDirectory";
import BotClient from "./client";

const EVENTS_DIR = "../events";

export const registerEventHandler = (client: BotClient) => {
  const eventsCollection = new Collection<string, WrappedEvents>();

  requireDirectory(
    path.resolve(__dirname, EVENTS_DIR),
    (event: WrappedEvents) => {
      client.client.on(event.name, (...args) => {
        if (event.type === "Discord") {
          if (
            event.name !== "messageCreate" ||
            (event.name === "messageCreate" &&
              !(args as ClientEvents["messageCreate"])[0].interaction)
          )
            // @ts-ignore
            event.execute(client, ...args);
        } else {
          // @ts-ignore
          event.execute(client, ...args);
        }
      });
      eventsCollection.set(event.name, event);
    }
  );

  return eventsCollection;
};
