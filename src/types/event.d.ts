import { ClientEvents } from "discord.js";
import BotClient from "../core/client";

export interface DiscordEvent<
  K extends keyof ClientEvents = keyof ClientEvents
> {
  name: K;
  execute: (client: BotClient, ...args: ClientEvents[K]) => Promise<void>;
}
