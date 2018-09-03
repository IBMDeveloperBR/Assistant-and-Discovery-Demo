const app = require('./app');

const PORT = process.env.PORT || 8000;

app.listen(PORT, (err) => {
    if(err) {
        throw err;
    } else {
        console.log('[SERVER] Listen on localhost:' + PORT);
    }
});