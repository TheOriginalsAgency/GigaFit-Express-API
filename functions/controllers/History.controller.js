const History = require('../models/History.model');
const Repitition = require('../models/Repitition.model');


// Get One History
const programHistory = async (req, res) => {
    const history = await History.findOne({ user: req.params.user_id, program: req.params.program_id });
    try {

        if (history) {
            res.status(200).send(history);
        } 

    } catch(err) {
        res.status(500).json(err);
        console.log('My error !!! ' + err);
    }
}

// Add new History
const addHistory = async (req, res) => {
    try {
        var list_rep = []
        const newRepitition = new Repitition({
            num: req.body.num,
            mesure:req.body.mesure,
            counter: req.body.counter,
            counter_rest: req.body.counter_rest,
        });
        const repitition = await newRepitition.save();
        list_rep.push(repitition._id);
        const history = await History.findOne({ user: req.params.user_id, program: req.params.program_id });
        if(history) {
            // for(var i=0; i < history.repitition; i++) {
            //     console.log(history.repitition[i]);
            //     list_rep.push(history.repitition[i]);
            // }
            const targetedHistory = await history.updateOne({ $set: {repitition: [...list_rep, ...history.repitition]}});
            res.status(200).json(targetedHistory);

        }else {
            const newHistory = new History({
                program: req.params.program_id,
                user: req.params.user_id,
                repitition: list_rep
            });
            console.log(newHistory);
            const history = await newHistory.save();
            res.status(200).json(history);
        }
        

    } catch(err) {
        res.status(500).json(err);
        console.log('My => '+ err);
    }
}


module.exports = {
    programHistory,
    addHistory
}