const { Events } = require("discord.js");

const { createAudioPlayer, NoSubscriberBehavior, getVoiceConnection, AudioPlayerStatus } = require("@discordjs/voice");

const fs = require("fs");

const path = require("path");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction, player, audioToPlay) {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`
      );
      return;
    }

    if (interaction.commandName === "ping") {
      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(`Error executing ${interaction.commandName}`);
        console.error(error);
      }
    } else if (interaction.commandName === "join-vc") {
      await command.execute(interaction);
    } else if (interaction.commandName === "leave-vc") {
      await command.execute(interaction);
    } else if (interaction.commandName === "play") {
      await command.execute(interaction, player, audioToPlay);
    } else if (interaction.commandName === "pause") {
      await command.execute(interaction, player, audioToPlay);
    } else if (interaction.commandName === "unpause") {
      await command.execute(interaction, player, audioToPlay);
    }
  },
};
