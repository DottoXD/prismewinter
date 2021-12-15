let { config } = require(global.path + '/src/configuration/config');
import fetch from 'node-fetch';

module.exports = {
  data: {
    name: 'slap',
    description: 'Slaps someone! Ouch...',
    options: [
      {
        required: true,
        type: 6,
        name: 'user',
        description: 'Who should get slapped?'
      }
    ]
  },
  async execute(client, interaction) {
    let choice = interaction.options.getUser('user');

    const url = `${config.apiUrl}/private/manipulation/slap?key=${
      config.apiKey
    }&image=${interaction.user.displayAvatarURL({
      dynamic: true,
      format: 'png'
    })}&image2=${choice.displayAvatarURL({ dynamic: true, format: 'png' })}`;
    const data = await fetch(url);
    const buffer = await data.buffer();

    return await interaction.reply({
      files: [{ name: 'slap.png', attachment: buffer }]
    });
  }
};
