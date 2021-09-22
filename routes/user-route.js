const router = require('express').Router();
const fs = require('fs');
const bcrypt = require('bcryptjs')
const validations = require('../middlewares/validations');

const User = require('../models/User');

router.get('/', async (req, res) =>
{
    let doc = await User.getUsers();
    if(doc)
        res.status(200).send(doc);
    else
        res.status(404).send("There are no users in the database.");
})

router.post('/', async(req, res) =>
{
    let user = req.body;
    try
    {
        user.password = bcrypt.hashSync(user.password, 8);
        let doc = await User.saveUser(user);
        res.status(201).send(doc);
    }
    catch(e)
    {
        res.status(400).send(e.message);
    }
})

router.get('/:email', async(req, res) =>
{
    let doc = await User.getUser(req.params.email);
    res.status(200).send(doc);
})

router.put('/:email', validations.isAuthenticated, async(req, res) => 
{
    let doc = await User.updateUser(req.params.email, req.body);
    if(doc)
        res.status(200).send(doc);
    else
        res.status(404).send("User not found.");
})

router.delete('/:email', validations.isAuthenticated, async(req, res) =>
{
    let r = await User.deleteUser(req.params.email);
    if(r == 200)
        res.status(r).send("User deleted successfully.");
    else
        res.status(r).send("Error deleting user.");
})

module.exports = router;
