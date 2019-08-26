module.exports.run = async(client, message) => {
  client.emit('guildMemberAdd', message.member || await message.guild.fetchMember(message.author));
}