module.exports.run = async(client, message, args) => {
  const permissions = require('./permissions.json')
  const Discord = require('discord.js')
  if(!message.member.roles.some(r => permissions.moderation.includes(r.id))) return message.channel.send('Vous n\'avez pas la permission d\'executez cette commande')

  let nb = parseInt(args[0])
  if(nb < 2) return message.channel.send('Vous devez donner une quantité de messages supérieur à 1')
  if(!nb) return message.channel.send('Vous devez donner une quantité de messages a supprimer.')
  let toDelete = nb + 1
  await message.channel.bulkDelete(toDelete)
  const embed = new Discord.RichEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setTitle(`J'ai supprimer **${nb}** messages!`)
    .setFooter(`Date: ${new Date().toDateString()}`)
  const m = await message.channel.send(embed)
  m.delete(5000)
  
}