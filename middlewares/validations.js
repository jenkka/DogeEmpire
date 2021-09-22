const jwt = require('jsonwebtoken')

function validateLogin(req,res, next){
    let {email, password} = req.body;
    if(email && password){
        next();
    }else{
        res.status(400).send({error: "Invalid data"})
    }
}

function isAuthenticated(req,res,next)
{
    let token =  req.get('x-auth');

    token = token ? token : req.cookies.token;

    if(token)
    {
        jwt.verify(token, 'dogeiskey', (err, decoded) =>
        {
            if(err)
            {
                res.status(401).send(err);
            } 
            else 
            {
                req.email = decoded.email;
                next();
            }
        })
    }
    else
    {
        res.status(401).send("Missing token");
    }
}

// function validateBody(req, res, next) {
//     let {name, calificacion, correo, carreras, password} = req.body
//     if(nombre && calificacion && correo && carreras && password) {
//         next();
//         return;
//     }
//     res.status(400).send(Missing properties);
// }

module.exports = { validateLogin, isAuthenticated }
