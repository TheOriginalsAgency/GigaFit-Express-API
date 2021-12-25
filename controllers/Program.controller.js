const Program = require('../models/Program.model')

// Get All Programms
const allPrograms = async (req, res) => {
    try {

        const programms = await Program.find();
        res.status(200).json(programms);

    } catch(err) {
        res.status(500).json(err);
        console.log('My error !!! ' + err);
    }
}

// Get One Program
const oneProgram = async (req, res) => {
    try {

        const program = await Program.findOne({ _id: req.params.id });
        res.status(200).json(program);

    } catch(err) {
        res.status(500).json(err);
        console.log('My error !!! ' + err);
    }
}

// Add new Program
const addProgram = async (req, res) => {
    try {
        const newProgram = new Program(req.body);
        console.log(newProgram);
        const program = await newProgram.save();
        res.status(200).json(program);

    } catch(err) {
        res.status(500).json(err);
        console.log('My => '+ err);
    }
}

// Update Program
const updateProgram = async (req, res) => {
    const targetedProgram = await Program.findOne({ _id: req.params.id });
    try {
        if(targetedProgram) {
            const program = await targetedProgram.updateOne({ $set: req.body });
              res.status(200).json(program);
        }
        
      } catch (err) {
        res.status(500).json(err);
      }
    
}

// delete Program
const deleteProgram = async (req, res) => {
    const targetedProgram = await Program.findOne({ uuid: req.params.id });
    try {
        if(targetedProgram) {
            const program = await targetedProgram.deleteOne();
            res.status(500).json(program);
        }
    } catch(err) {
        res.status(500).json(err);
    }
}

//Customised Programs Querys
//Get Programs that have Categorie: "Cardio"
const cardioPrograms = async (req, res) => {
    try {

        const programs = await Program.find({categorie: "Cardio"});
        console.log(programs);
        res.status(200).json(programs);

    } catch(err) {
        res.status(500).json(err);
    }
}

const bodyPartQueryProgram = async (req, res) => {
    try {
        if(req.params.worktype == 'Exercice') {
            const programs = await Program.find({categorie: "Musculation", worktype: req.params.worktype, bodypart: req.params.bodypart});
            console.log(programs);
            res.status(200).json(programs);
        }else if(req.params.worktype == 'Étirement') {
            const programs = await Program.find({categorie: "Musculation", worktype: req.params.worktype, bodypart: req.params.bodypart});
            console.log(programs);
            res.status(200).json(programs);
        }
        

    } catch(err) {
        res.status(500).json(err);
        console.log('ERR!! ' + err);
    }
}

module.exports = {
    allPrograms,
    oneProgram,
    addProgram,
    updateProgram,
    deleteProgram,
    cardioPrograms,
    bodyPartQueryProgram
}