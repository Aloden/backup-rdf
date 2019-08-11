function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? '0' + hours : hours;
  minutes = (minutes < 10) ? '0' + minutes : minutes;
  seconds = (seconds < 10) ? '0' + seconds : seconds;

  return hours + 'h' + minutes + 'm' + seconds + 's';
}

module.exports.run = async(client, message, args) => {
  const permissions = require('./permissions.json')
  const ms = require('ms')
  const Discord = require('discord.js')
  const key = message.author.id
  if(!message.member.roles.some(r => permissions.animation.includes(r.id))) return;
  message.delete()
  const temp = ms(args[0])
  const recompense = args.slice(1).join(' ')
  if(!temp || !recompense) return message.channel.send('Vous avez oublier un des arguments')
  const giveawayChannel = message.guild.channels.find(c => c.id === client.channelsFile.giveaway)
  const firstM = await message.channel.send(`J'ai commencer un giveaway dans **${giveawayChannel}**, pour une duré de** ${msToTime(temp)}**, avec pour récompense: **${recompense}**, et organiser par **${message.author.toString()}**`)
  firstM.delete(10000)
  client.giveawayData.ensure(key, {
    temp: temp,
    recompense: recompense,
    actual: 'yes'
  })
  client.giveaway.ensure(key, [])
  client.giveawayData.set(key, temp, 'temp')
  client.giveawayData.set(key, recompense, 'recompense')
  client.giveawayData.set(key, 'yes', 'actual')
  const giveawayFirstEmbed = new Discord.RichEmbed()
    .setTitle('Un nouveau Giveaway a commencer!')
    .addField('Temp restant:', msToTime(temp))
    .addField('Objet a gagner', recompense)
    .addField('Pour participer, il vous suffit de réagir avec 🎉', 'Si vous avez une question, créer un salon de support.')
    .setThumbnail(client.user.avatarURL)
    .setFooter(key)
    .setColor('#cc0099')
  const giveawayChannelMsg = await giveawayChannel.send(giveawayFirstEmbed)
  giveawayChannelMsg.react('🎉')
  async function intervalFunc() {
    let oldTime = client.giveawayData.get(key, 'temp')
    let newTime = oldTime - 10000
    client.giveawayData.set(key, newTime, 'temp')
    let newEmbed = new Discord.RichEmbed()
      .setTitle('Un nouveau Giveaway a commencer!')
      .addField('Temp restant:', msToTime(newTime))
      .addField('Objet a gagner', recompense)
      .addField('Pour participer, il vous suffit de réagir avec 🎉', 'Si vous avez une question, créer un salon de support.')
      .setThumbnail(client.user.avatarURL)
      .setFooter(key)
      .setColor('#cc0099')
    giveawayChannelMsg.edit(newEmbed)
    if(newTime < 1) {
      clearInterval(this)
      const amount = client.giveaway.get(key).length
      function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
      }
      var winnerNumber = randomIntFromInterval(1, amount) - 1
      if(amount === 0) {
        let finishedEmbed = new Discord.RichEmbed()
          .setTitle('Ce giveaway est terminer!')
          .addField('Objet Gagner:', recompense)
          .addField('Gagnant', 'Personne n\'a participer aux giveaway 🤔😑😑😑')
          .setThumbnail(client.user.avatarURL)
          .setFooter('Je vais garder le prix pour une prochaine fois...')
          .setColor('#cc0099')
        giveawayChannelMsg.edit(finishedEmbed)
        giveawayChannelMsg.clearReactions()
        client.giveawayData.delete(key)
        client.giveaway.delete(key)
      } else {
        console.log(winnerNumber)
        var participation = client.giveaway.get(key)
        console.log(participation)
        var winnerID = participation[winnerNumber] 
        var winner = message.guild.fetchMember(winnerID)
        var userWinner = await client.fetchUser(winnerID)
        let finishedEmbed = new Discord.RichEmbed()
          .setTitle('Ce giveaway est terminer!')
          .addField('Objet Gagner:', recompense)
          .addField('Gagnant', userWinner.tag)
          .setThumbnail(client.user.avatarURL)
          .setFooter('Pour récupérez votre prix, créer un salon de Support!')
          .setColor('#cc0099')
        giveawayChannelMsg.edit(finishedEmbed)
        giveawayChannel.send(`**${userWinner.toString()}**, tu a gagner: **${recompense}**`)
        giveawayChannelMsg.clearReactions()
        client.giveawayData.delete(key)
        client.giveaway.delete(key)
      }
    }
  }
  setInterval(intervalFunc, 10000)
}