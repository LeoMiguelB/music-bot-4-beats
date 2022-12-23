const { SlashCommandBuilder } = require("discord.js");

const { getVoiceConnection } = require("@discordjs/voice");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unpause")
    .setDescription("unpauses audio"),
  async execute(interaction, player, audioToPlay) {
    const connection = getVoiceConnection(interaction.guild.id);

    console.log(player.state.status);


    if (connection && player.state.status == "paused") {
      await player.unpause();
      await interaction.reply("unpaused audio...");
    } else {
      await interaction.reply(connection ? "bot is not paused" : "bot needs to be in a channel");
    }
  },
};
