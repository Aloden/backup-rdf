module.exports = async(client, messageReaction, user) => {
  const Discord = require('discord.js')
  const Enmap = require('enmap')
  const message = messageReaction.message
  if(message.channel.id === client.channelsFile.giveaway) {
    console.log('poop')
    if(user.bot) return;
    var key = message.embeds[0].footer.text 
    if(!messageReaction.emoji.name === '🎉') return messageReaction.remove(user.id)
    if(key.startsWith('P') || key.startsWith('J')) return messageReaction.remove(user.id)
    client.giveaway.ensure(key, [])
    const amount = client.giveaway.get(key).length + 1
    client.giveaway.push(key, user.id)
  }
}