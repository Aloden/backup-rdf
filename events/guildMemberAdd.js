module.exports = async(client, member, args) => {
  let newRole = member.guild.roles.find(r => r.name === '👥 Membres')
  member.addRole(newRole)
  const Discord = require('discord.js') 
  const userObject = await client.fetchUser(member.id)
  const embed = new Discord.RichEmbed()
    .setAuthor(`${userObject.tag} a rejoint le serveur!`, userObject.avatarURL)
    .setDescription(`Bienvenue a lui sur le serveur **RDF - Paladium**!`)
    .setColor('#00eb37')
    .setThumbnail(userObject.avatarURL)
  member.guild.channels.find(c => c.id === '586508768645349376').send(embed)
}