import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import BotClient from "../core/client";

export interface Command {
  data: ReturnType<SlashCommandBuilder["toJSON"]>;
  execute: (
    interaction: CommandInteraction,
    client: BotClient
  ) => Promise<void>;
}
