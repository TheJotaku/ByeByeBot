// TODO: 
// get users in a voice channel so message does not display if there is only one person in the voice channel 
//Bye bye bot gets called in AFK server - like if bot does not have permissions to speak handle this case. 
// fix admin still getting messages in AFK channels. 
const Discord = require('discord.js')
const client = new Discord.Client();
const prefix = '!!';
const byeByeByeTrack = "./Audio/ByeByeBye.mp3";
const path = require('path');
const byeByeBotPng = new Discord.MessageAttachment(path.join(__dirname,"./Pictures/byebye.png"));

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
         const botInfo = new Discord.MessageEmbed()
         .setDescription('The Bot commands can be found [here.](https://thejotaku.github.io/ByeByeBot/)')
         message.channel.send(botInfo);
          break; 

        case 'hey': 
          message.channel.send("You mean bye, right?");
          break;

        case 'goaway':
          message.guild.member(message.author).voice.setChannel(null, "");
          message.channel.send(messageUserID + " No YOU GO AWAY!!!!!");
          break;
        
        case 'thebyebyebot':
          message.channel.send(messageUserID+ " Don't Think It! Don't Say It!", {files: [byeByeBotPng]});
          break;
        
        case 'byebyebye':
          if(!message.member.voice.channel){ message.channel.send(messageUserID +" You must be in a voice channel to use this command.");}
          else{
          const connection = await message.member.voice.channel.join();
          connection.play(byeByeByeTrack);
          message.channel.send(messageUserID +" You may hate me but it ain't no lie Baby bye bye bye");
        }
          break;
        
        case 'kick':
          if (!message.member.voice.channel){message.channel.send(messageUserID +" ByeByeBye cannot be kicked.");}
          else {await message.member.voice.channel.leave();}
          break; 

        case 'hello':
          message.channel.send(messageUserID +" I don't know why you say hello, I say goodbye!");
          break; 

         case 'creator':
          const byeGitRepo = new Discord.MessageEmbed()
          .setDescription('I was created by MrJotaku! If you would like to download my source code you can fine it [here.](https://github.com/TheJotaku/ByeByeBot)')
          message.channel.send(byeGitRepo);
          break;
        
        case 'addbot':
        const addBotUrl = new Discord.MessageEmbed()
        .setDescription('If you would like to add this bot to another server, you may do so by going to this [link.](https://discord.com/oauth2/authorize?client_id=822563903220351016&scope=bot&permissions=8)')
        message.channel.send(addBotUrl);
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
         // User leaves a voice channel AND if it is not our bot with its id.
        else if(oldMember.channel && newMember.member.user.id !== '822563903220351016'){
         // ignores AFK Channels 
          const speakPermission = oldMember.channel.permissionsFor(oldMember.member);
          const canSpeak = speakPermission.has(Discord.Permissions.FLAGS.SPEAK);
          if (canSpeak === true){ // if the user is an admit in their channel as of now they still get a message sent. 
          //console.log(oldMember +" has left the voice channel"); 
          client.channels.cache.get('157705411422715905').send(voiceUserID+ ' Did you say bye to everyone?!');  

         }
           
         
        }
});


client.login('DiscordToken');