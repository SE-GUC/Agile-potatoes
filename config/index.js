const DbConnectionString = "mongodb+srv://IbrahimMohammed47:123potatoe456@mycluster-omzad.mongodb.net/lirtenDB?retryWrites=true";
const TestingDbConnectionString = "mongodb+srv://IbrahimMohammed47:123potatoe456@mycluster-omzad.mongodb.net/lirtenDB?retryWrites=true";
const secret = 'this_secret_is_the_most_powerful_secret_of_all_TIME_..._HUNDRED_PERCENT_CONFIRMED'

const EmailCredentials = {
    gmail: 'agilePotatoesForLirten@gmail.com',
    password: 'WasIstDasNaniii'
}

const getDbConnectionString = function () { // Set your connection string to mongoDB 
    // MUST BE CHANGED BEFORE DEPLOYMENT to DBConnectionString
    return DbConnectionString;

}

const getTestingDbConnectionString = function () { // Set your connection string to mongoDB 
    return TestingDbConnectionString;
}

const getDevelopmentPort = function () {
    return 3001;
}

const getEmailCredentials = function () {
    return (EmailCredentials)
}

const getJWTsecret = function () {
    return secret;
}
module.exports = {
    getDbConnectionString,
    getTestingDbConnectionString,
    getDevelopmentPort,
    getEmailCredentials,
    getJWTsecret
};
