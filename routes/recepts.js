const express = require('express');
const router = express.Router();
const recept = require('../models/recept');

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