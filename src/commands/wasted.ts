let { config } = require(global.path + '/src/configuration/config');
import fetch from 'node-fetch';

module.exports = {
  data: {
    name: 'wasted',
    description: 'Someone is now wasted',
    options: [
      {
        required: false,
        type: 6,
        name: 'user',
        description: 'Who should be wasted?'
      }
    ]
  },
  async execute(client, interaction) {
    let choice = interaction.options.getUser('user');
    if (!choice) choice = interaction.user;

    const url = `${config.apiUrl}/private/manipulation/wasted?key=${
      config.apiKey
    }&image=${choice.displayAvatarURL({ dynamic: true, format: 'png' })}`;
    const data = await fetch(url);
    const buffer = await data.buffer();

    return await interaction.reply({
      files: [{ name: 'wasted.png', attachment: buffer }]
    });
  }
};
