let { config } = require(global.path + '/src/configuration/config');
import Discord from 'discord.js';
import fetch from 'node-fetch';
import moment from 'moment';

module.exports = {
  data: {
    name: 'gihub',
    description: 'Searches a user or an organization on GitHub!',
    options: [
      {
        required: true,
        type: 3,
        name: 'query',
        description: 'Who do you want to search on GitHub?'
      }
    ]
  },
  async execute(client, interaction) {
    let choice = interaction.options.getString('query');

    const notFoundEmbed = new Discord.MessageEmbed()
      .setTitle(
        config.botName +
          ' | ' +
          this.data.name.charAt(0).toUpperCase() +
          this.data.name.slice(1).toLowerCase()
      )
      .setColor(config.mainColorCode)
      .addField(
        '> ❄️ I encountered an error!',
        'No user or organization with this name was found!'
      );

    let response = await fetch(`https://api.github.com/users/${choice}`);
    let data = await response.json();

    let createdTimestamp = moment(data.created_at).format('X');
    let updatedTimestamp = moment(data.updated_at).format('X');

    let thumbnail = data.avatar_url;
    if (!thumbnail)
      thumbnail = 'https://cdn.discordapp.com/embed/avatars/0.png';

    if (data.message === 'Not Found')
      return interaction.reply({ embeds: [notFoundEmbed] });

    const searchButtons = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setLabel('Check on GitHub')
        .setStyle('LINK')
        .setURL('https://github.com/' + choice)
    );

    const githubEmbed = new Discord.MessageEmbed()
      .setTitle(
        config.botName +
          ' | ' +
          this.data.name.charAt(0).toUpperCase() +
          this.data.name.slice(1).toLowerCase()
      )
      .setColor(config.mainColorCode)
      .setURL('https://github.com/' + choice)
      .setThumbnail(thumbnail)
      .addField('> 🏂 User:', 'Name: **' + data.login + '**')
      .addField(
        '> 🌲 Description:',
        data.bio ? data.bio : '**No description!**'
      )
      .addField(
        '> 🌬️ Repositories:',
        'Public: **' + data.public_repos.toString() + '**'
      )
      .addField(
        '> 🧣 Followers:',
        'Total: **' + data.followers.toString() + '**'
      )
      .addField(
        '> 🎿 Following:',
        'Total: **' + data.following.toString() + '**'
      )
      .addField(
        '> ⛄ Created On:',
        `<t:${createdTimestamp}> (<t:${createdTimestamp}:R>)`
      )
      .addField(
        '> ❄️ Last update On:',
        `<t:${updatedTimestamp}> (<t:${updatedTimestamp}:R>)`
      );

    return await interaction.reply({
      embeds: [githubEmbed],
      components: [searchButtons]
    });
  }
};
