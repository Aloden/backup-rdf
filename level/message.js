module.exports = (client, message) => {
  if (message.author.bot) return;
  if(message.channel.type === 'dm') return;
  const Enmap = require('enmap')
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  if(message.content.startsWith(client.config.prefix)) return;
  if (message.guild) {
    const key = `${message.guild.id}-${message.author.id}`;
    client.xp.ensure(key, {
      user: message.author.id,
      guild: message.guild.id,
      xp: 0,
      level: 0
    });
    var randomXp = getRandomInt(0, 30)
    client.xp.math(key, '+', randomXp, 'xp')
    const curLevel = Math.floor(0.1 * Math.sqrt(client.xp.get(key, 'xp')));
    if (client.xp.get(key, 'level') < curLevel) {
      client.xp.set(key, curLevel, 'level');
      client.channels.find(c => c.id === client.channelsFile.salonbot).send(message.author + ' est passer au niveau: ' + curLevel + ' !')
    }
  }

}