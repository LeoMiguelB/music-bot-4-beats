const { getVoiceConnection } = require("@discordjs/voice");
const { SlashCommandBuilder, ChannelType } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("leave-vc")
    .setDescription("leaves current vc"),
  async execute(interaction, player) {
    const connection = getVoiceConnection(interaction.guild.id);

    //bot needs to be connected to a voice channel
    if (connection) {
      
      player.stop();

      connection.destroy();

      await interaction.reply(
        `${interaction.client.user.username} has left the vc`
      );
    } else {
      await interaction.reply(
        connection ? "bot is not in that channel" : "bot is not in a channel"
      );
    }
  },
};
