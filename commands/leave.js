module.exports.run = async(client, message) => {
  client.emit('guildMemberRemove', message.member || await message.guild.fetchMember(message.author));
}