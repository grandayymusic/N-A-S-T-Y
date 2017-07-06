// Functions
  function setWelcome(message, args) {
      if (!msg.member.hasPermission("MANAGE_GUILD")) return;
      let guild = msg.guild;
      welcomes[guild.id] = args;
      msg.channel.send(`Welcome message set to ${args}`);
      console.log(welcomes);
      fs.writeFileSync('./messages.json', JSON.stringify(welcomes), 'utf-8');
  }
  function toggleWelcome(message) {
      if (!msg.member.hasPermission("MANAGE_GUILD")) return;
      welcomes[msg.guild.id] = undefined;
  }
  function sendWelcome(user) {
      if (welcomes[user.guild.id] === undefined) return;
      user.guild.defaultChannel.send(welcomes[user.guild.id].replace("{person}", user));
  }
