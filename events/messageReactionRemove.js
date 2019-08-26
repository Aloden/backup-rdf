module.exports = async(client, messageReaction, user) => {
  const Discord = require('discord.js')
  const message = messageReaction.message
  if(message.channel.id === '604941451251679234') {
    if(user.bot) return;
    var key = message.embeds[0].footer.text
    if(!messageReaction.emoji.name === '🎉') return;
    if(key.startsWith('P') || key.startsWith('J')) return;
    client.giveaway.remove(key, user.id)
  } else if(message.channel.id === '586511794403541012') {
    console.log('test')
    const smember = await message.guild.fetchMember(user.id)
    if(messageReaction.emoji.id === '588421902952038401') {
//Discord
      console.log('test#2')
      let roleToAdd = message.guild.roles.find(r => r.name === '🔔 Notif-Discord')
      smember.removeRole(roleToAdd)
      let privEmbed = new Discord.RichEmbed()
        .setAuthor('Role 🔔 Notif-Discord enlever avec succès.', user.avatarURL)
        .setTitle('Pour te remettre le role, il te suffit de remettre la Réaction')
        .setFooter('Si tu rencontre n\'importe quel problème, contacte les Administrateurs.')
      user.send(privEmbed)
    } else if(messageReaction.emoji.id === '588421698089386034') {
      let roleToAdd = message.guild.roles.find(r => r.name === '🔔 Notif-Paladium')
      smember.removeRole(roleToAdd)
      let privEmbed = new Discord.RichEmbed()
        .setAuthor('Role 🔔 Notif-Paladium enlever avec succès.', user.avatarURL)
        .setTitle('Pour te remettre le role, il suffit de remettre la Réaction')
        .setFooter('Si tu rencontre n\'importe quel problème, contacte les Administrateurs.')
      user.send(privEmbed)
    } else if(messageReaction.emoji.name === '🎱') {
      let roleToAdd = message.guild.roles.find(r => r.name === '🔔 Notif-Bingo')
      smember.removeRole(roleToAdd)
      let privEmbed = new Discord.RichEmbed()
        .setAuthor('Role 🔔 Notif-Bingo enlever avec succès.', user.avatarURL)
        .setTitle('Pour te remettre le role, il suffit de remettre la Réaction')
        .setFooter('Si tu rencontre n\'importe quel problème, contacte les Administrateurs.')
      user.send(privEmbed)
    } else if(messageReaction.emoji.name === '🎉') {
      let roleToAdd = message.guild.roles.find(r => r.name === '🔔 Notif-Évents')
      smember.removeRole(roleToAdd)
      let privEmbed = new Discord.RichEmbed()
        .setAuthor('Role 🔔 Notif-Évents enlever avec succès.', user.avatarURL)
        .setTitle('Pour te remettre le role, il suffit de remettre la Réaction')
        .setFooter('Si tu rencontre n\'importe quel problème, contacte les Administrateurs.')
      user.send(privEmbed)
    } else if(messageReaction.emoji.name === '📊') {
      let roleToAdd = message.guild.roles.find(r => r.name === '🔔 Notif-Sondage')
      smember.removeRole(roleToAdd)
      let privEmbed = new Discord.RichEmbed()
        .setAuthor('Role 🔔 Notif-Sondage enlever avec succès.', user.avatarURL)
        .setTitle('Pour te remettre le role, il suffit de remettre la Réaction')
        .setFooter('Si tu rencontre n\'importe quel problème, contacte les Administrateurs.')
      user.send(privEmbed)
    } 
  }
}