module.exports.run = async(client, message, args) => {
  const Discord = require('discord.js')
  message.delete()
  if(!args[0]) {
    let embed = new Discord.RichEmbed()
    .setTitle('Voici votre photo de profil')
    .setImage(message.author.avatarURL)
    message.channel.send(embed)
  } else {
    let user = message.mentions.users.first()
    let embed = new Discord.RichEmbed()
    .setTitle(`Voici la photo de profil de ${user.tag}`)
    .setImage(user.avatarURL)
    message.channel.send(embed)
  }
}