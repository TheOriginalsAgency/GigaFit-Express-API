const Program = require('../models/Program.model')

// Get All Programms
const allPrograms = (req, res) => {

        Program.find()
                .exec(function(err, programs) {
                    if(err) {
                        return res.status(404).json("Products Not Found !");
                    }
                    return res.status(200).json(programs);
                })

}

// Get One Program
const oneProgram = async (req, res) => {
    Program.findOne({ _id: req.params.id })
            .exec((err, program) => {
                if(err) {
                    return res.status(404).json("Product Not Found !");
                }
                return res.status(200).json(program);
            })
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
    const targetedProgram = await Program.findOne({ _id: req.params.id });
    try {
        if(targetedProgram) {
            const program = await targetedProgram.deleteOne();
            res.status(200).json(program);
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

const getAllExistingPrograms = async (req, res) => {
    const allPrograms = await Program.count();
    res.json(allPrograms);

}

module.exports = {
    allPrograms,
    oneProgram,
    addProgram,
    updateProgram,
    deleteProgram,
    cardioPrograms,
    bodyPartQueryProgram,
    getAllExistingPrograms
}