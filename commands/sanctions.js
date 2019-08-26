module.exports.run = async(client, message, args) => {
  const permissions = require('./permissions.json')
  const Discord = require('discord.js')
  if(!message.member.roles.some(r => permissions.moderation.includes(r.id))) return message.channel.send('Vous n\'avez pas la permission d\'executer cette commande.')
  let tagged = message.mentions.users.first()
  let taggedMember = message.mentions.members.first()
  if(!tagged) return message.channel.send('Vous devez précisez un Utilisateur.')
  let embed = new Discord.RichEmbed()
    .setAuthor('Utilisateur: ' + tagged.username, tagged.avatarURL)
    .setTitle('Voici la liste des sanctions de ' + tagged.tag)
    .setDescription(' ')
  client.sanctions.filter(f => f.user === tagged.id).forEach(async (i) => {
    embed.description += (`\n\`Case #${i.caseNum}\` - **${i.type}** - ${i.reason}`)
  })
  await message.channel.send(embed)
}