module.exports = async(client, member, args) => {
  const Discord = require('discord.js') 
  const userObject = await client.fetchUser(member.id)
  const embed = new Discord.RichEmbed()
    .setAuthor(`${userObject.tag} a quitter le serveur`, userObject.avatarURL)
    .setDescription(`Bonne continuation a lui et à bientôt!`)
    .setColor('#c90000')
    .setThumbnail(userObject.avatarURL)
  member.guild.channels.find(c => c.id === '586508768645349376').send(embed)
}