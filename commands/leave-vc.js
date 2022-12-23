const { getVoiceConnection } = require("@discordjs/voice");
const { SlashCommandBuilder, ChannelType } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("leave-vc")
    .setDescription("leaves current vc"),
  async execute(interaction, audioToPlay) {
    const connection = getVoiceConnection(interaction.guild.id);

    //bot needs to be connected to a voice channel
    if (connection) {
      //get connection
      connection.destroy();
      interaction.reply(`${interaction.client.user.username} has left the vc`);
    } else {
      interaction.reply(
        connection ? "bot is not in that channel" : "bot is not in a channel"
      );
    }
  },
};
