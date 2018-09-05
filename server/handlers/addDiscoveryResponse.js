/**
 * Adiciona um campo de "discovery" no JSON de resposta da API
 */

const watsonDiscovery = require('../watson').discovery;
const buildDiscoveryMessages = require('./buildDiscoveryMessages');

module.exports = (assistantOutput, msg) => {
    let response = assistantOutput;
    return new Promise((resolve, reject) => {
        // verifica se o nó resultante é o de Anything_Else
        if(assistantOutput.output.nodes_visited && assistantOutput.output.nodes_visited[0] == "Em outros casos") {
            // procura no Discovery
            watsonDiscovery.query(msg)
                .then(discoveryOutuput => {
                    response.discovery = discoveryOutuput;
                    // Adiciona saida do Discovery no campo de texto de saida do Assistant
                    buildDiscoveryMessages(discoveryOutuput)
                        .then((newMessages) => {
                            response.output.text = response.output.text.concat(newMessages);
                            resolve(response);
                        });
                })
                .catch((err) => {
                    reject(err);
                });
        } else {
            resolve(response);
        }
    });
}