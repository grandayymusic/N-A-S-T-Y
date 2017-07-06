var Settings = require("./settings.json");
var Discord = require("discord.js");
const ytdl = require('ytdl-core');
var youtube = require("./youtube");

// Youtube Search but it didnt play
// npm install youtube-search
var search = require('youtube-search');

// Testing js
var afk = require('afk.js');

var client = new Discord.Client();

var opts = {
  maxResults: 10,
  key: 'yourkey'
};

client.on('message', message => {
    
    // Need help on this lol
    // from afk.js
    
    CommandExecutor(message) → {*}
    
  // afk command is in the afk.js
  // afk checker
  if (msg.mentions.users.size > 0) { // checks if theres a mention
    if (afk[msg.mentions.users.first().id]) { // check if its in the database
      if (afk[msg.mentions.users.first().id].reason === true) { // check if theres no reason
    const embed = new Discord.RichEmbed()
    .setColor(0xFF390E)
    .setTimestamp()
    .addField(`**${msg.mentions.members.first().displayName}**`, `Is currently AFK`)
    .setFooter(`Requested by ${msg.author.username}`)
    return msg.channel.sendEmbed(embed);
      } else {
     const embed = new Discord.RichEmbed()
    .setColor(0xFF390E)
    .setTimestamp()
    .addField(`**${msg.mentions.members.first().displayName}**`, `Is currently AFK`)
    .addField(`With the reason: `, `**${afk[msg.mentions.users.first().id].reason}**`)
    .setFooter(`Requested by ${msg.author.username}`)
    return msg.channel.sendEmbed(embed);
      }
    }
  }
    
    // Need rework
    if(msg.content.startsWith(prefix + 'play')){
        var channel = message.content.split(' ').slice(2).join(' ');
        message.channel.send({ embed: createVidEmbed(youtube.search(channel)[0]) });
    }

    // Never test but it look like the real shit
    if(msg.content.startsWith(prefix + 'yt search')){
      search(args, opts, function(err, results) {
       if(err) return msg.reply("there is an error searching it. Error: " + err);
 
      const embed = new Discord.RichEmbed()
      .setColor(0xFF390E)
      .setTimestamp()
      .addField(`:youtube: Search`, results)
      .setFooter(`Requested by ${msg.author.username}`)
      return msg.channel.sendEmbed(embed);
    }
});

client.login(Settings.token);
