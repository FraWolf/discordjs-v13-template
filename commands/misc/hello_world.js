const { SlashCommandBuilder } = require("@discordjs/builders");

const informations = new SlashCommandBuilder()
  .setName("helloworld")
  .setDescription("Sample Hello World command");

module.exports = {
  data: informations,
  async execute(interaction, client) {
    console.log(interaction.member);

    await interaction.reply({
      content: "Hello World! :)",
      ephemeral: false,
    });
  },
};
