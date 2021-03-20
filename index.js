// TODO: 
// play local audio file ----  bye bye bye 
// getting afk channel (look at roles and permissions within channels)
// command after they are asked if they said goodbye 

const Discord = require('discord.js')
const client = new Discord.Client();
const prefix = '!';
const path = require('path');
const botCommandsFile = new Discord.MessageAttachment(path.join(__dirname,"./ConfigFiles/ByeByeBotCommands.html"));

client.once('ready', () => {
  console.log('ByeByeBot Is Now Online');
  client.user.setPresence({ activity: { name: '!TellByeBye' }, status: 'available' })
  .then(console.log)
  .catch(console.error);
});

client.on('message',async message =>{

    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    switch (command){
        case 'tellbyebye':
          message.channel.send("The Bot commands can be found in the following attachment:");
          message.channel.send(botCommandsFile);
          break; 

        case 'hello': 
          message.channel.send("You mean goodbye, right?");
          break;

        case 'fuckyou':
          message.guild.member(message.author).voice.setChannel(null, "");
          message.channel.send("<@"+message.author.id +">"+ " No FUCK YOU!!!!!");
          break;
        
        case 'thebyebyebot':
          message.channel.send("Don't Think It! Don't Say It!");
          break;
        
        case 'byebyebye':
          const connection = await message.member.voice.channel.join();
          connection.channel;
          message.channel.send("You may hate me but it ain't no lie Baby bye bye bye");
          break;
    }

      
});

    client.on('voiceStateUpdate', (oldMember,newMember) => { 
      if(newMember.channel)
        {
          // User Joins a voice channel 
          //console.log(newMember + " has joined a voice channel")
          return;
        } 
        else if(oldMember.channel && newMember.member.user.id !== '822563903220351016'){
          // User leaves a voice channel
          //console.log(oldMember +" has left the voice channel"); 
         //TO DO: is there a way to get this to NOT display if a user leaves and AFK channel??????
          client.channels.cache.get('157705411422715905').send("<@"+newMember.member.user.id +">"+ ' Did you say bye to everyone?!');  
        }
});


client.login('DiscordToken');