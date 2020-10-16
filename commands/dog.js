const fetch = require('node-fetch');

module.exports = {
	name: 'dog',
	description: 'Get a random dog image.',
	aliases: ['bhau', 'kutta'],
	async execute(message) {
		const file = await fetch('https://dog.ceo/api/breeds/image/random').then(response => response.json());

	    message.channel.send(file.message);
	},
};