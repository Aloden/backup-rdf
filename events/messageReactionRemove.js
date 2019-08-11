module.exports = async(client, messageReaction, user) => {
  const message = messageReaction.message
  if(message.channel.id === '604941451251679234') {
    if(user.bot) return;
    var key = message.embeds[0].footer.text
    if(!messageReaction.emoji.name === '🎉') return;
    if(key.startsWith('P') || key.startsWith('J')) return;
    client.giveaway.remove(key, user.id)
  }
}