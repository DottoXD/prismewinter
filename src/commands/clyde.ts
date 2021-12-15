let { config } = require(global.path + '/src/configuration/config');
import fetch from 'node-fetch';

module.exports = {
  data: {
    name: 'clyde',
    description: 'Clyde says something!',
    options: [
      {
        required: true,
        type: 3,
        name: 'text',
        description: 'What should clyde say?'
      }
    ]
  },
  async execute(client, interaction) {
    let choice = interaction.options.getString('text');

    const url = `${config.apiUrl}/private/manipulation/clyde?key=${config.apiKey}&text=${choice}`;

    const data = await fetch(url);
    const buffer = await data.buffer();

    return await interaction.reply({
      files: [{ name: 'clyde.png', attachment: buffer }]
    });
  }
};
