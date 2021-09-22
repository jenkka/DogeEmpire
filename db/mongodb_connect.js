let mongoose = require('mongoose'); //ODM  = object data model
let config = require('./config');


mongoose.connect(config.getURL(), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true,  // unique
}).then(()=>console.log("Connected to database"))
  .catch((err)=>console.log("Error connecting to database", err))

  
module.exports = mongoose;