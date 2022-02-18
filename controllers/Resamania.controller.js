const axios = require('axios')
const { resa_credentials } = require('../config/app.config')
const NodeCache = require('node-cache')

const ResamaniaCache = new NodeCache({stdTTL: 3600})

let token = ''

async function ResamaniaOAuth(){
    try {
        const result = await axios.get(
            "https://api.resa2-integ.stadline.com/gigafit/oauth/v2/token",
            {
                headers: { 'Content-Type': 'application/json'},
                params: resa_credentials
            }
        )
        ResamaniaCache.set("token", result.data.access_token)
        token = result.data.access_token;
        console.log(token);
    } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
    }

}

if(ResamaniaCache.has("token")) {
    token = ResamaniaCache.get("token");
    console.log("There is a cache");
}else {
    ResamaniaOAuth()
    console.log("There is no cache !!!");
}



const getGigaFitClubs = async (req, res) => {
    

    try {
            const result = await axios.get(
                "https://api.resa2-integ.stadline.com/gigafit/clubs",
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                        'X-User-Network-Node-Id': '/gigafit/network_nodes/509',
                        'X-User-Club-Id': '/gigafit/clubs/715'
                    }
                }
            )

            let listClubs = []
            for(var i=0; i < result.data['hydra:member'].length; i++){
                listClubs.push({
                    id: result.data['hydra:member'][i].id, 
                    name: result.data['hydra:member'][i].name,
                    still: result.data['hydra:member'][i].disabledProcess.closedClub
                })
            }
  
            res.status(200).send(listClubs);


    } catch (error) {
        console.log('====================================');
        console.log('Resa ERROR' +error);
        console.log('====================================');
    }


}

const getGigaFitClubStudios = async (req, res) => {

    const clubId = req.params.clubId;

    try {
        const result = await axios.get(
            "https://api.resa2-integ.stadline.com/gigafit/studios",
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'X-User-Network-Node-Id': '/gigafit/network_nodes/509',
                    'X-User-Club-Id': '/gigafit/clubs/715'
                },
                params: {
                    club: `/gigafit/clubs/${clubId}`
                }
            }
        )


        let listClubStudios = []
        let listClubStudiosId = []
        for(var i=0; i < result.data['hydra:member'].length; i++){
            listClubStudios.push({
                id: result.data['hydra:member'][i]['@id'], 
                name: result.data['hydra:member'][i].name
            })
            listClubStudiosId.push(result.data['hydra:member'][i]['@id'])
        }

        const eventsResult = await axios.get(
            "https://api.resa2-integ.stadline.com/gigafit/events",
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'X-User-Network-Node-Id': '/gigafit/network_nodes/509',
                    'X-User-Club-Id': '/gigafit/clubs/715'
                },
                params: {
                    calendars: listClubStudiosId
                }
            }
        )

        let listClubEvents = []

        for(let i=0; i < eventsResult.data['hydra:member'].length; i++){
            const activityResult = await axios.get(
                `https://api.resa2-integ.stadline.com${eventsResult.data['hydra:member'][i].activity}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                        'X-User-Network-Node-Id': '/gigafit/network_nodes/509',
                        'X-User-Club-Id': '/gigafit/clubs/715'
                    }
                }
            )
                for(let j=0; j < listClubStudios.length; j++) {
                    if(eventsResult.data['hydra:member'][i].studio == listClubStudios[j].id) {
                        listClubEvents.push({
                            studio: listClubStudios[j].name,
                            activity: activityResult.data.name,
                            durations: activityResult.data.durations,
                            isBookable: activityResult.data.isBookable,
                            coach: eventsResult.data['hydra:member'][i].coach,
                            placeLimit: eventsResult.data['hydra:member'][i].attendingLimit,
                            startedAt: eventsResult.data['hydra:member'][i].startedAt,
                            endedAt: eventsResult.data['hydra:member'][i].endedAt
                        })
                    }
                }
            
        }

        res.status(200).send(listClubEvents);
    } catch (error) {
        console.log('====================================');
        console.log('Resa ERROR' +error);
        console.log('====================================');
    }


}



module.exports = { 
    getGigaFitClubs,
    getGigaFitClubStudios
};