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

const oneClub = async (req, res) => {
  try {
      const club = await Club.findOne({_id: req.params.id});
      res.status(200).json(club);
  } catch (err) {
      res.status(500).json(err);
  }
}


const allClubs = async (req, res) => {
  try {
      const Clubs = await Club.find();
      res.status(200).json(Clubs);
  } catch (err) {
      res.status(500).json(err);
  }
}

const updateClub = async (req, res) => {
  try {
    const club = await Club.findOne({ _id: req.params.id });
    console.log("Targeted Club " + club);
    if (club) {
      const updatedClub = await club.updateOne({ $set: req.body });
      console.log(updatedClub);
      res.status(200).json("the Club has been updated");
    } else {
      res.status(403).json("Club can't be updated");
    }
  } catch (err) {
    res.status(500).json(err);
    console.log("Club Error " + err);
  }
}

const deleteCoachs = async (req, res) => {
  try {
    const club = await Club.findOne({ _id: req.params.id });
    if (req.params.id) {
      await club.updateOne({ $pull: { coaches: req.params.coach  }});
      res.status(200).json("the Club Coachs has been updated");
    } else {
      res.status(403).json("Club Coachs can't be updated");
    }
  } catch (err) {
    res.status(500).json(err);
    console.log("Club Error " + err);
  }
}

const deleteStudios = async (req, res) => {
  try {
    const club = await Club.findOne({ _id: req.params.id });
    if (req.params.id) {
      await club.updateOne({ $pull: { studios: req.params.studio  }});
      res.status(200).json("the Club studios has been updated");
    } else {
      res.status(403).json("Club studios can't be updated");
    }
  } catch (err) {
    res.status(500).json(err);
    console.log("Club Error " + err);
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

const getCountAll = async (req, res) => {
  const allclubCount = await Club.count();
  res.json(allclubCount);
  console.log(allclubCount);
}

module.exports = {
    addClub,
    oneClub,
    allClubs,
    updateClub,
    deleteClub,
    getCountAll,
    deleteCoachs,
    deleteStudios
}