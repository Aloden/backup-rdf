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
  message.delete()
  const permissions = require('./permissions.json')
  const ms = require('ms')
  if(!message.member.roles.some(r => permissions.moderation.includes(r.id))) return message.channel.send(`Vous n'avez pas la permission d'effectuer cette commande.`)
 


  const Discord = require('discord.js')
  let toMute = message.mentions.members.first(); 
  let muteTime = ms(args[1])
  console.log(muteTime)
  let muteReason;
  if(!muteTime) {
    muteReason = args.slice(1).join(' ')
  } else {
    muteReason = args.slice(2).join(' ')
  }
  if(!muteReason) return message.channel.send('Vous n\'avez pas précisez de raison')
  
  if(!toMute) {
    try {
      const potentialMember = await message.guild.fetchMember(args[0])
      if(!potentialMembee) throw new Error(' ')
      toMute = potentialMember
    } catch(error) {
      message.channel.send('Vous devez précisez un utilisateur.')
    }
  }
  if(toMute.highestRole.comparePositionTo(message.member.highestRole) > 0) return message.channel.send('Vous ne pouvez pas exécutez cette action sur cette Utilisateur.')
  if(toMute.id === message.author.id) return message.channel.send('Vous ne pouvez pas vous mtue vous même...')

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
  if(toMute.roles.find(r => r.name === 'Muted')) return message.channel.send('Cette utilisateur est déjà mute, attendez que son mute expire.')
  await toMute.addRole(muteRole.id);
  try {
    toMute.send(`Vous avez été mute pour **${muteReason}**`)
  } catch(error) {
    message.channel.send('L\'utilisateur a bloquer ses mp, je ne peux donc pas lui dire qu\'il a été mute.')
  }
  const toMuteUserObject = await client.fetchUser(toMute.id)
  const key = toMuteUserObject.id
  if(muteTime) {
    client.sanctions.ensure(message.guild.id, {
      caseNum: 1,
    })
    client.sanctions.set(client.sanctions.autonum, {
      user: toMute.id, 
      guild: message.guild.id,
      type: 'Mute',
      moderator: message.author.id,
      reason: muteReason,
      temp: muteTime,
      caseNum: client.sanctions.get(message.guild.id, 'caseNum')
    })
    client.sanctions.inc(message.guild.id, 'caseNum')
    let mutedChannelEmbed = new Discord.RichEmbed()
      .setAuthor(toMuteUserObject.username, toMuteUserObject.avatarURL)
      .setTitle('L\'utilisateur a bien été mute')
   //   .addField('Duré', msToTime(muteTime))
  //    .addField('Utilisateur', toMuteUserObject.username)
      .setFooter('Pour l\'unmute, utiliser la commande !unmute')
      .setThumbnail(message.author.avatarURL)
    const sentM2 = await message.channel.send(mutedChannelEmbed)
    const sanctionsEmbed = new Discord.RichEmbed()
      .setAuthor(`Modérateur: ${message.author.tag}`, message.author.avatarURL)
      .setDescription(`
**Membre**: ${toMuteUserObject.tag} (${toMuteUserObject.id})
**Action**: Mute
**Raison**: ${muteReason}
`)
      .setFooter(`Case #${client.sanctions.get(message.guild.id, 'caseNum')} | ${message.createdTimestamp}`)
      .setColor('#e38c00')
    const sanctionsChannel = message.guild.channels.find(c => c.id === '586583489382449162').send(sanctionsEmbed)
    sentM2.delete(10000)
    setTimeout(async function() {
      if(!toMute.roles.find(r => r.name === 'Muted')) return;
      await toMute.removeRole(muteRole.id)
      let unmutedEmbed = new Discord.RichEmbed()
         .setAuthor(`Modérateur: ${client.user.tag}`, client.user.avatarURL)
         .setDescription(`
**Membre**: ${toMuteUserObject.tag} (${toMuteUserObject.id})
**Action**: Un-Mute
**Raison**: Unmute Automatique
`)
      .setFooter(`Case #${client.sanctions.get(message.guild.id, 'caseNum')} | ${message.createdTimestamp}`)
      .setColor('#66ff66')
    const sanctionsChanne3l = message.guild.channels.find(c => c.id === '586583489382449162').send(unmutedEmbed)
    }, muteTime)
  } else {
    client.sanctions.ensure(message.guild.id, {
      caseNum: 1,
    })
    client.sanctions.set(client.sanctions.autonum, {
      user: toMute.id, 
      guild: message.guild.id,
      type: 'Mute',
      moderator: message.author.id,
      reason: muteReason,
      temp: muteTime,
      caseNum: client.sanctions.get(message.guild.id, 'caseNum')
    })
    client.sanctions.inc(message.guild.id, 'caseNum')
    const sanctionsEmbed = new Discord.RichEmbed()
      .setAuthor(`Modérateur: ${message.author.tag}`, message.author.avatarURL)
      .setDescription(`
**Membre**: ${toMuteUserObject.tag} (${toMuteUserObject.id})
**Action**: Mute
**Raison**: ${muteReason}
`)
      .setFooter(`Case #${client.sanctions.get(message.guild.id, 'caseNum')} | ${message.createdTimestamp}`)
      .setColor('#e38c00')
    const sanctionsChannel = message.guild.channels.find(c => c.id === '586583489382449162').send(sanctionsEmbed)
    let mutedChannelEmbed = new Discord.RichEmbed()
      .setAuthor(toMuteUserObject.username, toMuteUserObject.avatarURL)
      .setTitle('L\'utilisateur a bien été mute')
   //   .addField('Duré', msToTime(muteTime))
  //    .addField('Utilisateur', toMuteUserObject.username)
      .setFooter('Pour l\'unmute, utiliser la commande !unmute')
      .setThumbnail(message.author.avatarURL)
    const sentM2 = await message.channel.send(mutedChannelEmbed)
    sentM2.delete(10000)
  }
}