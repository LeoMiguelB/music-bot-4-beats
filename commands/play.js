const { SlashCommandBuilder } = require("discord.js");
const {
  createAudioResource,
  getVoiceConnection,
  AudioPlayerError,
} = require("@discordjs/voice");

const path = require("path");

const fs = require("fs");

module.exports = {
  data: new SlashCommandBuilder().setName("play").setDescription("plays audio"),
  async execute(interaction, player, audioToPlay) {
    const current = audioToPlay.currentSong;

    const songPath = audioToPlay.playlist[current];

    const resource = createAudioResource(songPath);

    const connection = getVoiceConnection(interaction.guild.id);

    const status =
      player.state.status == "idle" ||
      player.state.status == "paused" ||
      player.state.status == "autopaused";

    console.log(status);

    if (connection && status) {
      if (player.state.status == "paused") {
        await player.unpause();

        await interaction.reply("unpaused the audio");
      } else {
        await player.play(resource);

        connection.subscribe(player);

        await interaction.reply(`currently playing...`);
      }
    } else {
      await interaction.reply(
        connection
          ? "bot is already playing audio"
          : "bot is not in a voice channel"
      );
    }
  },
};
