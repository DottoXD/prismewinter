let { config } = require(global.path + '/src/configuration/config');
import Discord from 'discord.js';

module.exports = {
  data: {
    name: 'ping',
    description: "Sends Prisme Winter's latency!",
    options: [
      {
        required: false,
        type: 3,
        name: 'component',
        description:
          'Do you want to see the API latency or the WebSocket latency?',
        choices: [
          { name: 'Api', value: 'api' },
          { name: 'WebSocket', value: 'websocket' }
        ]
      }
    ]
  },
  async execute(client, interaction) {
    let choice = interaction.options.getString('component');

    if (choice === 'api') {
      const pingEmbed = new Discord.MessageEmbed()
        .setTitle(
          config.botName +
            ' | ' +
            this.data.name.charAt(0).toUpperCase() +
            this.data.name.slice(1).toLowerCase()
        )
        .setColor(config.mainColorCode)
        .addField('> ❄️ API Latency', 'Ping: **' + client.ws.ping + 'ms**');

      return await interaction.reply({ embeds: [pingEmbed] });
    }

    if (choice === 'websocket') {
      const pingEmbed = new Discord.MessageEmbed()
        .setTitle(
          config.botName +
            ' | ' +
            this.data.name.charAt(0).toUpperCase() +
            this.data.name.slice(1).toLowerCase()
        )
        .setColor(config.mainColorCode)
        .addField(
          '> 🥶 WebSocket Latency',
          'Ping: **' + `${Date.now() - interaction.createdTimestamp}` + 'ms**'
        );

      return await interaction.reply({ embeds: [pingEmbed] });
    }

    if (!choice || choice !== 'api' || choice !== 'websocket') {
      const pingEmbed = new Discord.MessageEmbed()
        .setTitle(
          config.botName +
            ' | ' +
            this.data.name.charAt(0).toUpperCase() +
            this.data.name.slice(1).toLowerCase()
        )
        .setColor(config.mainColorCode)
        .addField('> ❄️ API Latency', 'Ping: **' + client.ws.ping + 'ms**')
        .addField(
          '> 🥶 WebSocket Latency',
          'Ping: **' + `${Date.now() - interaction.createdTimestamp}` + 'ms**'
        );

      return await interaction.reply({ embeds: [pingEmbed] });
    }
  }
};
