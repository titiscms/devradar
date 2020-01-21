const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');

// index: lista dev
// show: unico dev
// store: criar
// update: atualizar
// destroy: deletar

module.exports = {
    // async update(request, response) {
    //     nome, avatar, bio, techs
    // },

    // async destroy(request, response) {
    //     const devDelete = await Dev.findByIdAndRemove(request.params.id);
    //     return request.json({message: 'dev deletado com sucesso!'});
    // },

    async index(request, response) {
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });

        if(!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

            const { name = login, avatar_url, bio } = apiResponse.data;
    
            const techsArray = parseStringAsArray(techs);
    
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };
    
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            })

            // Filtrar as conexões que estão há no máximo 10km de distância
            // e que o novo dev tenha pelo menos uma tecnologias filtrada
            const sendSocketMessageTo = findConnections({ latitude, longitude }, techsArray,);

            sendMessage(sendSocketMessageTo, 'new-dev', dev);
        }

        return response.json(dev);
    }
};