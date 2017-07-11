// Warn Module
  // warn command
  if (msg.content.startsWith(prefix+"warn ")||msg.content===prefix+"warn") {
    const args = msg.content.split(' ').slice(1);
    const mentioned = msg.mentions.users.first();
    if (msg.member.hasPermission('KICK_MEMBERS')){
      if (msg.mentions.users.size != 0) {
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {
          if (args.slice(1).length != 0) {
            const date = new Date().toUTCString();
            if (warns[msg.guild.id] === undefined)
              warns[msg.guild.id] = {};
            if (warns[msg.guild.id][mentioned.id] === undefined)
              warns[msg.guild.id][mentioned.id] = {};
            const warnumber = Object.keys(warns[msg.guild.id][mentioned.id]).length;
            if (warns[msg.guild.id][mentioned.id][warnumber] === undefined){
              warns[msg.guild.id][mentioned.id]["1"] = {"reason": args.slice(1).join(' '), time: date, user: msg.author.id};
            } else {
              warns[msg.guild.id][mentioned.id][warnumber+1] = {"reason": args.slice(1).join(' '),
                time: date,
                user: msg.author.id};
            }
            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
            msg.channel.send(`Successfully warned ${mentioned.tag} for '${args.slice(1).join(' ')}'!`);
            const warn = new Discord.RichEmbed()
             .setColor(0xFF0000)
             .setTimestamp()
             .addField(`Warn | ${msg.guild.name}`, 'Action Recorded')
             .addField(`Moderator: `, `${msg.author.username}`)
             .addField(`User: `, `${mentioned.tag}`)
             .addField(`Reason: `, `${args.slice(1).join(' ')}`)
             return msg.guild.channels.find("name", "logs").sendEmbed(embed);
          } else {
            msg.channel.send("Correct Usage: //warn <user> <reason>");
          }
        } else {
          msg.channel.send("Correct Usage: //warn <user> <reason>");
        }
      } else {
        msg.channel.send("Correct Usage: //warn <user> <reason>");
      }
    } else {
      msg.channel.send("Error: You do not have the permission (\'KICK_MEMBERS\') to give warnings.");
    }
  }

  // warnings command
  if (msg.content.startsWith(prefix+"warnings ")||msg.content===prefix+"warnings") {
    const mentioned = msg.mentions.users.first();
    const args = msg.content.split(' ').slice(1);
    if (msg.member.hasPermission('KICK_MEMBERS')){
      if (msg.mentions.users.size !== 0) {
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {
          try {
            if (warns[msg.guild.id][mentioned.id] === undefined||Object.keys(warns[msg.guild.id][mentioned.id]).length === 0) {
              msg.channel.send(mentioned.tag+" has no warnings.");
              return;
            }
          } catch (err) {
            msg.channel.send(mentioned.tag+" has no warnings.");
            return;
          }
          let arr = [];
          arr.push(`**${mentioned.tag} has `+Object.keys(warns[msg.guild.id][mentioned.id]).length+" warnings.**");
          for (var warn in warns[msg.guild.id][mentioned.id]) {
            arr.push(`**${warn}:** "`+warns[msg.guild.id][mentioned.id][warn].reason+
            "\" - "+msg.guild.members.find("id", warns[msg.guild.id][mentioned.id][warn].user).user.tag+" - "+warns[msg.guild.id][mentioned.id][warn].time);
          }
          msg.channel.send(arr.join('\n'));
        } else {
          msg.channel.send("Correct Usage: //warnings <user>");
          console.log(args);
        }
      } else {
        msg.channel.send("Correct Usage: //warnings <user>");
      }
    } else {
      msg.channel.send("Error: You do not have the permission (\'KICK_MEMBERS\') to check warnings.");
    }
  }

  // clearwarn command
  if (msg.content.startsWith(prefix+"clearwarn ")||msg.content===prefix+"clearwarn") {
    const mentioned = msg.mentions.users.first();
    const args = msg.content.split(' ').slice(1);
    const arg2 = Number(args[1]);
    if (msg.member.hasPermission('KICK_MEMBERS')){
      if (msg.mentions.users.size != 0) {
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">"){
          if (!isNaN(arg2)) {
            if (warns[msg.guild.id][mentioned.id] === undefined) {
              msg.channel.send(mentioned.tag+" doesn't have any warnings.");
              return;
            } if (warns[msg.guild.id][mentioned.id][arg2] === undefined) {
              msg.channel.send("Warning doesn't exist.");
              return;
            }
            delete warns[msg.guild.id][mentioned.id][arg2];
            var i = 1;
            Object.keys(warns[msg.guild.id][mentioned.id]).forEach(function(key){
              var val=warns[msg.guild.id][mentioned.id][key];
              delete warns[msg.guild.id][mentioned.id][key];
              key = i;
              warns[msg.guild.id][mentioned.id][key]=val;
              i++;
            });
            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
            if (Object.keys(warns[msg.guild.id][mentioned.id]).length === 0) {
              delete warns[msg.guild.id][mentioned.id];
            }
            msg.channel.send(`Successfully removed ${mentioned.tag}\'s warning ${args[1]}!`);
            return;
          } if (args[1] === "all") {
            delete warns[msg.guild.id][mentioned.id];
            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
            msg.channel.send(`Successfully cleared ${mentioned.tag}\'s warnings!`);
            return;
          } else {
            msg.channel.send("Correct Usage: //clearwarn <user> <number|all>");
          }
        } else {
          msg.channel.send("Correct Usage: //clearwarn <user> <number|all>");
        }
      } else {
        msg.channel.send("Correct Usage: //clearwarn <user> <number|all>");
      }
    } else {
      msg.channel.send("Error: You do not have the permission (\'KICK_MEMBERS\') to remove warnings.");
    }
  }
