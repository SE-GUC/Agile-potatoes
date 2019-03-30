const axios = require('axios');
const Partner = require('./models/partnerModel');
const functions = {

    updatePartnerProfileChangePassword: async () => {
        const partnerProfile = new Partner({
            username: "test123779",
            password: "5437536876745",
            name: "dfhjfjjsdf",
            email: "djggxfyjgszgfjtesting!!@testing.com",
            worfield: "to test se project"
        });
        await partnerProfile.save(function (err, p) {
            if (err) throw err;
        });
        const updated = await axios.put(`http://localhost:3000/api/profile/${partnerProfile._id}`, {
            userType: "Partner",
            userID: partnerProfile._id,
            password: "changed the password"
        });
        return updated;
    }
};

module.exports = functions;