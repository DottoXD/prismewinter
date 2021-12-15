let { config } = require(global.path + '/src/configuration/config');
import fetch from 'node-fetch';

module.exports = {
  data: {
    name: 'rainbow',
    description: "Someone's profile picture gets rainbowed!",
    options: [
      {
        required: false,
        type: 6,
        name: 'user',
        description: 'Who should get rainbowed?'
      }
    ]
  },
  async execute(client, interaction) {
    let choice = interaction.options.getUser('user');
    if (!choice) choice = interaction.user;

    const url = `${config.apiUrl}/private/manipulation/rainbow?key=${
      config.apiKey
    }&image=${choice.displayAvatarURL({ dynamic: true, format: 'png' })}`;
    const data = await fetch(url);
    const buffer = await data.buffer();

    return await interaction.reply({
      files: [{ name: 'rainbow.png', attachment: buffer }]
    });
  }
};
