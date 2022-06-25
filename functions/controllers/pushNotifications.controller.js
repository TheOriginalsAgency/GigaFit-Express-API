const { ONE_SIGNAL_CONFIG } = require('../config/app.config');
// const OneSignal = require('onesignal-node');  


// const client = new OneSignal.Client(ONE_SIGNAL_CONFIG.APP_ID, ONE_SIGNAL_CONFIG.API_KEY, { apiRoot: 'https://onesignal.com/api/v2/notifications'});







const pushNoticationService = require('../services/pushNotication.service');

exports.SendNotification = (req, res, next) => {
    var message = {
        app_id: ONE_SIGNAL_CONFIG.APP_ID,
        contents: {en: req.body.content},
        headings: {en: 'Hello GigaFit User'},
        included_segments: ["Active Users", "Inactive Users"],
        content_available: true,
        small_icon: "ic_notification_icon",
        url: req.body.lien,
        data: {
            pushTitle: "Hello GigaFit User",
        },
    };

    pushNoticationService.SendNotification(message, (error, results) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: results
            
        })

    });
}

exports.SendNotificationToDevice = (req, res, next) => {
    var message = {
        app_id: ONE_SIGNAL_CONFIG.APP_ID,
        contents: {en: 'Test Push Notification'},
        included_segments: ["Subscribed Users"],
        include_player_ids : req.body.devices,
        content_available: true,
        small_icon: "ic_notification_icon",
        data: {
            pushTitle: "CUSTOM NOTIFICATION",

        } 
    }

    pushNoticationService.SendNotification(message, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        })

    })
}

