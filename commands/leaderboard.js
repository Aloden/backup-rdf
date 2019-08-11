module.exports.run = async(client, message, args) => {
  const Discord = require('discord.js')
  const filtered = client.xp.filter( p => p.guild === message.guild.id ).array();

  const sorted = filtered.sort((a, b) => b.xp - a.xp);

  const top10 = sorted.splice(0, 10);

  const embed = new Discord.RichEmbed()
    .setTitle('Leaderboard')
    .setDescription('Voici les 10 utilisateurs avec le plus d\'xp')
    .setColor('#0099ff');
  for(const data of top10) {
    await client.fetchUser(data.user)
    embed.addField(client.users.get(data.user).tag, `${data.xp} xp (level ${data.level})`);
  }
  return message.channel.send({embed});
}