import fs from 'fs';
import Discord from 'discord.js';
import mongoose from 'mongoose';
import chalk from 'chalk';

let { config } = require(global.path + '/src/configuration/config');

let loadedEvents = [];
let loadedCommands = [];
let loadedMenus = [];
let loadedButtons = [];
let loadedContextMenus = [];

export class PrismeWinter {
  static loadCommands(client) {
    client.commands = new Discord.Collection();
    const commandFiles = fs
      .readdirSync(global.path + '/src/commands/')
      .filter((file) => file.endsWith('.js') || file.endsWith('.ts'));

    for (const file of commandFiles) {
      loadedCommands.push(1);
      const command = require(`${global.path}/src/commands/${file}`);
      client.commands.set(command.data.name, command);
    }
    console.log(
      chalk.bold.cyan('[HANDLER] ') +
        '┠ ' +
        chalk.bold.cyan('Loaded ') +
        chalk.bold.white(loadedCommands.length) +
        chalk.bold.cyan(' commands!')
    );
  }

  static loadContextMenus(client) {
    const contextMenuFiles = fs
      .readdirSync(global.path + '/src/contextmenus')
      .filter((file) => file.endsWith('.js') || file.endsWith('.ts'));

    for (const file of contextMenuFiles) {
      const contextMenu = require(`${global.path}/src/contextmenus/${file}`);
      loadedContextMenus.push(global.path + '/src/contextmenus/' + file);
    }
    console.log(
      chalk.bold.cyan('[HANDLER] ') +
        '┠ ' +
        chalk.bold.cyan('Loaded ') +
        chalk.bold.white(loadedContextMenus.length) +
        chalk.bold.cyan(' context menus!')
    );
  }

  static loadButtons(client) {
    const buttonFiles = fs
      .readdirSync(global.path + '/src/buttons')
      .filter((file) => file.endsWith('.js') || file.endsWith('.ts'));

    for (const file of buttonFiles) {
      const button = require(`${global.path}/src/buttons/${file}`);
      loadedButtons.push(global.path + '/src/buttons/' + file);
    }
    console.log(
      chalk.bold.cyan('[HANDLER] ') +
        '┠ ' +
        chalk.bold.cyan('Loaded ') +
        chalk.bold.white(loadedButtons.length) +
        chalk.bold.cyan(' buttons!')
    );
  }

  static loadEvents(client) {
    const eventFiles = fs
      .readdirSync(global.path + '/src/events')
      .filter((file) => file.endsWith('.js') || file.endsWith('.ts'));

    for (const file of eventFiles) {
      loadedEvents.push(1);
      const event = require(`${global.path}/src/events/${file}`);
      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
      } else {
        client.on(event.name, (...args) => event.execute(...args));
      }
    }
    console.log(
      chalk.bold.cyan('[HANDLER] ') +
        '┠ ' +
        chalk.bold.cyan('Loaded ') +
        chalk.bold.white(loadedEvents.length) +
        chalk.bold.cyan(' events!')
    );
  }

  static loadMongoose(client) {
    mongoose.connect(config.mongoUrl);
    console.log(
      chalk.bold.cyan('[HANDLER] ') +
        '┠ ' +
        chalk.bold.cyan('Connected to the ') +
        chalk.bold.white('MongoDB') +
        chalk.bold.cyan(' database!')
    );
  }

  static loadErrorHandler(client) {
    process.on('unhandledRejection', (error) => {
      console.log(chalk.bold.cyan('[ERROR00] ┠  ') + chalk.bold.white(error));
      console.log(chalk.bold.cyan('[ERROR01] ┠  ') + chalk.bold.white(error));
    });
    process.on('uncaughtException', (error) => {
      console.log(chalk.bold.cyan('[ERROR02] ┠  ') + chalk.bold.red(error));
      console.log(chalk.bold.cyan('[ERROR03] ┠  ') + chalk.bold.red(error));
    });
  }
}
