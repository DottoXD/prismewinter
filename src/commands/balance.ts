let { config } = require(global.path + '/src/configuration/config');
let Schema = require(global.path + '/src/schemas/economy-schema');
const Discord = require('discord.js');

module.exports = {
  data: {
    name: 'balance',
    description: 'Gives you your current snowball and snowflakes balance!'
  },
  async execute(client, interaction) {
    let choice = interaction.options.getString('user');
    if (!choice) choice = interaction.user;

    Schema.findOne({ id: choice.id }, async (err, data) => {
      if (!data) {
        new Schema({
          id: choice.id,
          snowballs: 0,
          snowflakes: 0,
          snowmans: 0
        }).save();

        const balanceEmbed = new Discord.MessageEmbed()
          .setTitle(
            config.botName +
              ' | ' +
              this.data.name.charAt(0).toUpperCase() +
              this.data.name.slice(1).toLowerCase()
          )
          .setColor(config.mainColorCode)
          .addField('> 🌨️ Snowballs', '0', true)
          .addField('> ❄️ Snowflakes', '0', true)
          .addField('> ⛄ Snowmans', '0', true);

        await interaction.reply({ embeds: [balanceEmbed] });
      }

      if (data) {
        let fixedSnowballs = await data.snowballs;
        let fixedSnowflakes = await data.snowflakes;
        let fixedSnowmans = await data.snowmans;

        const balanceEmbed = new Discord.MessageEmbed()
          .setTitle(
            config.botName +
              ' | ' +
              this.data.name.charAt(0).toUpperCase() +
              this.data.name.slice(1).toLowerCase()
          )
          .setColor(config.mainColorCode)
          .addField(
            '> 🌨️ Snowballs',
            choice.username + "'s snowballs: **" + fixedSnowballs.toString(),
            true
          )
          .addField(
            '> ❄️ Snowflakes',
            choice.username + "'s snowflakes: **" + fixedSnowflakes.toString(),
            true
          )
          .addField(
            '> ⛄ Snowmans',
            choice.username + "'s snowmans: **" + fixedSnowmans.toString(),
            true
          );

        await interaction.reply({ embeds: [balanceEmbed] });
      }
    });
  }
};
