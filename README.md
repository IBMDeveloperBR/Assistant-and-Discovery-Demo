# Assistant-and-Discovery-Demo

O objetivo dessa aplicação é demostrar como integrar o serviço do Watson Discovery com Watson Assistant.

## Pre-requisitos:
  * Node >= 8
  * [Watson Assistant](https://www.ibm.com/watson/ai-assistant/)
  * [Watson Discovery](https://www.ibm.com/watson/services/discovery/)

## Arquitetura do Projeto

* Pasta `public/`, contem o frontend
* Pasta `server/`, contem o orquestrador do Chatbot:

    * Na pasta `watson/`, temos as conexões aos serviços
    * Na pasta `handlers/` temos algumas funções auxiliares:

        * `addDiscoveryResponse.js`: nesse arquivo adicionamos um campo chamada *discovery* na resposta do Watson Assistant, além de invocar o método descrito em: `buildDiscoveryMessages.js`
        * `buildDiscoveryMessages.js`: nesse arquivo montamos a mensagem em texto com base na resposta do Discovery:

            * Caso o documento retornado tenha +25% de assertividade o conteúdo dele é adicionado no campo de saída de texto da resposta do Assistant.
            * Caso tenha menos de 25% de assertividade na busca, é retornada a mensagem de *Nada encontrado...*
  
## Rodando Localmente
#### Frontend e Orquestrador:
  Para instalar o backend basta seguir os passos abaixo:
  
  * Instalar as dependências do backend executando: `npm install`
  * Colocar credenciais do Watson no arquivo `.env`
  * Para executar o backend basta executar: `npm run dev`
  
#### Endpoints

  * `localhost:8000`: endpoint backend
  * `localhost:8000/api/message`: rota do orquestrador para recebimento de mensagens.

## Deploy 