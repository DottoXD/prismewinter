let { config } = require(global.path + '/src/configuration/config');
import fetch from 'node-fetch';

module.exports = {
  data: {
    name: 'fuse',
    description: "Fuses your profile picture with someone's!",
    options: [
      {
        required: true,
        type: 6,
        name: 'user',
        description: 'Who do you want your profile picture to be fused with?'
      }
    ]
  },
  async execute(client, interaction) {
    let choice = interaction.options.getUser('user');
    if (!choice) choice = interaction.user;

    const url = `${config.apiUrl}/private/manipulation/fuse?key=${
      config.apiKey
    }&image=${interaction.user.displayAvatarURL({
      dynamic: true,
      format: 'png'
    })}&image2=${choice.displayAvatarURL({ dynamic: true, format: 'png' })}`;
    const data = await fetch(url);
    const buffer = await data.buffer();

    return await interaction.reply({
      files: [{ name: 'fuse.png', attachment: buffer }]
    });
  }
};
