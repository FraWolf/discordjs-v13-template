import { ClientEvents } from "discord.js";
import { DiscordEvent } from "../types/event";
import readyBot from "./discord/readyBot";

const events: DiscordEvent<keyof ClientEvents>[] = [readyBot] as DiscordEvent<
  keyof ClientEvents
>[];

export default events;
