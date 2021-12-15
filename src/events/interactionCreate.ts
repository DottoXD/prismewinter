const { client } = require(global.path + '/prismewinter');

module.exports = {
  name: 'interactionCreate',
  async execute(interaction, Discord) {
    if (interaction.isCommand) {
      if (!client.commands.has(interaction.commandName)) return;
      await client.commands
        .get(interaction.commandName)
        .execute(client, interaction);
    }
  }
};
