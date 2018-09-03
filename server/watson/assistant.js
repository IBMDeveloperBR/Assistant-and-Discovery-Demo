const Assistant = require('watson-developer-cloud/assistant/v1');

const assistantClient = new Assistant({
    username: process.env.ASSISTANT_USERNAME,
    password: process.env.ASSISTANT_PASSWORD,
    version: '2018-07-10',
});

const assistant = {
    message: (msg, ctx) => {
        console.log(msg);
        const req = {
            workspace_id: process.env.ASSISTANT_WORKSPACE,
            input: msg,
            context: ctx || null
        }
        return new Promise((resolve, reject) => {
            assistantClient.message(req, (err, resp) => {
                if(err){
                    return reject(err);
                } else {
                    resolve(resp);
                }
            });
        });
    }
}

module.exports = assistant;