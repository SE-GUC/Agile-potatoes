const DbConnectionString = "";
const TestingDbConnectionString = "";

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

module.exports = {
    getDbConnectionString,
    getTestingDbConnectionString,
    getDevelopmentPort,
    getEmailCredentials
};
