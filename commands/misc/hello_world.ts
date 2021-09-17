import { Command } from "../../types/command";

const { SlashCommandBuilder } = require("@discordjs/builders");

const informations = new SlashCommandBuilder()
  .setName("helloworld")
  .setDescription("Sample Hello World command");

const helloWorld: Command = {
  data: informations,
  async execute(interaction, client) {
    console.log(interaction.member);

    await interaction.reply({
      content: "Hello World! :)",
      ephemeral: false,
    });
  },
};

export default helloWorld;
