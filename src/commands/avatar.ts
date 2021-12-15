import fetch from 'node-fetch';

module.exports = {
  data: {
    name: 'avatar',
    description: "Gets someone's avatar",
    options: [
      {
        required: false,
        type: 6,
        name: 'user',
        description: 'Whose avatar should i get?'
      }
    ]
  },
  async execute(client, interaction) {
    let choice = interaction.options.getUser('user');
    if (!choice) choice = interaction.user;

    const url = `${choice.displayAvatarURL({ dynamic: true, format: 'png' })}`;
    const data = await fetch(url);
    const buffer = await data.buffer();

    return await interaction.reply({
      files: [{ name: 'avatar.png', attachment: buffer }]
    });
  }
};
