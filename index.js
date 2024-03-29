const fs = require('fs');
const fetch = require('node-fetch');
const Discord = require("discord.js")
require("dotenv").config()
const { prefix } = require("./config.json")

const client = new Discord.Client()
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

client.on("ready", () => {
  client.user.setPresence({
       status: "online",
       activity: {
		name: 'Have a Nice Day!',
        type: 'PLAYING',
        url: 'https://www.youtube.com/watch?v=KRO-2hUpcZ8'
        }
	})

	// client.channels.cache.get("771677054352621579").send("🎈");
	
	
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', message => {
	if(message.author.bot && message.author.username === 'DSC MESCOE' && message.channel.type != 'dm'){
		message.react("871266180432818206").then(
			message.react("871268015679893534").then(
				message.react("871267676415225857").then(
					message.react("871264451557482536").then(
						message.react("871266464848576542").then(
							message.react("871265865591574548").then(
								message.react("871268103231778866").then(
									message.react("871267765728714784").then(
										message.react("871267907823345674")
									)
								)
							)
						)
					)
				)
			)
		)
	}

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('I can\'t execute that command inside DMs!');
	}

	

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}

	
});

client.login(process.env.BOT_TOKEN)