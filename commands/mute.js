module.exports.run = async(client, message, args) => {
  const permissions = require('./permissions.json')
  if(!message.member.roles.some(r => permissions.chefmodoplus.includes(r.id))) return message.channel.send(client.config.messages.noperm)

  const Discord = require('discord.js')
  let toMute = message.mentions.members.first(); 
  let muteReason = args.slice(1).join(' ');
  if(!muteReason) return message.channel.send(client.config.messages.noRaison)
  
  if(!toMute) {
    try {
      if (!message.guild.members.get(args.slice(0, 1).join(' '))) throw new Error(' ');
      toMute = message.guild.members.get(args.slice(0, 1).join(' '));
      toMute = user.user;
    } catch(error) {
      message.channel.send(client.config.messages.noTagged)
    }
  }

  if(toMute === message.author) return message.channel.send(client.config.messages.noSelfUse)

  let muteRole = message.guild.roles.find(r => r.name === 'Muted')
  if(!muteRole) {
    try {
      muteRole = await message.guild.createRole({
        name: 'Muted',
        color: '#000000',
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muteRole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    } catch(error) {
      console.log(error)
    }
  }
  await toMute.addRole(muteRole.id);
  try {
    toMute.send(`Vous avez été mute pour **${muteReason}**`)
  } catch(error) {
    message.channel.send('L\'utilisateur a bloquer ses mp, je ne peux donc pas lui dire qu\'il a été mute.')
  }
  let channelEmbed = new Discord.RichEmbed()
    .setTitle(`L'utilisateur ${toMute.username} à été mute`)
    .addField('Date:', message.createdAt)
    .addField('Modérateur:', message.author.username)
    .addField('Utilisateur Mute:', toMute.username)
    .addField('Raison:', muteReason)
    .setThumbnail(toMute.avatarURL)
    .setTimestamp(new Date())
    .setColor('#cc1212')
  const m = await message.channel.send(channelEmbed)
  m.delete(10000)
}