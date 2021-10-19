# API REST com NodeJS

## Execução em modo de desenvolvimento 

Comando para executar o projeto no seu diretório raiz  
```bash
$ node src/index.js  
```
Comando para executar e detectar automaticamente modificações nos arquivos 
```bash
$ nodemon src/index.js  
```


## Projeto Novo

Para criar um projeto novo 
```bash 
$ yarn init -y 
```

## Instalação de pacotes 

Gerenciador de rotas 
```
$  yarn add express
``` 

Para manipular json nas requisições 
```
$  yarn add body-parser 
``` 

Conexão com o banco de dados MongoDB
```
$ yarn add mongoose
``` 

Tokens de autenticação da API 
```
$ yarn add jsonwebtoken 
``` 

Comunicação com o _broker_ MQTT
```
yarn add async-mqtt
```

Comunicação em tempo real entre _backend_ e _frontend_
```
yarn add socket.io
``` 

# Ferramentas 

Realizando testes de requisições: 
* Insomnia, https://support.insomnia.rest/ 

# Referências 

1. API NodeJS + Express + Mongo, Estrutura e cadastro | Diego Fernandes, https://www.youtube.com/watch?v=BN_8bCfVp88&list=PL85ITvJ7FLoiXVwHXeOsOuVppGbBzo2dp 
1. Pacote MQTT para NodeJS, https://www.npmjs.com/package/mqtt
1. Pacote com suporte a async e await, https://github.com/mqttjs/async-mqtt
1. Documentação introdutório para o MQTT em NodeJS, http://www.steves-internet-guide.com/using-node-mqtt-client/
1. Express.js Fundamentals - 6 - Middleware Explained, https://www.youtube.com/watch?v=9HOem0amlyg
