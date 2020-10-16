
module.exports = {
	name: 'ping',
	description: 'Ping!',
	cooldown: 5,
	execute(message) {
		message.channel.send("Pinging...").then(msg => 
			msg.edit(`:ping_pong: **Pong!** API latency took \`\`${Math.round (msg.createdTimestamp - message.createdTimestamp)} ms\`\` to respond.`))
	},
};