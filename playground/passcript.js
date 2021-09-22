const bcrypt = require("bcryptjs");

let hash = bcrypt.hashSync('123', 8)
console.log(hash);


let pass="1234"
let resp= bcrypt.compareSync(pass,hash)
console.log(resp);



