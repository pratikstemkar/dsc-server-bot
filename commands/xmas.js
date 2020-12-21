const axios = require('axios');
const { MessageAttachment } = require('discord.js');
const fetch = require('node-fetch');

const getImg = () => {
    return axios.get(`${process.env.API_URL}photos/random/`, {
        params: { query: 'christmas'},
        headers: { Authorization: `Client-ID ${process.env.ACCESS_KEY}` }
    })
    .then(({data}) => {
        return data;
    })
}

module.exports = {
	name: 'xmas',
	description: 'Christmas greeting or something like that.',
	aliases: ['christmas', 'santa'],
	async execute(message) {
        const christmas = await getImg();
        message.channel.send(`**Merry Christmas ${message.author}! **🎅🎄`)
        message.channel.send(christmas.urls.regular)
        console.log(christmas.urls.regular)
	},
};