import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../../types/command";

const informations = new SlashCommandBuilder()
  .setName("helloworld")
  .setDescription("Sample Hello World command");

const helloWorld: Command = {
  data: informations.toJSON(),
  async execute(interaction, client) {
    await interaction.reply({
      content: "Hello World! :)",
      ephemeral: false,
    });
  },
};

export default helloWorld;
