let { config } = require(global.path + '/src/configuration/config');
import Discord, { GuildMember } from 'discord.js';

module.exports = {
  data: {
    name: 'kcik',
    description: 'Kicks someone...bonk!',
    options: [
      {
        required: true,
        type: 6,
        name: 'user',
        description: 'Who should get kicked?'
      },
      {
        required: false,
        type: 3,
        name: 'reason',
        description: 'Why is the user going to be kicked?'
      }
    ]
  },
  async execute(client, interaction) {
    let choice = interaction.options.getUser('user');
    let reason = interaction.options.getString('reason');
    if (!reason) reason = 'No reason provided.';
    if (
      interaction.member.permissions.has('KICK_MEMBERS') ||
      !interaction.guild.me.permissions.has('KICK_MEMBERS')
    ) {
      try {
        const kickEmbed = new Discord.MessageEmbed()
          .setTitle(
            config.botName +
              ' | ' +
              this.data.name.charAt(0).toUpperCase() +
              this.data.name.slice(1).toLowerCase()
          )
          .setColor(config.mainColorCode)
          .setDescription('<@' + choice.id + '> has been kicked for ' + reason);

        await interaction.guild.members.cache
          .get(choice.id)
          .kick({ reason: reason });
        interaction.reply({ embeds: [kickEmbed] });
      } catch (err) {
        interaction.reply('There was an error while trying to kick this user!');
      }
    } else {
      interaction.reply('Missing permissions!');
    }
  }
};
