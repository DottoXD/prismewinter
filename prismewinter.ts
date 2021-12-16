import Discord, { Client, Collection, Intents, MessageEmbed } from "discord.js";
import { Configuration, config } from "./src/configuration/config";

global.path = __dirname;

function checkConfig(generalConfiguration: Configuration) {
  if (!generalConfiguration.botToken || !generalConfiguration.mongoUrl || !generalConfiguration.clientId || !generalConfiguration.botStatus || !generalConfiguration.mainGuild || !generalConfiguration.logsChannel || !generalConfiguration.mainColorCode || !generalConfiguration.botName) {
    throw new Error("You did not configure the bot correctly! Please double check the configuration file and then run the bot.");
  }
}

checkConfig(config);

export const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
});
//
import { PrismeWinter } from "./src/modules/prismeWinterCore";

PrismeWinter.loadCommands(client);
PrismeWinter.loadEvents(client);
PrismeWinter.loadContextMenus(client);
PrismeWinter.loadButtons(client);
PrismeWinter.loadMongoose(client);
PrismeWinter.loadErelaJS(client);

client.login(config.botToken);
