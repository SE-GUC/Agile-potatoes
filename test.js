const funcs = require('./fn');
const mongoose = require('mongoose');
const config = require("./config");
mongoose.connect(config.getDbConnectionString(), {useNewUrlParser: true});

test(`New password should now be: "changed the password"`, async () => {
    expect.assertions(1)
    const response = await funcs.updatePartnerProfileChangePassword()
    console.log(response.data);
    expect(response.data.data[0].password).toEqual('changed the password')
});
