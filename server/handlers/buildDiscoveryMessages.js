/**
 * Considerando as respostas do Discovery. Essa funcao tem como objetivo:
 * Responsavel por criar os textos das mensagens
 */

const async = require('async');

module.exports = (discoveryOutput) => {
    return new Promise((resolve, reject) => {
        let resp = [];
        let docFound = false;
        async.eachSeries(discoveryOutput.results, (result, cb) => {
            // so considera valores acima de 60%            
            if(result.result_metadata.score > .6){
                docFound = true;
                resp.push(result.html);
            }
            cb();
        }, (err) => {
            //caso tenha encontrado algum documento com score > 60%
            if(docFound)
                resolve(resp[0]);
            else 
                resolve('Nada encontrado...')
        });
    });
}