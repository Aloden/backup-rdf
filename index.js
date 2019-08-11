const Discord = require('discord.js');
const Enmap = require('enmap');
const fs = require('fs');

const client = new Discord.Client();
const config = require('./config.json');

client.config = config;

client.xp = new Enmap({name: 'xp'})
client.giveaway = new Enmap({name: 'giveaway'})
client.giveawayData = new Enmap({name: 'giveawayData'})

fs.readdir('./level/', (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith('.js')) return;
    const level = require(`./level/${file}`);
    let levelName = file.split('.')[0];
    console.log(`En train de charger l'événement pour les level` + file)
    client.on(levelName, level.bind(null, client));
  });
});

fs.readdir('./events/', (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith('.js')) return;
    const event = require(`./events/${file}`);
    let eventName = file.split('.')[0];
    console.log(`En train de charger l'événement ` + file)
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Enmap();

fs.readdir('./commands/', (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith('.js')) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split('.')[0];
    console.log(`En train de charger la commande ${commandName}`);
    client.commands.set(commandName, props);
  });
});

client.login(config.token);