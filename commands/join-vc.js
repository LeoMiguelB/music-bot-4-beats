const { SlashCommandBuilder, ChannelType } = require("discord.js");

const { joinVoiceChannel } = require("@discordjs/voice");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("join-vc")
    .setDescription("makes bot join vc")
    .addChannelOption((object) =>
      object
        .setName("channel")
        .setDescription("the channel to join")
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildVoice)
    ),

  async execute(interaction) {
    const voiceChannel = await interaction.options.getChannel("channel");

    //must be at least one in the voice channel and client must not already be in the voice channel
    //NOTE: Need voice states intent
    if (
      voiceChannel.members.size === 0 ||
      voiceChannel.members.find(
        (client) => client.id === interaction.client.user.id
      )
    ) {
      await interaction.reply(
        voiceChannel.members.size === 0
          ? "there must be people in the voice channel"
          : "the bot is already in the voice channel"
      );
      return;
    }

    joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: interaction.guildId,
      adapterCreator: interaction.guild.voiceAdapterCreator,
    });

    await interaction.reply("joined!");
  },
};
