const axios = require('axios');
const Vacancy = require('./models/vacancyModel');

const functions = {
    viewVacancyPost: async (vac) => {
        let vacancy;
          
           try {
               vacancy = await axios.get(`http://localhost:3001/api/vacancy/Post/${vac._id}`, {
                
               });
               return (vacancy.data.name == vac.name);
           } catch (error) {
               console.log(error)
               return 'Wrong path ?';
           }
       },

    viewEventPost: async (eve) => {
     let event;
        try {
            event = await axios.get(`http://localhost:3001/api/event/Post/${eve._id}`, {
             
            });
            return (event.data.name == eve.name);
        } catch (error) {
            console.log(error)
            return 'Wrong path ?';
        }
    }
    ,
    updateUserAdmin: async (user, adm) => {
        let outBefore;
        let outAfter;
        try {
            outBefore = await axios.get(`http://localhost:3001/api/profile/${user._id}`, {
                'headers': {
                    'userId': user._id,
                    'userType': 'Member'
                }
            });
            outAfter = await axios.put(`http://localhost:3001/api/profile/${user._id}/update`, {
                "userType": "Admin",
                "userId": adm._id,
                "membershipExpiryDate": "2005-10-31T22:00:00.000+00:00"
            });
            return (outBefore.data.membershipExpiryDate == outAfter.data.membershipExpiryDate);
        } catch (error) {
            console.log(error)
            return 'Wrong path ?';
        }
    },
    updateUser: async (user) => {
        let outBefore;
        let outAfter;

        try {
            outBefore = await axios.get(`http://localhost:3001/api/profile/${user._id}`, {
                'headers': {
                    'userId': user._id,
                    'userType': 'Member'
                }
            });
            outAfter = await axios.put(`http://localhost:3001/api/profile/${user._id}/update`, {
                "userType": "Member",
                "userId": user._id,
                "lname": "uniqueone"

            });
            return (outBefore.data.lname == outAfter.data.lname);
        } catch (error) {
            console.log(error)
            return 'Wrong path ?';
        }
    },

    AddingTwoCommentsToVacancy: async (vac, par, adm) => {
        let updatedVac = "";
        try {
            await axios.post(`http://localhost:3001/api/vacancy/${vac._id}/comment`, {
                userType: "Admin",
                userId: adm._id,
                comment: "duration is long"
            });
            await axios.post(`http://localhost:3001/api/vacancy/${vac._id}/comment`, {
                userType: "Partner",
                userId: par._id,
                comment: "i know"
            });
            updatedVac = await axios.get(`http://localhost:3001/api/vacancy/Post/${vac._id}`);
            return (updatedVac.data.commentsByPartner.concat(updatedVac.data.commentsByAdmin).length);

        } catch (error) {
            console.log('GOT ERROR')
            console.log(error)
            return 'not';
        }

    },
    gettingApplicants: async (vac, par, mem) => {
        let applicantsRes;
        try {
            await axios.put(`http://localhost:3001/api/vacancy/${vac._id}/apply`, {
                userId: mem._id
            });
            applicantsRes = await axios.get(`http://localhost:3001/api/vacancy/${vac._id}/applicants`, { 'headers': { 'userId': `${par._id}` } });
            return applicantsRes.data.length;
        } catch (error) {
            console.log('GOT ERROR')
            console.log(error)
            return 'not';
        }
    },
    showingProfile: async (mem, profile) => {
        let returnedProfile;
        try {
            returnedProfile = await axios.get(`http://localhost:3001/api/profile/${profile._id}`, { 'headers': { 'userId': `${mem._id}`, 'userType': 'Member' } });
            return (returnedProfile.data._id == profile._id);

        } catch (error) {
            console.log('GOT ERROR')
            console.log(error)
            return 'not';
        }
    },
    recommendVacancies: async (mem) => {
        let recommendVacanciesRes;
        try {
            recommendVacanciesRes = await axios.get(`http://localhost:3001/api/vacancy/RecommendedVacancies`, { 'headers': { 'userId': `${mem._id}` } });
            return (recommendVacanciesRes.data.length);
        } catch (error) {
            console.log('GOT ERROR')
            console.log(error)
            return 'not';
        }
    },
    recommendEvents: async (mem) => {
        let recommendEventsRes;
        try {
            recommendEventsRes = await axios.get(`http://localhost:3001/api/event/RecommendedEvents`, { 'headers': { 'userId': `${mem._id}` } });
            return (recommendEventsRes.data.length);
        } catch (error) {
            console.log('GOT ERROR')
            console.log(error)
            return 'not';
        }
    },

    updatePartnerProfileChangePassword: async (par1) => {
        const updated = await axios.put(`http://localhost:3001/api/profile/${par1._id}`, {
            userType: "Partner",
            userID: par1._id,
            password: "new_12345_password"
        });
        return updated.data.password;
    },

    updatePartnerProfileAddBoardMembers: async (par1) => {
        const updated = await axios.put(`http://localhost:3001/api/profile/${par1._id}`, {
            userType: "Partner",
            userID: par1._id,
            boardMembers: [{
                name: "ahdthsdjskztmed",
                email: "ahmedeeeenn@dfdgsaf"
            },
            {
                name: "mama",
                email: "mamaaaAfsdgg@rgsdh"
            },
            {
                name: "mido",
                email: "wdhssdhsd@erahaERHdfZHnf"
            }]
        });
        return updated.data.boardMembers.length;
    },

    updateEventByChangingRemainingPlaces: async (event1, par1) => {
        const updated = await axios.put(`http://localhost:3001/api/event/${event1._id}`, {
            userType: "Partner",
            userID: par1._id,
            remainingPlaces: 10
        });
        return updated.data.remainingPlaces;
    },

    CreatingAnEventForPartner: async (par) => {
        var res;
        try {
            res = await axios.post(`http://localhost:3001/api/event/${par._id}/CreateEvent`, {
                userType: "Partner",
                name: "eve",
                description: "idk",
                price: "567",
                location: "bla",
                eventDate: "2019-5-10",
                eventStatus: "Submitted",
                remainingPlaces: "3",
                eventType: "warever",
                speakers: "idkkk",
                topics: "nothing",
                partner: par._id
            })
            console.log(res.data)
            return res.data
        } catch (error) {
            console.log('GOT ERROR')
            console.log(error)
            return 'not';
        }
    },

    CreatingAnEventForAdmin: async (adm) => {
        try {
            var res = await axios.post(`http://localhost:3001/api/event/${adm._id}/CreateEvent`, {
                userType: "Admin",
                name: "eve1",
                description: "idk1",
                price: "567",
                location: "bla1",
                eventDate: "2019-5-10",
                eventStatus: "Submitted",
                remainingPlaces: "3",
                eventType: "warever1",
                speakers: "idkkk1",
                topics: "nothing1"
            })
            return res.data
        } catch (error) {
            console.log('GOT ERROR')
            console.log(error)
            return 'not';
        }
    },
    GetPendingEventsForAdmin: async () => {

        try {
            res = await axios.get(`http://localhost:3001/api/event/PendingEventsAdmin`,{ 'headers': { userType: "Admin" }})
            console.log(res)
            return res

        } catch (error) {
            console.log('GOT ERROR')
            console.log(error)
            return 'not';
        }

    },


    ChangeVacStatusAdmin: async (vac) => {
        let updatedVac = "";
        try {
            updatedVac = await axios.put(`http://localhost:3001/api/vacancy/${vac._id}/status`, {
                userType: "Admin",
                status: "Open"
            });
            if (updatedVac.status != vac.status)
                return true
            else
                return false


        } catch (error) {
            console.log('GOT ERROR')
            console.log(error)
            return 'not';
        }

    },

    ChangeVacStatusPartner: async (vac) => {
        let updatedVac2 = "";
        try {
            updatedVac2 = await axios.put(`http://localhost:3001/api/vacancy/${vac._id}/status`, {
                userType: "Partner",
                status: "Closed"
            });

            if (updatedVac2.status != vac.status)
                return true
            else
                return false


        } catch (error) {
            console.log('GOT ERROR')
            console.log(error)
            return 'not';
        }

    },

    ChangeAdminName: async (admin) => {
        let updatedAdmin = "";
        try {
            updatedAdmin = await axios.put(`http://localhost:3001/api/profile/${admin._id}/name`, {
                "userType": "Admin",
                "fname": "blah",
                "lname": "blah blah"
            });

            return 'Updated';

        } catch (error) {
            console.log('GOT ERROR')
            console.log(error)
            return 'not';
        }

    },

    ChangeAdminPassword: async (admin) => {
        let updatedAdmin2 = "";
        try {
            updatedAdmin2 = await axios.put(`http://localhost:3001/api/profile/${admin._id}/password`, {
                "userType": "Admin",
                "password": "blahblahblah"
            });

            return 'Updated';


        } catch (error) {
            console.log('GOT ERROR')
            console.log(error)
            return 'not';
        }

    },
    AddingTwoCommentsToEvents: async (eve, partner, admin) => {
        let updatedEvent = "";
        try {
            await axios.post(`http://localhost:3001/api/event/${eve._id}/comment`, {
                userType: "Admin",
                userId: admin._id,
                comment: "it wasn't as good as expected"
            })
            await axios.post(`http://localhost:3001/api/event/${eve._id}/comment`, {
                userType: "Partner",
                userId: partner._id,
                comment: "i'm so sorry"
            });
            updatedEvent = await axios.get(`http://localhost:3001/api/event/Post/${eve._id}`);
            return (updatedEvent.data.commentsByAdmin.concat(updatedEvent.data.commentsByPartner).length);
        }
        catch (error) {
            console.log("errorNADA")
            return 'nothing';
        }
    },
    CreatingVacancy: async (par) => {
        try {
            await axios.post(`http://localhost:3001/api/vacancy/${par._id}/CreateVacancy`, {
                userType: "Partner",
                name: 'vacancyMadeToTest',
                description: 'testingParty',
                duration: 'DECADES',
                duration: '7 years', 
                city: 'testCity',
                dailyHours: 5,
                partner: par._id
            });          
            createdVacancy = await axios.get(`http://localhost:3001/api/vacancy/${par._id}/PendingVacancies`, {
            'headers': {
                'userType': 'Admin'
            }
            });
            return (createdVacancy.data.length);
        }
        catch (error) {
            console.log("errorNADA1")
            return 'nothing';

        }

    },
    DeletePendingVacancyReq: async (vac, par) => {
        try {

            await axios.delete(`http://localhost:3001/api/vacancy/${vac._id}/deleteVacancy`,
            {
                data: {
                    userType: "Partner",
                    userId: par._id
                }         
            });
            var pendingVac = axios.get(`http://localhost:3001/api/vacancy/${par._id}/pendingVacancies`, {
                'headers': {
                    'userType': 'Admin'
                }
            });
            return pendingVac;

        }
        catch (e){
            console.log(e);
            return "nothing";
        }

    },
    

    ViewingPendingVacancies: async (adm) => {
        try {
            vacancies = await axios.get(`http://localhost:3001/api/vacancy/${adm._id}/pendingVacancies`, {
                'headers': {
                    'userType': 'Admin'
                }
            })

            return vacancies;

        }
        catch (err) {
            console.log('error')
        }


    },

   


    createPartner: async () => {
        try {
            var res = await axios.post('http://localhost:3001/api/profile/create', {
                userType: "Partner",
                username: "ASalah6",
                password: "124",
                name: "ahmed",
                email: "ay7aga",
                workfield: "idk"
            })
            return res.data
        } catch (error) {
            console.log('GOT ERROR')
            console.log(error)
            return 'not';
        }
    },
    createMember: async () => {
        try {
            var res = await axios.post('http://localhost:3001/api/profile/create', {
                userType: "Member",
                username: 'TesterMember101',
                password: '176351',
                fname: 'john',
                lname: 'doe',
                email: 'memtesSSt@m.com',
                address: '23 IdiotTest St testCity',
                interests: ['lego', 'programming']
            })
            return res.data
        } catch (error) {
            console.log('GOT ERROR')
            console.log(error)
            return 'not';
        }
    },

    GetPendingEventsForPartner: async (par) => {
        try {
            res = await axios.get(`http://localhost:3001/api/event/${par._id}/PartnerPendingEvents`, {
                'headers': {
                    'userType': 'Partner'
                }
            })
            return res.data
        } catch (error) {
            console.log('GOT ERROR')
            console.log(error)
            return 'not';
        }
    },

    GetPendingVacanciesForPartner: async (par) => {
        try {
            res = await axios.get(`http://localhost:3001/api/vacancy/${par._id}/PartnerPendingVacancies`, {
                'headers': {
                    'userType': 'Partner'
                }
            })
            return res.data
        } catch (error) {
            console.log('GOT ERROR')
            console.log(error)
            return 'not';
        }
    },

    getnotifications: async (par) => {
        let notificationsRes;
        try {
            notificationsRes = await axios.get(`http://localhost:3001/api/notification/`, {
                'headers': {
                    userType: 'Partner', userId: par._id
                }
            })

            return notificationsRes;
        } catch (error) {
            console.log('GOT ERROR')
            console.log(error)
            return 'not';
        }
    },

    getappevents: async () => {
        let eventRes;
        try {
            eventRes = await axios.get(`http://localhost:3001/api/event/ApprovedEvents`);
            console.log(eventRes.data);
            return eventRes;
        } catch (error) {
            console.log('GOT ERROR')
            console.log(error)
            return 'not';
        }
    },

    updatevac: async (vac) => {
        let vacRes;
        try {
            vacRes = await axios.post(`http://localhost:3001/api/vacancy/${vac._id}`,{
                vacId: vac._id,
                duration: '2 light years',
                location: 'new cairo',
                description: 'IT',
                salary: 150,
                dailyhours: 8
            });
 
            return vacRes;
        } catch (error) {
            console.log('GOT ERROR')
            console.log(error)
            return 'not';
        }
    }


}

module.exports = functions;
