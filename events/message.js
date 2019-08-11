module.exports = async(client, message) => {
    const Discord = require('discord.js')
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if(message.channel.id !== '610164032065896478') return console.log('Quelqun a essaye d\'utiliser le bot.')
    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;
    if (message.content.indexOf(client.config.prefix) !== 0) return;
    
    const cmd = client.commands.get(command);
  
    if (!cmd) return;
  
    cmd.run(client, message, args);
};