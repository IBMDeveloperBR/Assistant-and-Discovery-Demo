const Discovery = require('watson-developer-cloud/discovery/v1');

var discoveryClient = new Discovery({
    version: '2018-08-01',
    username: process.env.DISCOVERY_USERNAME,
    password: process.env.DISCOVERY_PASSWORD,
});
const discovery = {
    query: (msg) => {
        const req = {
            environment_id: process.env.DISCOVERY_ENV,
            collection_id: process.env.DISCOVERY_COLLECTION,
            natural_language_query: msg.input 
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