module.exports.run = async(client, message, args) => {
  const permissions = require('./permissions.json')
  const Discord = require('discord.js')
  if(!message.member.roles.some(r => permissions.moderation.includes(r.id))) return message.channel.send('Vous n\'avez pas la permission d\'executez cette commande')
  const ms = require('ms')

  const key = message.channel.id
  client.automodSpam.ensure(key, {
    active: 'false', 
    list: [],
    time: 0
  })
  if(args[0] === 'spam') {
    if(args[1] === 'enable') {
      if(args[2] && ms(args[2])) {
        message.channel.send('L\'automod anti-spam a bien été activer dans ce salon.')
        client.automodSpam.set(key, ms(args[2]), 'time')
        client.automodSpam.set(key, 'true', 'active')
      } else return message.channel.send('Vous devez précisez la durée entre chaque message')
    } else if(args[1] === 'disable') {
      message.channel.send(`L\'automod **Anti-Spam**, pour le salon ${message.channel.toString()} a été désactiver.`)
      client.automodSpam.delete(message.channel.id)
      client.automodSpam.ensure(key, {
        active: 'false', 
        list: [],
        time: 0
      })
    } else return message.channel.send('Vous devez précisez une action a effecuter.\n** !automod spam <enable | disable>**')
  }
}