module.exports.run = async(client, message) => {
  const Discord = require('discord.js')
  const Enmap = require('enmap')
  const key = `${message.guild.id}-${message.author.id}`;
  let taggedUser = message.guild.member(message.mentions.users.first())
  client.xp.ensure(key, {
    user: message.author.id,
    guild: message.guild.id,
    xp: 0,
    level: 0
  })
  if(!taggedUser) { 
    const level = parseInt(client.xp.get(key, 'level'))
    const xp = parseInt(client.xp.get(key, 'xp'))
    const nextLevel = level + 1
    const xpToNextLevel = (nextLevel * 10) * (nextLevel * 10)

    console.log(message.author.id + 'a regarder ses niveaux')
    let xpEmbed = new Discord.RichEmbed()
      .setTitle('Voici votre niveaux et votre xp actuel')
      .addField(`Vous avez actuellement`, `${client.xp.get(key, 'xp')} xp`)
      .addField(`Vous êtes actuellement niveau`, client.xp.get(key, 'level'))
      .addField(`Vous êtes a:`, `${xp}/${xpToNextLevel} xp du prochain niveau`)
      .setThumbnail(message.author.avatarURL)
      .setColor('#0099ff')
    message.channel.send(xpEmbed)
  } 
  if(taggedUser) {
    let taggedUserKey = `${message.guild.id}-${taggedUser.id}`
    const level = parseInt(client.xp.get(taggedUserKey, 'level'))
    const xp = parseInt(client.xp.get(taggedUserKey, 'xp'))
    const nextLevel = level + 1
    const xpToNextLevel = (nextLevel * 10) * (nextLevel * 10)
    client.xp.ensure(taggedUserKey, {
      user: message.author.id,
      guild: message.guild.id,
      xp: 0,
      level: 0
    })
    console.log(message.author + 'a regarder les niveaux de: ' + taggedUser.username)
    let xpOtherEmbed = new Discord.RichEmbed()
      .setTitle('Voici le niveau et l`xp de ' + taggedUser.username)
      .addField(`Il a actuellement`, `${client.xp.get(taggedUserKey, 'xp')} xp`)
      .addField(`Il est actuellement au niveau`, `${client.xp.get(taggedUserKey, 'level')}`)
      .addField(`Il est a `, `${xp}/${xpToNextLevel} xp du prochain niveau.`)
      .setThumbnail(taggedUser.avatarURL)
      .setColor('#0099ff')
    message.channel.send(xpOtherEmbed)
  }
}