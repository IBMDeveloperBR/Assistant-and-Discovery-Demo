/**
 * Arquivo de controle e conexao com Watson Discovery
 */
const Discovery = require('watson-developer-cloud/discovery/v1');

let discoveryClient;

if(process.env.DISCOVERY_USERNAME && process.env.DISCOVERY_PASSWORD 
    && process.env.DISCOVERY_ENV && process.env.DISCOVERY_COLLECTION){
    // Autenticacao com Watson Discovery
    discoveryClient = new Discovery({
        version: '2018-08-01',
        username: process.env.DISCOVERY_USERNAME,
        password: process.env.DISCOVERY_PASSWORD,
    });
}
const discovery = {
    query: (msg) => {
        // montagem da Query de requisicao para o Discovery
        const req = {
            environment_id: process.env.DISCOVERY_ENV,
            collection_id: process.env.DISCOVERY_COLLECTION,
            natural_language_query: msg.text,
            deduplicate: false,
        }
        return new Promise((resolve, reject) => {
            discoveryClient.query(req, (err, resp) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(resp);
                }
            });
        });
    }
}
module.exports = discovery;