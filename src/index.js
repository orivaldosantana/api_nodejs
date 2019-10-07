const express = require('express'); 
const bodyParser = require('body-parser'); 

const app = express(); 

const server = require('http').Server(app); 
const io = require('socket.io')(server); 

app.use((req, res, next) => {
    req.io = io; 
    next(); 
})

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: false})); 

// fonte: https://daveceddia.com/access-control-allow-origin-cors-errors-in-react-express/ 
var cors = require('cors');
app.use(cors());

require('./controllers/authController')(app); 
require('./controllers/deviceController')(app); 
require('./controllers/authorizationController')(app); 

server.listen(3002);
