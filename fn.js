const axios = require('axios');
const functions = {
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
    }
};
module.exports = functions;