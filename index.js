const { Client, Intents, MessageEmbed } = require('discord.js');
const config = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_MESSAGES] });

function activityLoop() {
    const selectedTitle = config.quotes.word1[Math.floor(Math.random() * config.quotes.word1.length)];
    const selectedWord2 = config.quotes.word2[Math.floor(Math.random() * config.quotes.word2.length)];
    const selectedWord3 = config.quotes.word3[Math.floor(Math.random() * config.quotes.word3.length)];

    client.user.setActivity(selectedTitle + ' '+ selectedWord2 + ' ' + selectedWord3 + ' | ;makequote', { type: 'PLAYING' });
    setTimeout(activityLoop, 120000);
}

client.once('ready', () => {
  activityLoop();
});

client.on('messageCreate', message => {
    if (message.author.id == config.userId) { return }

    if (message.content == ';makequote') {
        const selectedTitle = config.quotes.word1[Math.floor(Math.random() * config.quotes.word1.length)];
        const selectedWord2 = config.quotes.word2[Math.floor(Math.random() * config.quotes.word2.length)];
        const selectedWord3 = config.quotes.word3[Math.floor(Math.random() * config.quotes.word3.length)];

        const embed = {
            title: selectedTitle,
            description: selectedWord2 + ' ' + selectedWord3,

            timestamp: new Date(),
            footer: {
                text: 'Bot by Voxelstice#4527',
            },
        }

        message.channel.send({ embeds: [embed] });
    }
});

//client.login(process.env['token']); // This is for if you are using a service like repl.it
client.login(config.token);
