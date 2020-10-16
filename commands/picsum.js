const fetch = require('node-fetch');

module.exports = {
	name: 'picsum',
	description: 'Get a random picsum image.',
	aliases: ['meow', 'billi'],
	async execute(message) {
		const  file  = await fetch('https://source.unsplash.com/random');

	    message.channel.send('https://source.unsplash.com/random');
	},
};