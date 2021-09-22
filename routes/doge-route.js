const router = require('express').Router();
const fs = require('fs');
const validations = require('../middlewares/validations');

const Doge = require('../models/Doge');

router.get('/', async (req, res) =>
{
    console.log(req.query)
    let doc = await Doge.getDoges(req.query);
    if(doc)
        res.status(200).send(doc);
    else
        res.status(404).send("There are no doges here :(");
})

router.post('/', validations.isAuthenticated, async(req, res) =>
{
    let doge = await req.body;
    try
    {
        let doc = await Doge.saveDoge(doge);
        if(doc == 404){
            return res.status(404).send("Owner not found.");
        }
        return res.status(201).send(doc);
    }
    catch(e)
    {
        return res.status(400).send(e.message);
    }
})

router.get('/:uid', async(req, res) =>
{
    let doc = await Doge.getDoge(req.params.uid);
    res.status(200).send(doc);
})

router.put('/:uid', validations.isAuthenticated, async(req, res) => 
{
    let doc = await Doge.updateDoge(req.params.uid, req.body);
    if(doc)
        res.status(200).send(doc);
    else
        res.status(404).send("Doge not found.");
})

router.delete('/:uid', validations.isAuthenticated, async(req, res) =>
{
    let r = await Doge.deleteDoge(req.params.uid);
    if(r == 200)
        res.status(r).send("Doge deleted successfully.");
    else
        res.status(r).send("Doge not found.");
})

module.exports = router;
