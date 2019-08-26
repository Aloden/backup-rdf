module.exports = async(client, messageReaction, user) => {
  console.log('test')
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
  } else if(message.channel.id === '586511794403541012') {
    console.log('test')
    const smember = await message.guild.fetchMember(user.id)
    if(messageReaction.emoji.id === '588421902952038401') {
//Discord
      console.log('test#2')
      let roleToAdd = message.guild.roles.find(r => r.name === '🔔 Notif-Discord')
      smember.addRole(roleToAdd)
      let privEmbed = new Discord.RichEmbed()
        .setAuthor('Role 🔔 Notif-Discord ajouter avec succès.', user.avatarURL)
        .setTitle('Pour t\'enlever le role, simplement enlève la Réaction')
        .setFooter('Si tu rencontre n\'importe quel problème, contacte les Administrateurs.')
      user.send(privEmbed)
    } else if(messageReaction.emoji.id === '588421698089386034') {
      let roleToAdd = message.guild.roles.find(r => r.name === '🔔 Notif-Paladium')
      smember.addRole(roleToAdd)
      let privEmbed = new Discord.RichEmbed()
        .setAuthor('Role 🔔 Notif-Paladium ajouter avec succès.', user.avatarURL)
        .setTitle('Pour t\'enlever le role, simplement enlève la Réaction')
        .setFooter('Si tu rencontre n\'importe quel problème, contacte les Administrateurs.')
      user.send(privEmbed)
    } else if(messageReaction.emoji.name === '🎱') {
      let roleToAdd = message.guild.roles.find(r => r.name === '🔔 Notif-Bingo')
      smember.addRole(roleToAdd)
      let privEmbed = new Discord.RichEmbed()
        .setAuthor('Role 🔔 Notif-Bingo ajouter avec succès.', user.avatarURL)
        .setTitle('Pour t\'enlever le role, simplement enlève la Réaction')
        .setFooter('Si tu rencontre n\'importe quel problème, contacte les Administrateurs.')
      user.send(privEmbed)
    } else if(messageReaction.emoji.name === '🎉') {
      let roleToAdd = message.guild.roles.find(r => r.name === '🔔 Notif-Évents')
      smember.addRole(roleToAdd)
      let privEmbed = new Discord.RichEmbed()
        .setAuthor('Role 🔔 Notif-Évents ajouter avec succès.', user.avatarURL)
        .setTitle('Pour t\'enlever le role, simplement enlève la Réaction')
        .setFooter('Si tu rencontre n\'importe quel problème, contacte les Administrateurs.')
      user.send(privEmbed)
    } else if(messageReaction.emoji.name === '📊') {
      let roleToAdd = message.guild.roles.find(r => r.name === '🔔 Notif-Sondage')
      smember.addRole(roleToAdd)
      let privEmbed = new Discord.RichEmbed()
        .setAuthor('Role 🔔 Notif-Sondage ajouter avec succès.', user.avatarURL)
        .setTitle('Pour t\'enlever le role, simplement enlève la Réaction')
        .setFooter('Si tu rencontre n\'importe quel problème, contacte les Administrateurs.')
      user.send(privEmbed)
    } 
  }
}