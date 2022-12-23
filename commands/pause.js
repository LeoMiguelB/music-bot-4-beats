const { SlashCommandBuilder } = require("discord.js");

const { getVoiceConnection } = require("@discordjs/voice");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pause")
    .setDescription("pauses audio"),
  async execute(interaction, player, audioToPlay) {
    const connection = getVoiceConnection(interaction.guild.id);

    console.log(player.state.status);

    if (connection && player.state.status === "playing") {
      await player.pause();

      await interaction.reply("paused audio...");
    } else {
      await interaction.reply(
        connection
          ? "bot is not playing anything"
          : "bot needs to be in a voice channel"
      );
    }
  },
};
