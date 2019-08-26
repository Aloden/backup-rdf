module.exports.run = async(client, message, args) => {
  const Discord = require('discord.js')
  message.delete()
  const permissions = require('./permissions.json')
  let toKick = message.mentions.users.first()
  if(!message.member.roles.some(r => permissions.moderation.includes(r.id))) return message.channel.send('Vous n\'avez pas la permission d\'executer cette commande.')
  if(!toKick) return message.channel.send('Vous devez mentionner un utilisateur.')
  let raison = args.slice(1).join(' ')
  if(!raison) return message.channel.send('Vous devez spécifiez une raison')
  const key = toKick.id
  const kicked = await message.guild.fetchMember(toKick.id)
  if(kicked.highestRole.comparePositionTo(message.member.highestRole) > 0) return message.channel.send('Vous ne pouvez pas exécutez cette action sur cette Utilisateur.')
  client.sanctions.ensure(message.guild.id, {
    caseNum: 1,
  })
  client.sanctions.inc(message.guild.id, 'caseNum')
  client.sanctions.set(client.sanctions.autonum, {
    user: toKick.id, 
    guild: message.guild.id,
    type: 'Kick',
    moderator: message.author.id,
    reason: raison,
    caseNum: client.sanctions.get(message.guild.id, 'caseNum')
  })
  let kickedEmbed = new Discord.RichEmbed()
    .setAuthor(toKick.tag, toKick.avatarURL)
    .setTitle('L\'utilisateur a bien été kick.')
    .setFooter('Il pouras cependant re-rejoindre le serveur.')
  const m = await message.channel.send(kickedEmbed)
  m.delete(5000)
  const sanctionsEmbed = new Discord.RichEmbed()
    .setAuthor(`Modérateur: ${message.author.tag}`, message.author.avatarURL)
    .setDescription(`
**Membre**: ${toKick.tag} (${toKick.id})
**Action**: Kick
**Raison**: ${raison}
`)
    .setFooter(`Case #${client.sanctions.get(message.guild.id, 'caseNum')} | ${message.createdTimestamp}`)
    .setColor('#d96a02')
  const sanctionsChannel = message.guild.channels.find(c => c.id === '586583489382449162').send(sanctionsEmbed)
  kicked.kick(raison)
}