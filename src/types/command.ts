import { SlashCommandBuilder } from "@discordjs/builders";
import { AutocompleteInteraction, CommandInteraction } from "discord.js";
import BotClient from "../structures/client";

export interface Command {
  data: ReturnType<SlashCommandBuilder["toJSON"]>;
  autocomplete?: (interaction: AutocompleteInteraction, client: BotClient) => Promise<any>;
  execute: (interaction: CommandInteraction, client: BotClient) => Promise<any>;
}
