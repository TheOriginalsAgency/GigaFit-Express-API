const Club = require('../models/Club.model');


const addClub = async (req, res) => {
    try {        
    
        //create new club
        const newClub = new Club(req.body);
    
        //save club and respond
        const club = await newClub.save();
        res.status(200).json(club);
  
      } catch (err) {
        res.status(500).json(err)
        console.log('My => '+ err);
      }
}

const allClubs = async (req, res) => {
  try {
      const Clubs = new Club.find();
      res.status(200).json(Clubs);
  } catch (err) {
      res.status(500).json(err);
  }
}

const updateClub = async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    if (club) {
      await Club.updateOne({ $set: req.body });
      res.status(200).json("the Club has been updated");
    } else {
      res.status(403).json("Club can't be updated");
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

const deleteClub = async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    if (club) {
      await club.deleteOne();
      res.status(200).json("the Club has been deleted");
    } else {
      res.status(403).json("This Club cann't be updated");
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = {
    addClub,
    allClubs,
    updateClub,
    deleteClub
}