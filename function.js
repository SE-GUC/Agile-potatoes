var Vacancy = require('./models/vacancyModel');
var Admin = require('./models/adminModel');
var Partner = require('./models/partnerModel');
var Member = require('./models/memberModel');
const axios = require('axios');

const functions = {
    AddingTwoCommentsToEvents: async (eve, partner, admin) => {
        let updatedEvent = "";
        try {
            axios.defaults.adapter = require('axios/lib/adapters/http');
            await axios.post(`http://localhost:3000/api/event/${eve._id}/comment`, {
                userType: "Admin",
                userId: admin._id,
                comment: "it wasn't as good as expected"
            })
            axios.defaults.adapter = require('axios/lib/adapters/http');
            await axios.post(`http://localhost:3000/api/event/${eve._id}/comment`, {
                userType: "Partner",
                userId: partner._id,
                comment: "i'm so sorry"
            });
            axios.defaults.adapter = require('axios/lib/adapters/http');
            updatedEvent = await axios.get(`http://localhost:3000/api/event/${eve._id}`);
            return( updatedEvent.data.commentsByAdmin.concat(updatedEvent.data.commentsByPartner).length);
        }
        catch (error) {
            console.log("errorNADA")
            return 'nothing';

        }    

    },
    CreatingVacancy: async (par, vac) => {
        try {
            axios.defaults.adapter = require('axios/lib/adapters/http');
            await axios.post(`http://localhost:3000/api/${par._id}/CreateVacancy`, {
                userType: "Partner",
                description: vac.description,
                duration: vac.duration,
                 location: vac.location,
                 salary: vac.salary,
                 dailyHours : vac.dailyHours
                 
            });
            axios.defaults.adapter = require('axios/lib/adapters/http');
           createdVacancy= await axios.get(`http://localhost:3000/api/${vac._id}/PendingVacancies`);
            return (createdVacancy.data.length);
        }
        catch (error) {
            console.log("errorNADA1")
            return 'nothing';

        }    

    }

    }


module.exports = functions;

