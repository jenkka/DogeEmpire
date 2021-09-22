const express = require("express");
const cookieParser = require("cookie-parser");

const dogeRouter = require('./routes/doge-route');
const userRouter = require('./routes/user-route');
const authRouter = require('./routes/auth-route');

const app = express();
const port = process.env.PORT || 3000;

app.use(cookieParser('Cookie signing key'));    // req.cookies.nombreCookie
app.use(express.json());
app.use(express.urlencoded({ extended: true }));  // forms

app.use('/api/doges', dogeRouter);
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

app.use(express.static(__dirname + '/public'));
app.use('/', express.static(__dirname + '/public/index'));
app.use('/doges', express.static(__dirname + '/public/doges'));
app.use('/doge', express.static(__dirname + '/public/doge'));
app.use('/user', express.static(__dirname + '/public/user'));
app.use('/favorites', express.static(__dirname + '/public/favorites'));

// app.get('/', function(req, res) 
// {
//     res.render('index');
// })

app.listen(port, () => console.log("Running on port " + port));
