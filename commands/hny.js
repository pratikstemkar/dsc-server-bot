const axios = require('axios');
const { MessageAttachment } = require('discord.js');
const fetch = require('node-fetch');
const Discord = require('discord.js');

const getImg = () => {
    return axios.get(`${process.env.API_URL}photos/random/`, {
        params: { query: 'happy new year'},
        headers: { Authorization: `Client-ID ${process.env.ACCESS_KEY}` }
    })
    .then(({data}) => {
        return data;
    })
}



module.exports = {
	name: 'hny',
	description: 'New Year greeting or something like that.',
	aliases: ['2021', 'bye2020'],
	async execute(message) {
        const christmas = await getImg();
        message.channel.send(`**Happy New Year ${message.author}! **🎅🎄`)
        message.channel.send(christmas.urls.regular)
        console.log(christmas.urls.regular)
	},
};