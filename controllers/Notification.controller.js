
const Notification = require('../models/Notifiction.model');
var FCM = require('fcm-node');
const {SERVER_KEY} = require('../config/app.config')


// all Notifications
const allNotif = async (req,res) => {
    try
    {
        const Notif = await Notification.find();
        console.log('gggg'+Notif);
        if (Notif) {
            res.status(200).json(Notif);
        }else {
            res.status(500).json('There is no notifications');
        }
        
    }
    catch(err)
    {
        
        console.log('Error :' + err);
    }
}

// one Notification
const oneNotif = async (req,res) => {
    try{
        const Notif = await Notification.findOne({_id : req.params.id});
        if(Notif) res.status(200).send(Notif);
    }
    catch(err)
    {
        res.status(500).json(err);
        console.log('Error :' + err);
    }
}

// Add Notification
const addNotif = async (req,res)=> {
    try {
        const newNotif = new Notification(req.body);
        let fcm = new FCM(SERVER_KEY);

        let message = {
            to: '/topics/all',
            notification: {
                title: req.body.clubname,
                body: req.body.discription,
                sound: 'default',
                'click_action': 'FCM_PLUGIN_ACTIVITY',
                'icon': 'fcm_push_icon',
            }
        }
        fcm.send(message, async (err, response) => {
            if(err) {
                next(err)
            }else {
                const Notif = await newNotif.save();
                res.status(200).send(Notif);
                console.log(response);
            }
        })
        
    } catch (err) {
        res.status(500).json(err);
        console.log('Error :' + err);
    }
}

// Update a Notification
const updateNotif = async (req,res) => {
    const tNotif = await Notification.findOne({_id: req.params.id});
    try {
        if(tNotif) {
            const Notif = await tNotif.updateOne({ $set: req.body });
              res.status(200).json(Notif);
        } 
      } catch (err) {
        res.status(500).json(err);
        console.log('Error : '+ err);
      }
}

// Delete a Notification
const deleteNotif = async (req,res) => {
    const tNotif = await Notification.findOne({ _id: req.params.id });
    try {
        if(tNotif) {
            const Notif = await tNotif.deleteOne();
            res.status(200).json(Notif);
        }
    } catch(err) {
        res.status(500).json(err);
    }
}

module.exports = {
    allNotif,
    oneNotif,
    addNotif,
    updateNotif,
    deleteNotif
}
