// TODO: 
// getting afk channel (look at roles and permissions within channels)
// get users in a voice channel so message does not display if there is only one person in the voice channel 
// HOST Static webpage

const Discord = require('discord.js')

const client = new Discord.Client();
const prefix = '!!';
const byeByeByeTrack = "./Audio/ByeByeBye.mp3";
const path = require('path');
const byeByeBot = new Discord.MessageAttachment(path.join(__dirname,"./Pictures/byebye.png"));
//const botCommandsFile = new Discord.MessageAttachment(path.join(__dirname,"./ConfigFiles/ByeByeBotCommands.html"));

client.once('ready', () => {
  console.log('ByeByeBot Is Now Online');
  client.user.setPresence({ activity: { name: '!!TellByeBye' }, status: 'available' })
  .then(console.log)
  .catch(console.error);
});

client.on('message',async message =>{

    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    const messageUserID = "<@"+message.author.id +">"; 
  
    switch (command){
        case 'tellbyebye':
         //message.channel.send("The Bot commands can be found in the following attachment:");
         // message.channel.send(botCommandsFile);
         const botInfo = new Discord.MessageEmbed()
         .setDescription('[The Bot commands can be found here.](http://bbbc.jtwp.org/)')
         message.channel.send(botInfo);
          break; 

        case 'hey': 
          message.channel.send("You mean bye, right?");
          break;

        case 'fuckyou':
          message.guild.member(message.author).voice.setChannel(null, "");
          message.channel.send(messageUserID + " No FUCK YOU!!!!!");
          break;
        
        case 'thebyebyebot':
          message.channel.send(messageUserID+ " Don't Think It! Don't Say It!", {files: [byeByeBot]});
          break;
        
        case 'byebyebye':
          const connection = await message.member.voice.channel.join();
          connection.play(byeByeByeTrack);
          message.channel.send(messageUserID +" You may hate me but it ain't no lie Baby bye bye bye");
          var isConnected = true; 
          break;
        
        case 'kick':
          if (isConnected === true){
            await message.member.voice.channel.leave();
          }
          else {
            message.channel.send(messageUserID +" ByeByeBye cannot be kicked.");
          };
          break; 

        case 'hello':
          message.channel.send(messageUserID +" I don't know why you say hello, I say goodbye!");
          break; 
    }

});

    client.on('voiceStateUpdate', (oldMember,newMember) => { 
      const voiceUserID = "<@"+newMember.member.user.id +">";

      if(newMember.channel)
        {
          
          // User Joins a voice channel 
          //console.log(newMember + " has joined a voice channel")
         
          return;
        } 
        else if(oldMember.channel && newMember.member.user.id !== '822563903220351016'){
         
          // User leaves a voice channel AND if it is not our bot with its id. 
          //console.log(oldMember +" has left the voice channel"); 
          client.channels.cache.get('157705411422715905').send(voiceUserID+ ' Did you say bye to everyone?!');  
         
        }
});


client.login('DiscordToken');