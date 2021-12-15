let { config } = require(global.path + '/src/configuration/config');
let { PrismeWinter } = require(global.path + '/src/modules/prismeWinterCore');

import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import chalk from 'chalk';
import fs from 'fs';

module.exports = {
  name: 'ready',
  once: true,
  async execute(client) {
    if (config.updateInteractions === true) {
      const rest = new REST({ version: '9' }).setToken(config.botToken);

      let commands = [];
      const commandFiles = fs
        .readdirSync(global.path + '/src/commands')
        .filter((file) => file.endsWith('.js') || file.endsWith('.ts'));
      for (const file of commandFiles) {
        const command = require(`${global.path}/src/commands/${file}`);
        commands.push(command.data);
      }

      try {
        await rest.put(Routes.applicationCommands(config.clientId), {
          body: commands
        });
        console.log(
          chalk.bold.white('[COREBOT] ') +
            '┠ ' +
            chalk.bold.cyan('PrismeWinter just pushed ') +
            chalk.bold.white(commands.length) +
            chalk.bold.cyan(' slash commands to Discord!')
        );
      } catch (error) {
        console.log(error);
      }
    }
    client.user.setActivity(config.botStatus, { type: 'WATCHING' });
    console.log(
      chalk.bold.white('[COREBOT] ') +
        '┠ ' +
        chalk.bold.cyan('PrismeWinter ') +
        chalk.bold.white('is now ') +
        chalk.bold.cyan('online!')
    );
  }
};
