let { config } = require(global.path + '/src/configuration/config');
import fetch from 'node-fetch';

module.exports = {
  data: {
    name: 'trash',
    description: 'Why do someone look like trash, without your glasses on?',
    options: [
      {
        required: false,
        type: 6,
        name: 'user',
        description: 'Who should become trash?'
      }
    ]
  },
  async execute(client, interaction) {
    let choice = interaction.options.getUser('user');
    if (!choice) choice = interaction.user;

    const url = `${config.apiUrl}/private/manipulation/trash?key=${
      config.apiKey
    }&image=${choice.displayAvatarURL({ dynamic: true, format: 'png' })}`;
    const data = await fetch(url);
    const buffer = await data.buffer();

    return await interaction.reply({
      files: [{ name: 'trash.png', attachment: buffer }]
    });
  }
};
