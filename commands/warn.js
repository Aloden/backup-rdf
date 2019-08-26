module.exports.run = async(client, message, args) => {
  const Discord = require('discord.js')
  const permissions = require('./permissions.json')
  if(!message.member.roles.some(r => permissions.moderation.includes(r.id))) return message.channel.send('Vous n\'avez pas la permission d\'executer cette commande.')
  client.sanctions.ensure(message.guild.id, {
    caseNum: 1
  })
  message.delete()
  let tagged = message.mentions.users.first()
  if(!tagged) return message.channel.send('Vous devez précisez un utilisateur')
  let raison = args.slice(1).join(' ')
  if(!raison) return message.channel.send('Vous devez précisez une raison')
  const key = tagged.id
  client.sanctions.ensure(key, {
      mutes: [],
      warns: [],
      bans: [],
      kicks: []
  })   
  const d = new Date()
  const sanctionsEmbed = new Discord.RichEmbed()
    .setAuthor(`Modérateur: ${message.author.tag}`, message.author.avatarURL)
    .setDescription(`
**Membre**: ${tagged.tag} (${tagged.id})
**Action**: Warn
**Raison**: ${raison}
`)
    .setFooter(`Case #${client.sanctions.get(message.guild.id, 'caseNum')} | ${message.createdTimestamp}`)
    .setColor('#aaff00')
  const sanctionsChannel = message.guild.channels.find(c => c.id === '586583489382449162').send(sanctionsEmbed)
  
  client.sanctions.ensure(message.guild.id, {
    caseNum: 1,
  })
  client.sanctions.set(client.sanctions.autonum, {
    user: tagged.id, 
    guild: message.guild.id,
    type: 'Warn',
    moderator: message.author.id,
    reason: raison,
    caseNum: client.sanctions.get(message.guild.id, 'caseNum')
  })
  client.sanctions.inc(message.guild.id, 'caseNum')
  let warnedEmbed = new Discord.RichEmbed()
    .setTitle('L\'utilisateur ' + tagged.tag + ' a été avertie')
    .addField('Raison', raison)
    .setFooter(`Case #${client.sanctions.get(message.guild.id, 'caseNum')}`)
  const cM = await message.channel.send(warnedEmbed)
  cM.delete(5000)
}