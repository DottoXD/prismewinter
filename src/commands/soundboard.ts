let { config } = require(global.path + '/src/configuration/config');
import Discord from 'discord.js';
import { Manager } from 'lavacord';
import fetch from 'node-fetch';

module.exports = {
  data: {
    name: 'soundboard',
    description: 'Plays some chill audio from the soundboard!',
    options: [
      {
        required: true,
        type: 3,
        name: 'song',
        description: 'What song should be played from the soundboard?',
        choices: [
          {
            name: 'TheChainsmokers - DontLetMeDown',
            value: 'chainsmokersdontletmedown'
          },
          {
            name: 'MattSimons - CatchAndRelease',
            value: 'mattsimonscatchandrelease'
          },
          {
            name: 'LOFI - 90sFlav - CallMe',
            value: '90sflavcallme'
          },
          {
            name: 'LOFI - hisohkah - SchoolRooftop',
            value: 'hisohkahschoolrooftop'
          }
        ]
      }
    ]
  },
  async execute(client, interaction) {
    let choice = interaction.options.getString('song');
    if (choice === 'hisohkahschoolrooftop') {
      choice = 'Hisohkah - School Rooftop';
    }
    if (choice === '90sflavcallme') {
      choice = '90sFlave - call me';
    }
    if (choice === 'chainsmokersdontletmedown') {
      choice = 'The chain smokers - dont let me down';
    }
    if (choice === 'mattsimonscatchandrelease') {
      choice = 'Matt simons - catch and release';
    }

    async function getSongs(search) {
      const node = global.manager.idealNodes[0];

      return fetch(
        `http://${node.host}:${node.port}/loadtracks?identifier=${choice}`,
        { headers: { Authorization: node.password } }
      )
        .then((res) => res.json())
        .then((data) => data.tracks)
        .catch((err) => {
          console.error(err);
          return null;
        });
    }

    const errorEmbed = new Discord.MessageEmbed()
      .setTitle(
        config.botName +
          ' | ' +
          this.data.name.charAt(0).toUpperCase() +
          this.data.name.slice(1).toLowerCase()
      )
      .setColor(config.mainColorCode);

    const player = await global.manager.join({
      guild: interaction.guild.id,
      channel: interaction.guild.members.cache.get(interaction.member.user.id)
        .voice.channel,
      node: '1'
    });

    const soundboardEmbed = new Discord.MessageEmbed()
      .setTitle(
        config.botName +
          ' | ' +
          this.data.name.charAt(0).toUpperCase() +
          this.data.name.slice(1).toLowerCase()
      )
      //.setDescription('Now playing: ' + choice)
      .setDescription("I am sorry, but this command is not ready yet! Stay tuned for more info soon!")
      .setColor(config.mainColorCode);

    getSongs(choice).then((songs) => {
      console.log(songs);
    });

    await interaction.reply({ embeds: [soundboardEmbed] });
  }
};
