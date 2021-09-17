import { MessageEmbed } from "discord.js";
import BotClient from "../core/Client";

export interface DiscordEvent {
  name: string;
  execute: (client: BotClient, MessageEmbed: MessageEmbed) => Promise<void>;
}
