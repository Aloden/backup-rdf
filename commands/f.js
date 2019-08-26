module.exports.run = async(client, message, args) => {
  const Discord = require('discord.js')
  let commande = args[0]
  if(commande === 'create') {
    let fname = args[1].toLowerCase()
    if(!fname) return message.channel.send('Vous n\'avez pas précisez un nom pour votre Faction.')
    console.log(client.factions.filter(f => f.name === fname))
    if(client.factions.find(f => f.leader === message.author.id)) return message.channel.send('Vous êtes déjà membre d\'une Faction.')
    if(client.factions.has(fname)) return message.channel.send(`La Faction **${args[1]}** existe déjà, Si vous êtes le Leader de cette Faction In-Game, veuillez contactez un Administrateur.`)
    let m = await message.channel.send('\<a:Chargement_1:588753102614822922> Je suis en train de créer votre Faction.')
    setTimeout(function() {
      client.factions.set(fname, {
        name: args[1],
        fkey: fname,
        leader: message.author.id,
        members: [],
        allmembers: [],
        officiers: [],
        invitations: [],
        ally: [],
        requestedAlly: [],
        truce: [],
        requestedTruce: [],
        ennemy: [],
        desc: 'None'
      })
      client.factions.push(fname, message.author.id, 'allmembers')
      m.edit(`La faction: **${args[1]}**, avec comme Leader: **${message.author.toString()}** a été créer!`)
    }, 2000)
  } else if(commande === 'disband') {
    let userFaction = client.factions.find(f => f.leader === message.author.id)
    if(!userFaction) return message.channel.send('Vous n\'êtes pas le Leader d\'une Faction.')
    let m = await message.channel.send(`\<a:Chargement_1:588753102614822922> Je suis en train de supprimer la Faction **${userFaction.name}**.`)
    setTimeout(function() {
      m.edit(`J'ai bien supprimer la Faction **${userFaction.name}**`)
      client.factions.delete(userFaction.fkey)
    }, 2000)

  } else if(commande === 'invite') {
    let userFaction = client.factions.find(f => f.leader === message.author.id)
    if(!userFaction) return message.channel.send('Vous n\'etes pas le Leader d\'une faction.')
    let invited = message.mentions.users.first()
    if(!invited) return message.channel.send('Vous devez donner un Utilisateur a inviter.')
    if(client.factions.find(m => m.members.includes(invited.id))) return message.channel.send(`**${invited.tag}** est déjà membre d'une faction. Demandez lui de quitter sa Faction.`)
    if(userFaction.invitations.includes(invited.id)) return message.channel.send('k')
    client.factions.push(userFaction.fkey, invited.id, 'invitations')
    message.channel.send(`J\'ai bien ajouter **${invited.tag}** a la liste des personnes inviter a la **${userFaction.name}**.`)
    invited.send(`Tu as recus une invitation pour rejoindre la **${userFaction.name}**\n**Pour accepter cette invitation, fait la commande !f join ${userFaction.name}**`)
  } else if(commande === 'join') {
    let memberObject = await message.guild.fetchMember(message.author.id)
    let toJoinName = args[1].toLowerCase()
    if(!client.factions.find(f => f.fkey === toJoinName)) return message.channel.send(`Je n\'arrive pas a trouver de Faction nommer: **${args[1]}**`)
    const faction = client.factions.get(toJoinName)
    if(!client.factions.get(toJoinName).invitations.includes(message.author.id)) return message.channel.send(`Vous n'avez pas été inviter a rejoindre la **${faction.name}**.`)
    let m = await message.channel.send(`\<a:Chargement_1:588753102614822922> Je suis en train de t'ajouter a la liste des membres de la **${faction.name}**.`)
    setTimeout(function() {
      let nick = (`[${faction.name}] ${message.author.username}`)
      memberObject.setNickname(nick)
      client.factions.remove(toJoinName, message.author.id, 'invitations')
      client.factions.push(toJoinName, message.author.id, 'members')
      client.factions.push(toJoinName, message.author.id, 'allmembers')
      m.edit(`**${message.author.toString()}**, Vous avez bien rejoint la **${args[1]}**`)
    }, 2000)

  } else if(commande === 'f') {
    let otherFac = args[1]
    if(!otherFac) {
      let userFac = client.factions.find(m => m.allmembers.includes(message.author.id))
      let desc = userFac.desc 

      let memberarrayOfID = userFac.members
      let memberarrayOfTags = await Promise.all(memberarrayOfID.map(async (i) => {
        let toAddUser = await client.fetchUser(i)
        return toAddUser.tag
      }))
      if(memberarrayOfTags.length < 1) {
        memberarrayOfTags.push('Cette faction n\'a aucun membre avec le grade Membre.')
      }
      let officerarrayOfID = userFac.officiers
      let officerarrayOfTags = await Promise.all(officerarrayOfID.map(async (i) => {
        let toAddOfficer = await client.fetchUser(i)
        return toAddOfficer.tag
      }))
      if(officerarrayOfTags.length < 1) {
        officerarrayOfTags.push('Il n\'y a aucun membre avec le grade Officier.')
      }
      let leader = await client.fetchUser(userFac.leader)
      let toSendEmbed = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setTitle(`Faction: **${userFac.name}**`)
        .addField('Leader:', leader.tag)
        .addField('Liste des membres:', memberarrayOfTags.join(', '))
        .addField('Liste des Officiers:', officerarrayOfTags.join(', '))
      if(desc !== 'None') {
        toSendEmbed.setFooter(desc)
      }
      message.channel.send(toSendEmbed)
    } else {
      let userFac = client.factions.find(f => f.fkey === args[1].toLowerCase())
      if(!userFac) return message.channel.send(`Je n\'arrive pas a trouver de Faction nommer: **${args[1]}**`)
      let memberarrayOfID = userFac.members
      let desc = userFac.desc 
      let memberarrayOfTags = await Promise.all(memberarrayOfID.map(async (i) => {
        let toAddUser = await client.fetchUser(i)
        return toAddUser.tag
      }))
      if(memberarrayOfTags.length < 1) {
        memberarrayOfTags.push('Cette faction n\'a aucun membre avec le grade Membre.')
      }
      let officerarrayOfID = userFac.officiers
      let officerarrayOfTags = await Promise.all(officerarrayOfID.map(async (i) => {
        let toAddOfficer = await client.fetchUser(i)
        return toAddOfficer.tag
      }))
      if(officerarrayOfTags.length < 1) {
        officerarrayOfTags.push('Il n\'y a aucun membre avec le grade Officier.')
      }
      let leader = await client.fetchUser(userFac.leader)
      let toSendEmbed = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setTitle(`Faction: **${userFac.name}**`)
        .addField('Leader:', leader.tag)
        .addField('Liste des membres:', memberarrayOfTags.join(', '))
        .addField('Liste des Officiers:', officerarrayOfTags.join(', '))
      if(desc !== 'None') {
        toSendEmbed.setFooter(desc)
      }
      message.channel.send(toSendEmbed)
    }
  } else if(commande === 'nick') {
    let guildMember = await message.guild.fetchMember(message.author.id)
    let userFaction = client.factions.find(m => m.allmembers.includes(message.author.id))
    if(!userFaction) return message.channel.send('Vous n\'êtes membre d\'aucune Faction.')
    let nick = (`[${userFaction.name}] ${message.author.username}`)
    guildMember.setNickname(nick)
  } else if(commande === 'leave') {
    let userFac = client.factions.find(m => m.allmembers.includes(message.author.id))
    if(!userFac) return message.channel.send('Vous n\'êtes membre d\'aucune Faction')
    if(message.author.id === userFac.leader) return message.channel.send('Commes vous êtes le Leader de la Faction, vous ne pouvez pas quitter celle-ci. Utilisez plutôt: **!f disband**')
    client.factions.remove(userFac.fkey, message.author.id, 'members')
    message.channel.send(`**${message.author.toString()}**, Vous avez bien quitter la **${userFac.name}**!`)
  } else if(commande === 'chat') {
    if(!client.factions.find(f => f.leader === message.author.id)) return message.channel.send('Vous n\'etes pas le Leader de votre Faction/Vous n\'avez pas de Faction.')
    if(!args[1]) return message.channel.send('Vous devez précisez un Leader de Faction/Une Faction.')
    let fac = client.factions.find(f => f.fkey === args[1].toLowerCase())
    if(!fac) {
      try {
        let potentialLeader = message.mentions.users.first()
        if(!client.factions.find(l => l.leader === potentialLeader.id)) throw new Error(' ')
        fac = client.factions.find(l => l.leader === potentialLeader.id)
      } catch (error) {
        message.channel.send('Je n\'ai pas réussi a trouver de Factions avec les paramètres que vous m\'avez donner.')
      }
    }
    let category = message.guild.channels.find(c => c.name === '💬 | Chat de Faction' && c.type === 'category')
    let fac1 = client.factions.find(m => m.allmembers.includes(message.author.id))
    message.guild.createChannel(`chat-${fac.name}-${fac1.name}`, {
      parent: category.id
    }).then(async (c) => {
      let fac1Leader = await message.guild.fetchMember(fac.leader)
      let fac2Leader = await message.guild.fetchMember(fac1.leader)
      let everyone = message.guild.roles.find(r => r.name === '@everyone')
      c.overwritePermissions(fac1Leader, {
        READ_MESSAGES: true, 
        SEND_MESSAGES: true
      })
      c.overwritePermissions(fac2Leader, {
        READ_MESSAGES: true, 
        SEND_MESSAGES: true
      })
      c.overwritePermissions(everyone, {
        READ_MESSAGES: false,
        SEND_MESSAGES: false
      })
    })
  } else if(commande === 'promote') {
    let fac = client.factions.find(m => m.officiers.includes(message.author.id)) || client.factions.find(f => f.leader === message.author.id)
    if(!fac) return message.channel.send('Vous n\'avez pas de Faction/Vous n\'etes pas un Leader ou un Officier de votre faction.')
    let toPromote = message.mentions.members.first()
    let toPromoteUser = message.mentions.users.first()
    if(fac.officiers.includes(toPromoteUser.id)) return message.channel.send('Cette utilisateur est déjà un Officier de votre Faction.')
    if(!fac.allmembers.includes(toPromoteUser.id)) return message.channel.send('Cette Utilisateur ne fait pas partie de votre Faction.')
    if(fac.leader === toPromoteUser.id) return message.channel.send('Cette utilisateur est déjà le Leader de cette Faction.')
    if(!fac.allmembers.includes(message.author.id)) return message.channel.send('Veuillez contactez un Administrateur.')
    client.factions.push(fac.fkey, toPromoteUser.id, 'officiers')
    client.factions.remove(fac.fkey, toPromoteUser.id, 'members')
    message.channel.send(`L'utilisateur: **${toPromoteUser.toString()}** a bien été passer Officier de la Faction: **${fac.name}**!`)
  } else if(commande === 'desc' || commande === 'description') {
    let fac = client.factions.find(f => f.officiers.includes(message.author.id)) || client.factions.find(f => f.leader === message.author.id)
    if(!fac) return message.channel.send('Vous n\'êtes pas membre d\'une Faction/Vous n\'êtes pas Leader ou Officier de celle-ci.')
    let desc = args.slice(1).join(' ')
    if(!desc) return message.channel.send('Vous devez précisez une Description.')
    client.factions.set(fac.fkey, desc, 'desc')
    message.channel.send(`J\'ai bien mit la Description de votre Faction a: **${desc}**`)
  }
}