let { config } = require(global.path + '/src/configuration/config');
import Discord from 'discord.js';
import os from 'os';

module.exports = {
  data: { name: 'uptime', description: "Sends Prisme Winter's uptime!" },
  async execute(client, interaction) {
    function uptimeConverter(seconds) {
      seconds = Number(seconds);
      var d = Math.floor(seconds / (3600 * 24));
      var h = Math.floor((seconds % (3600 * 24)) / 3600);
      var m = Math.floor((seconds % 3600) / 60);
      var s = Math.floor(seconds % 60);

      var dDisplay = d > 0 ? d + (d == 1 ? ' day, ' : ' days, ') : '';
      var hDisplay = h > 0 ? h + (h == 1 ? ' hour, ' : ' hours, ') : '';
      var mDisplay = m > 0 ? m + (m == 1 ? ' minute, ' : ' minutes, ') : '';
      var sDisplay = s > 0 ? s + (s == 1 ? ' second' : ' seconds') : '';
      return dDisplay + hDisplay + mDisplay + sDisplay;
    }

    const pingEmbed = new Discord.MessageEmbed()
      .setTitle(
        config.botName +
          ' | ' +
          this.data.name.charAt(0).toUpperCase() +
          this.data.name.slice(1).toLowerCase()
      )
      .setColor(config.mainChillColorCode)
      .addField('> ✨ Bot Uptime', `${uptimeConverter(client.uptime / 1000)}`)
      .addField('> 🌙  System Uptime', `${uptimeConverter(os.uptime())}`);

    await interaction.reply({ embeds: [pingEmbed] });
  }
};
