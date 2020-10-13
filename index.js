const Discord = require("discord.js")
require("dotenv").config()
const client = new Discord.Client()
client.on("ready", () => {
  client.user.setPresence({
       status: "online",
       activity: {
        name: 'HacktoberFestPune',
        type: 'STREAMING',
        url: 'https://www.youtube.com/watch?v=_EXAftql0Xg'
        }
    })
  console.log(`Logged in as ${client.user.tag}!`)
})
client.on("message", (msg) => {

    if (msg.content === "ping") {
        msg.reply("Pong!")
    }
})

client.login(process.env.BOT_TOKEN)