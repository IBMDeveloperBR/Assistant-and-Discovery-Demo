const watsonDiscovery = require('../watson').discovery;

module.exports = (assistantOutput, msg) => {
    let response = assistantOutput;
    return new Promise((resolve, reject) => {
        if(assistantOutput.intents.length == 0) {
            watsonDiscovery.query(msg)
                .then(discoveryOutuput => {
                    response.discovery = discoveryOutuput;
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } else {
            resolve(response);
        }
    });
}