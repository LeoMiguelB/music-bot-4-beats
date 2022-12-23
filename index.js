const fs = require("node:fs");

const path = require("node:path");

const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");

const { token } = require("./config.json");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
  ],
});

client.commands = new Collection();

const {
  createAudioPlayer,
  NoSubscriberBehavior,
  getVoiceConnection,
  AudioPlayerStatus,
  createAudioResource,
} = require("@discordjs/voice");

//event listener for bot-music

//store audio here
let audioToPlay = {
  playlist: [],
  currentSong: 0,
};

//get all the mp3's available
const audioFiles = fs
  .readdirSync("./type-beats")
  .filter((file) => file.endsWith(".mp3"));

//store each audio in the array with path
for (const audio of audioFiles) {
  const aPath = path.join(__dirname, `/type-beats/${audio}`);
  audioToPlay.playlist.push(aPath);
}

//audio player
const player = createAudioPlayer({
  behaviors: {
    noSubscriber: NoSubscriberBehavior.Pause,
  },
});

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  // Set a new item in the Collection with the key as the command name and the value as the exported module
  if ("data" in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
    );
  }
}

const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) =>
      event.execute(...args, player, audioToPlay)
    );
  }
}

//event listener for when audio is done playing
player.on(AudioPlayerStatus.Idle, (e) => {
  console.log(e);

  audioToPlay.currentSong++;

  const current = audioToPlay.currentSong;

  if (current == audioToPlay.playlist.length - 1) {
    audioToPlay.currentSong = 0;
  }

  const songPath = audioToPlay.playlist[current];

  const resource = createAudioResource(songPath);

  player.play(resource);
});

player.on(AudioPlayerStatus.Playing, () => {
  console.log("playing audio!");
});

client.login(token);
