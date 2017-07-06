var Discord = require ('discord.js');
var client = new Discord.Client();

class nasty.afk {
  if (afk[msg.author.id]) {
    delete afk[msg.author.id];
    if (msg.member.nickname === null) {
      msg.channel.send("Welcome back, <@"+msg.author.id+">! I **tried** to remove your AFK."); // failed remove afk message
    } else {
      msg.member.setNickname(msg.member.nickname.replace(/(\[AFK\])/,''));
      msg.channel.send("Welcome back, <@"+msg.author.id+">! I removed your AFK."); // remove afk message
    }
    fs.writeFile("./afk.json", JSON.stringify(afk), (err) => {if (err) console.error(err);}); // save file
  } else {
    if (msg.content.startsWith(prefix + 'afk ')||msg.content === prefix + 'afk') {
      msg.member.setNickname("[AFK] " + msg.member.displayName);
      let args1 = msg.content.split(' ').slice(1);
      if (args1.length === 0) {
        afk[msg.author.id] = {"reason": true}; // if no reason
        msg.delete();
        msg.reply("You are now AFK!")
        .then(x => DeleteQueue.add(x, 10000));
      } else {
        afk[msg.author.id] = {"reason": args1.join(" ")}; // with reason
        msg.delete()
        msg.reply("I set your AFK reason to " + args1.join(" ") + ".")
        .then(x => DeleteQueue.add(x, 10000));
      }
      fs.writeFile("./afk.json", JSON.stringify(afk), (err) => {if (err) console.error(err);}); // save file
    }
  }
}
module.exports = new nasty.afk();
