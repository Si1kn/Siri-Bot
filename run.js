const Discord = require('discord.js')
const bot = new Discord.Client();
const botconfig = require('./botconfig.json')

bot.on("ready", async () => {
    console.log('logged in')
})

bot.on('message', async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    let prefix_ = "Siri?"
    let messageArray = message.content.split(' ')
    let cmd = messageArray[0]
    let args = messageArray.slice(1)

    if (cmd === prefix_) {
        const filter = m => m.author.id === message.author.id

        message.reply('Yes?').then(r => r.delete(10000))
        message.channel.awaitMessages(filter, { max: 2, time: 20000 }).then(collected => {
            console.log(collected.first().content)

            if (collected.first().content === "time") {
                timedate = new Discord.RichEmbed()
                    .setDescription('Time And Date!')
                    .setColor('RANDOM')
                    .addField('Time: ', message.createdAt, true)

                message.channel.send(timedate)
            }
            else if (collected.first().content === "commands") {
                const embed_ = new Discord.RichEmbed()
                    .setColor('Random')
                    .setDescription('Commands')
                    .addField('time', 'usage; Siri? wait till yes ; then say commands.')

                message.channel.send(embed_)

            }
        })
    }
})

bot.login(botconfig.token);