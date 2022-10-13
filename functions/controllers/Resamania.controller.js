const axios = require('axios')
const Club = require('../models/Club.model');
const { resa_credentials } = require('../config/app.config')
const NodeCache = require('node-cache')

const ResamaniaCache = new NodeCache({stdTTL: 3600})

let token = ''

var clubsLinks = [
    {name:'Gigafit Terrasson', link: 'https://member.resamania.com/gigafit-terrasson/', logo:'Terrasson-Lavilledieu.jpg'},
    {name:'Gigafit Paris 16', link: 'https://member.resamania.com/gigafit-p16/', logo: 'Paris-16.jpg'},
    {name:'Gigafit Creteil', link: 'https://member.resamania.com/gigafit-creteil/', logo: 'Créteil-Pompadour.jpg'},
    {name:'Gigafit Paris 18', link: 'https://member.resamania.com/gigafit-p18/', logo: 'Paris-18.jpg'},
    {name:'Gigafit Champs-Sur-Marne', link: 'https://member.resamania.com/gigafit-csm/', logo: 'Champs-sur-marne.jpg'},
    {name:'Gigafit Argenteuil', link: 'https://member.resamania.com/gigafit-argenteuil/', logo: 'argenteuil.jpg'},
    {name:'Gigafit Paris 19', link: 'https://member.resamania.com/gigafit-p19/', logo: 'Paris-19.jpg'},
    {name:'Gigafit La Plaine', link: 'https://member.resamania.com/gigafit-laplaine/', logo: 'La-Plaine.jpg'},
    {name:'Gigafit Pontarlier', link: 'https://member.resamania.com/gigafit-pontarlier/', logo: 'Pontarlier.jpg'},
    {name:'Gigafit Psm', link: 'https://member.resamania.com/gigafit-psm/', logo: ''},
    {name:'Gigafit Antony Verrieres', link: 'https://member.resamania.com/gigafit-verrieres/', logo: 'Antony-verrieres.jpg'},
    {name:'Gigafit Gien', link: 'https://member.resamania.com/gigafit-gien/', logo: 'Gien.jpg'},
    {name:'Gigafit Malakoff', link: 'https://member.resamania.com/gigafit-malakoff/', logo: 'Malakoff.jpg'},
    {name:'Gigafit Aubergenville', link: 'https://member.resamania.com/gigafit-aubergenville/', logo: 'Aubergenville.jpg'},
    {name:'Gigafit Villeparisis', link: 'https://member.resamania.com/gigafit-villeparisis/', logo: 'Villeparisis.jpg'},
    {name:'Gigafit Saint-Orens', link: 'https://member.resamania.com/gigafit-so/', logo: 'saint-orens.jpg'},
    {name:'Gigafit Ferrières', link: 'https://member.resamania.com/gigafit-ferrieres/', logo: 'Ferrières-en-Gâtinais.jpg'},
    {name:'Gigafit Belfort', link: 'https://member.resamania.com/gigafit-belfort/', logo: 'Belfort.jpg'},
    {name:'Gigafit Saint-Malo', link: 'https://member.resamania.com/gigafit-sm/', logo: 'Saint-malo.jpg'},
    {name:'Gigafit Fréjus', link: 'https://member.resamania.com/gigafit-frejus/', logo: 'Fréjus.jpg'},
    {name:'Gigafit Argelès-Sur-Mer', link: 'https://member.resamania.com/gigafit-argeles/', logo: 'Argelès-sur-mer.jpg'},
    {name:'Gigafit Avrainville', link: 'https://member.resamania.com/gigafit-avrainville/', logo: 'Avrainville.jpg'},
    {name:'Gigafit Beauvais', link: 'https://member.resamania.com/gigafit-beauvais/', logo: 'Beauvais.jpg'},
    {name:'Gigafit Bergerac', link: 'https://member.resamania.com/gigafit-bergerac/', logo: 'Bergerac.jpg'},
    {name:'Gigafit Agen Bon-Encontre', link: 'https://member.resamania.com/gigafit-abe/', logo: 'Agen-bon-encontre.jpg'},
    {name:'Gigafit Bretigny', link: 'https://member.resamania.com/gigafit-bretigny/', logo: 'Bry-Sur-Marne.jpg'},
    {name:'Gigafit Brive', link: 'https://member.resamania.com/gigafit-brive/', logo: 'Brive-la-gaillarde.jpg'},
    {name:'Gigafit Bruz', link: 'https://member.resamania.com/gigafit-bruz/', logo: ''},
    {name:'Gigafit Cavignac', link: 'https://member.resamania.com/gigafit-cavignac/', logo: 'Cavignac.jpg'},
    {name:'Gigafit Chambly', link: 'https://member.resamania.com/gigafit-chambly/', logo: 'Chambly.jpg'},
    {name:'Gigafit Champigny', link: 'https://member.resamania.com/gigafit-champigny/', logo: 'Champigny.jpg'},
    {name:'Gigafit Compiègne', link: 'https://member.resamania.com/gigafit-compiegne/', logo: 'Compiègne.jpg'},
    {name:'Gigafit Conflans', link: 'https://member.resamania.com/gigafit-conflans/', logo: 'Conflans-Sainte-Honorine.jpg'},
    {name:'Gigafit Coquelles', link: 'https://member.resamania.com/gigafit-coquelles/', logo: ''},
    {name:'Gigafit Courcelles', link: 'https://member.resamania.com/gigafit-courcelles/', logo: 'Courcelles---seine.jpg'},
    {name:'Gigafit Creil', link: 'https://member.resamania.com/gigafit-creil/', logo: 'Creil---verneuil.jpg'},
    {name:'Gigafit Dunkerque', link: 'https://member.resamania.com/gigafit-dunkerque/', logo: 'Dunkerque.jpg'},
    {name:'Gigafit Figeac', link: 'https://member.resamania.com/gigafit-figeac/', logo: 'Figeac.jpg'},
    {name:'Gigafit Itteville', link: 'https://member.resamania.com/gigafit-itteville/', logo: 'Itteville.jpg'},
    {name:'Gigafit Le Plessis-Belleville', link: 'https://member.resamania.com/gigafit-lpb/', logo: 'Le-Plessis-Belleville.jpg'},
    {name:'Gigafit Manosque', link: 'https://member.resamania.com/gigafit-manosque/', logo: 'Manosque.jpg'},
    {name:'Gigafit Marsac', link: 'https://member.resamania.com/gigafit-marsac/', logo: ''},
    {name:'Gigafit Meaux', link: 'https://member.resamania.com/gigafit-meaux/', logo: 'Meaux.jpg'},
    {name:'Gigafit Morangis', link: 'https://member.resamania.com/gigafit-morangis/', logo: ''},
    {name:'Gigafit Nancy', link: 'https://member.resamania.com/gigafit-nancy/', logo:''},
    {name:'Gigafit Nice', link: 'https://member.resamania.com/gigafit-nice/', logo: 'Nice-port.jpg'},
    {name:'Gigafit Nogent-sur-Oise', link: 'https://member.resamania.com/gigafit-nso/', logo: 'Nogent-oise.jpg'},
    {name:'Gigafit Pierrelaye', link: 'https://member.resamania.com/gigafit-pierrelaye/', logo: 'Pierrelaye.jpg'},
    {name:'Gigafit Riberac', link: 'https://member.resamania.com/gigafit-riberac/', logo: 'Ribérac.jpg'},
    {name:'Gigafit Saint-Gratien', link: 'https://member.resamania.com/gigafit-sg/', logo: 'Saint-gratien.jpg'},
    {name:'Gigafit Savigny', link: 'https://member.resamania.com/gigafit-slt/', logo: ''},
    {name:'Gigafit Soisy-sur-Seine', link: 'https://member.resamania.com/gigafit-sss/', logo: 'Soisy-sur-seine.jpg'},
    {name:'Gigafit Sollies - La Farlède', link: 'https://member.resamania.com/gigafit-slf/', logo: 'Sollies-la-farlede.jpg'},
    {name:'Gigafit Souillac', link: 'https://member.resamania.com/gigafit-souillac/', logo: 'Souillac.jpg'},
    {name:'Gigafit Toulon', link: 'https://member.resamania.com/gigafit-toulon/', logo: 'Toulon-bon-rencontre.jpg'},
    {name: 'Gigafit Vigneux', link:	'https://member.resamania.com/gigafit-vigneux/', logo: ''},
    {name:'Gigafit Villabé', link: 'https://member.resamania.com/gigafit-villabe/', logo: 'Villabé.jpg'},
    {name: 'Gigafit Villemomble', link:	'https://member.resamania.com/gigafit-villemomble/', logo:'Villemomble.jpg'}
]

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



const mergeGigaFitClubs = async (req, res) => {
    

    try {
            const result = await axios.get(
                "https://api.resa2-integ.stadline.com/gigafit/clubs",
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                        'X-User-Network-Node-Id': '/gigafit/network_nodes/507',
                        'X-User-Club-Id': '/gigafit/clubs/1040'
                    }
                }
            )

            await Club.deleteMany();
            console.log('All Data successfully deleted');
            let listClubs = []
            for(var i=0; i < result.data['hydra:member'].length; i++){
                for (var j = 0; j < clubsLinks.length; j++) {
                    let resName = result.data['hydra:member'][i].name;
                    let linkName = clubsLinks[j].name;
                    if (linkName.match(resName)) {
                        
                        //create new club
                        const newClub = new Club({
                            resId: result.data['hydra:member'][i].id,
                            name: result.data['hydra:member'][i].name,
                            eventLink: clubsLinks[j].link,
                            picture: clubsLinks[j].logo
                        });
                
                        //save club and respond
                        const club = await newClub.save();
                        listClubs.push(club)
                    }
                    
                }
            }
  
            res.status(200).send(listClubs);


    } catch (error) {
        console.log('====================================');
        console.log('Resa ERROR' + error);
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
    mergeGigaFitClubs,
    getGigaFitClubStudios
};