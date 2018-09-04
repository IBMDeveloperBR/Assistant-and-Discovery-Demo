/**
 * Adiciona um campo de "discovery" no JSON de resposta da API
 */

const watsonDiscovery = require('../watson').discovery;
const buildDiscoveryMessages = require('./buildDiscoveryMessages');

module.exports = (assistantOutput, msg) => {
    let response = assistantOutput;
    return new Promise((resolve, reject) => {
        if(assistantOutput.output.nodes_visited && assistantOutput.output.nodes_visited[0] == "Em outros casos") {
            watsonDiscovery.query(msg)
                .then(discoveryOutuput => {
                    response.discovery = discoveryOutuput;
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