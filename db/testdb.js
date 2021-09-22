const mongoose = require('./mongodb_connect');
const Doge = require('../models/Doge');


let newDoge = {uid: 5, name: "Juan", breed: "eee", size: ['Medium'], sex: ['Male'], birthdate: "12-04-2012", owner: "twet"};


Doge.saveDoge(newDoge);
// Doge.getDoges({});
