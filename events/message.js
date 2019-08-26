module.exports = async(client, message) => {
    const Discord = require('discord.js')
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;
    const key = message.channel.id
    client.automodSpam.ensure(key, {
      active: 'false', 
      list: []
    })
    if(client.automodSpam.get(message.channel.id, 'active') === 'true' && client.automodSpam.get(message.channel.id).list.includes(message.author.id)) { 
      console.log('2')
      message.delete()
    } else {
      console.log('3')
      client.automodSpam.push(message.channel.id, message.author.id, 'list')
      setTimeout(function() {
        console.log('4')
        client.automodSpam.remove(message.channel.id, message.author.id, 'list')
      }, client.automodSpam.get(key, 'time'))
      if(command === 'rank' || command === 'leaderboard' || command === 'eval') {
        if (message.content.indexOf(client.config.prefix) !== 0) return;
    
        const cmd = client.commands.get(command);
    
        if (!cmd) return;
  
        cmd.run(client, message, args);
      } else if(message.channel.id === '610164032065896478' || message.channel.id === '592398323005128829' || message.channel.id === '612930868776009734') {
        if(message.author.bot) return;
        if(message.channel.type === 'dm') return;
        if (message.content.indexOf(client.config.prefix) !== 0) return;
    
        const cmd = client.commands.get(command);
    
        if (!cmd) return;
  
        cmd.run(client, message, args);
    } else return;
  }
};
