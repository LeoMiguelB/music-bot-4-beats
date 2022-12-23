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

    if (connection && player.state.status == "idle") {
      player.play(resource);

      connection.subscribe(player);

      interaction.reply(`currently playing...`);
    } else {
      interaction.reply(
        connection
          ? "bot needs to be in a channel to play audio"
          : "bot is already playing audio"
      );
    }
  },
};
