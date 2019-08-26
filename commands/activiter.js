module.exports.run = async(client, message, args) => {
  const permissions = require('./permissions.json')
  if(!message.member.roles.some(r => permissions.moderation.includes(r.id))) return message.channel.send(`Vous n'avez pas la permission d'effectuer cette commande.`)
  let game = args.slice(1).join(' ')
  let type = args[0]
  if(!type) return message.channel.send('Vous devez précises un type. \n \`\`\`WATCHING = Regarde \nPLAYING = Joue à\`\`\`')
  if(!type === 'WATCHING' || !type === 'PLAYING') return message.channel.send('Vous devez précises un type. \n \`\`\`WATCHING = Regarde \nPLAYING = Joue à\`\`\`')
  if(!game) return message.channel.send('Vous devez précisez une phrase.')
  client.user.setActivity(game, { type: type})
    .then(presence => {
      message.channel.send('Presence mise a jour.')
      message.delete()
    })
    .catch(console.error)
}