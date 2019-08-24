const express = require('express');
const router = express.Router();
const recept = require('../models/recept');

//Config to enable CORS
router.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET", "POST", "PATCH")
    res.header("Access-Control-Allow-Headers", "X-Requested-With,content-type");
    next();
});

//GET ALL
router.get('/', async (req,res) => {
    try{
        const recepts = await recept.find();
        res.json(recepts);
    }catch (err){
        res.status(500).json({message: err.message});
    }
});

//GET ONE
router.get('/:id', getRecepy, (req,res) => {
    res.send(res.recepy.name)
});

//SEACH BY NAME
router.get('/search/:s', async (req,res) => {
    try{
        if(req.params.s !== ""){
            let recepts = await recept.find({ name: new RegExp(req.params.s,'i')});
            res.json(recepts);
        }
    }catch (err){
        res.status(500).json({message: err.message});
    }
});

//CREATE ONE
router.post('/', async (req,res) => {
    const recepy = new recept({
        name: req.body.name,
        ingredients: req.body.ingredients,
        owner: req.body.owner,
    });
    try{
        const newRecepy = await recepy.save();
        res.status(201).json(newRecepy);
    }catch (err){
        res.status(400).json({message: err.message});
    }
});

//UPDATE ONE
router.patch('/:id', getRecepy , async (req,res) => {
    if(req.body.name != null){
        res.recepy.name = req.body.name;
    }
    if(req.body.ingredients != null){
        res.recepy.ingredients = req.body.ingredients;
    }
    if(req.body.owner != null){
        res.recepy.owner = req.body.owner;
    }
    try{
        const updatedRecepy = await res.recepy.save();
        res.json(updatedRecepy);
    }catch (err){
        res.status(400).json({message: err.message});
    }
});

//DELETE ONE
router.delete('/:id', getRecepy , async (req,res) => {
    try{
        await res.recepy.remove();
        res.json({message: 'Deleted Recepy'});
    }catch(err){
        res.status(500).json({message: err.message});
    }
});

async function getRecepy(req,res,next){
    let recepy;
    try{
        recepy = await recept.findById(req.params.id);
        if(recepy == null){
            return res.status(404).json({message: "No recepy was found"});
        }
    }catch(err){
        return res.status(500).json({message: err.message});
    }
    res.recepy = recepy;
    next();
}

module.exports = router;