const axios = require('axios');
const axios = require('axios');
const Vacancy = require('./models/vacancyModel');

const functions = {
    updateUserAdmin: async (user,adm) => {
        let outBefore;
        let outAfter;
        
        try {
          outBefore=await axios.get(`http://localhost:3000/api/profile/${user._id}`, {
            'headers': {
              'userId': `${user._id}`,
              'userType': 'Member'
            }
          });
          outAfter = await axios.put(`http://localhost:3000/api/profile/${user._id}/update`, {
            "userType": "Admin",
            "userID":`${adm._id}`,
            "membershipExpiryDate":"2002-10-31T22:00:00.000+00:00"
    
            
          });
          console.log(outAfter.data);
          return (outBefore.data.membershipExpiryDate==outAfter.data.membershipExpiryDate);
        } catch (error) {
          console.log(error)
          return 'Wrong path ?';
        }
      },
      updateUser: async (user) => {
        let outBefore;
        let outAfter;
        
        try {
          outBefore=await axios.get(`http://localhost:3000/api/profile/${user._id}`, {
            'headers': {
              'userId': `${user._id}`,
              'userType': 'Member'
            }
          });
          outAfter = await axios.put(`http://localhost:3000/api/profile/${user._id}/update`, {
            "userType": "Member",
            "userID":`${user._id}`,
            "lname":"uniqueone"
    
            
          });
          console.log(outAfter.data);
          return (outBefore.data.lname==outAfter.data.lname);
        } catch (error) {
          console.log(error)
          return 'Wrong path ?';
        }
      },
      
    AddingTwoCommentsToVacancy: async (vac, par, adm) => {
        let updatedVac = "";
        try {
            await axios.post(`http://localhost:3000/api/vacancy/${vac._id}/comment`, {
                userType: "Admin",
                userId: adm._id,
                comment: "duration is long"
            });
            await axios.post(`http://localhost:3000/api/vacancy/${vac._id}/comment`, {
                userType: "Partner",
                userId: par._id,
                comment: "i know"
            });
            updatedVac = await axios.get(`http://localhost:3000/api/vacancy/Post/${vac._id}`);
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
            await axios.put(`http://localhost:3000/api/vacancy/${vac._id}/apply`, {
                userId: mem._id
            });
            applicantsRes = await axios.get(`http://localhost:3000/api/vacancy/${vac._id}/applicants`, { 'headers': { 'userId': `${par._id}` } });
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
            returnedProfile = await axios.get(`http://localhost:3000/api/profile/${profile._id}`, { 'headers': { 'userId': `${mem._id}`, 'userType': 'Member' } });
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
            recommendVacanciesRes = await axios.get(`http://localhost:3000/api/vacancy/RecommendedVacancies`, { 'headers': { 'userId': `${mem._id}` } });
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
            recommendEventsRes = await axios.get(`http://localhost:3000/api/event/RecommendedEvents`, { 'headers': { 'userId': `${mem._id}` } });
            console.log(recommendEventsRes.data);
            return (recommendEventsRes.data.length);
        } catch (error) {
            console.log('GOT ERROR')
            console.log(error)
            return 'not';
        }
    },

    updatePartnerProfileChangePassword: async (par1) => {
        const updated = await axios.put(`http://localhost:3000/api/profile/${par1._id}`, {
            userType: "Partner",
            userID: par1._id,
            password: "new_12345_password"
        });
        return updated.data.password;
    },

    updatePartnerProfileAddBoardMembers: async (par1) => {
        const updated = await axios.put(`http://localhost:3000/api/profile/${par1._id}`, {
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
        const updated = await axios.put(`http://localhost:3000/api/event/${event1._id}`, {
            userType: "Partner",
            userID: par1._id,
            remainingPlaces: 10
        });
        return updated.data.remainingPlaces;
    },

    CreatingAnEventForPartner: async (par) => {     
        var res;   
        try {
             res = await axios.post(`http://localhost:3000/api/event/${par._id}/CreateEvent`, {
                userType: "Partner",
                name:"eve",
                description: "idk",
                price: "567",
                location: "bla",
                eventDate: "2019-5-10",
                eventStatus: "Submitted",
                remainingPlaces: "3",
                eventType: "warever",
                speakers: "idkkk",
                topics: "nothing",
                partner:  par._id
            })
            return res
        } catch (error) {
            console.log('GOT ERROR')
            console.log(error)
            return 'not';
        }
    },

    CreatingAnEventForAdmin: async (adm) => {        
        try {
            var res = await axios.post(`http://localhost:3000/api/event/${adm._id}/CreateEvent`, {
                userType: "Admin",
                name:"eve1",
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
            return res
        } catch (error) {
            console.log('GOT ERROR')
            console.log(error)
            return 'not';
        }
    },
    GetPendingEventsForAdmin: async()  => {        
        
            try {
                res =  await axios.get(`http://localhost:3000/api/event/PendingEventsAdmin`, {
                    userType: "Admin",
                    
                })
               
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
                updatedVac = await axios.put(`http://localhost:3000/api/vacancy/${vac._id}/status`, {
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
                updatedVac2 = await axios.put(`http://localhost:3000/api/vacancy/${vac._id}/status`, {
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
                updatedAdmin = await axios.put(`http://localhost:3000/api/profile/${admin._id}/name`, {
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
                updatedAdmin2 = await axios.put(`http://localhost:3000/api/profile/${admin._id}/password`, {
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
            return (updatedEvent.data.commentsByAdmin.concat(updatedEvent.data.commentsByPartner).length);
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
                dailyHours: vac.dailyHours

            });
            axios.defaults.adapter = require('axios/lib/adapters/http');
            createdVacancy = await axios.get(`http://localhost:3000/api/${vac._id}/PendingVacancies`);
            return (createdVacancy.data.length);
        }
        catch (error) {
            console.log("errorNADA1")
            return 'nothing';

        }

    },
    DeletePendingVacancyReq: async (vac,par) =>  {
        let deletingVacancy = "";
        try{

            axios.defaults.adapter = require('axios/lib/adapters/http');
            await axios.delete(`http://localhost:3000/api/vacancy/${vac._id}/deleteVacancy`, {
            userType: "Partner",
            userId: par._id
        });

        axios.defaults.adapter = require('axios/lib/adapters/http');
        var pendingVac= axios.get(`http://localhost:3000/api/vacancy/${vac._id}/PendingVacancies`);
        
        return pendingVac.data.length;

    }
    catch{
        console.log("error");
        return "nothing";
    }
    
    },
    DeletePendingEventReq: async (eve,par) =>  {
        let deletingEvent = "";
        try{

            axios.defaults.adapter = require('axios/lib/adapters/http');
            await axios.delete(`http://localhost:3000/api/event/${eve._id}/deleteEvent`, {
            userType: "Partner",
            userId: par._id
        });

        axios.defaults.adapter = require('axios/lib/adapters/http');
        var pendingEve= axios.get(`http://localhost:3000/api/vacancy/${eve._id}/PartnerPendingEvents`);
        
        return pendingEve.data.length;

    }
    catch{
        console.log("error");
        return "nothing";
    }

    },

    ViewingPendingVacancies: async (adm) => {       
        try{

            axios.defaults.adapter = require('axios/lib/adapters/http');
          vacancies=  await axios.get(`http://localhost:3000/api/vacancy/${adm._id}/pendingVacancies`, {
            userType: "Admin",
        });
        
        return vacancies.data.length;

        }
        catch(err)
        {
            console.log('error')
        }


    },

    


    getpendingvacancies: async (id) => {
            return await axios.get('http://localhost:3000/api/vacancy/'+ id)
        },
    createvacancy: async (pendingvacancy) => {

        const pendingvacancy1 = await new Vacancy(pendingvacancy)   
        pendingvacancy1.save();
    },
    getvacancy: async (pendingvacancy) => {
        
        vac = await Vacancy.findOne(pendingvacancy,'id status description duration').exec(function (err, vacancy){
            return vacancy
            })
            return vac
    },
    createevent: async ()=>{
        return await axios.post('http://localhost:3000/api/event/5c9175c03c631c0c80f077c0/CreateEvent/');
    },
    getevent: async () => {
        return axios.get('http://localhost:3000/api/event/ApprovedEvents')
        },


        createPartner: async () => {
            try {
                var res = await axios.post('http://localhost:3000/api/profile/create', {
                    userType: "Partner",
                    username: "ASalah6",
                    password: "124",
                    name: "ahmed",
                    email: "ay7aga",
                    workfield: "idk"
                })
                console.log(res)
                return res
            } catch (error) {
                console.log('GOT ERROR')
                console.log(error)
                return 'not';
            }
        },
        createMember: async () => {
            try {
                var res = await axios.post('http://localhost:3000/api/profile/create', {
                    userType: "Member",
                    username: 'TesterMember',
                    password: '176351',
                    fname: 'john',
                    lname: 'doe',
                    email: 'memtest@m.com',
                    address: '23 IdiotTest St testCity',
                    interests: ['lego', 'programming']
                })
                console.log(res)
                return res
            } catch (error) {
                console.log('GOT ERROR')
                console.log(error)
                return 'not';
            }
        },
    
        GetPendingEventsForPartner: async () => {
            try {
                res = await axios.get(`http://localhost:3000/api/event/${par._id}/PartnerPendingEvents`, {
                    userType: "Partner",
                })
                console.log(res);
                return res
            } catch (error) {
                console.log('GOT ERROR')
                console.log(error)
                return 'not';
            }
        },
    
        GetPendingVacanciesForPartner: async () => {
            try {
                res = await axios.get(`http://localhost:3000/api/vacancy/${par._id}/PartnerPendingVacancies`, {
                    userType: "Partner",
                })
                console.log(res)
                return res
            } catch (error) {
                console.log('GOT ERROR')
                console.log(error)
                return 'not';
            }
        }




}
      

module.exports = functions;
