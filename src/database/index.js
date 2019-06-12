const mongoose = require('mongoose'); 

mongoose.set('useFindAndModify', false);

mongoose.connect('mongodb://localhost/iot_db', {useNewUrlParser: true, useCreateIndex: true});

mongoose.connection.on('connected', function () {  
    console.log('Mongoose default connection open.');
  }); 
  
  // If the connection throws an error
  mongoose.connection.on('error',function (err) {  
    console.log('Mongoose default connection error: ' + err);
  })

mongoose.Promise = global.Promise; 

module.exports = mongoose; 