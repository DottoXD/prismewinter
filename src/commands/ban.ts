let { config } = require(global.path + '/src/configuration/config');
import Discord, { GuildMember } from 'discord.js';

module.exports = {
  data: {
    name: 'ban',
    description: 'Bans someone...bonk!',
    options: [
      {
        required: true,
        type: 6,
        name: 'user',
        description: 'Who should get banned?'
      },
      {
        required: false,
        type: 3,
        name: 'reason',
        description: 'Why is the user going to be banned?'
      }
    ]
  },
  async execute(client, interaction) {
    let choice = interaction.options.getUser('user');
    let reason = interaction.options.getString('reason');
    if (!reason) reason = 'No reason provided.';
    if (
      interaction.member.permissions.has('BAN_MEMBERS') ||
      !interaction.guild.me.permissions.has('BAN_MEMBERS')
    ) {
      try {
        const banEmbed = new Discord.MessageEmbed()
          .setTitle(
            config.botName +
              ' | ' +
              this.data.name.charAt(0).toUpperCase() +
              this.data.name.slice(1).toLowerCase()
          )
          .setColor(config.mainColorCode)
          .setDescription('<@' + choice.id + '> has been banned for ' + reason);

        await interaction.guild.members.cache
          .get(choice.id)
          .ban({ reason: reason });
        interaction.reply({ embeds: [banEmbed] });
      } catch (err) {
        interaction.reply('There was an error while trying to ban this user!');
      }
    } else {
      interaction.reply('Missing permissions!');
    }
  }
};
