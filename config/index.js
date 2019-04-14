const DbConnectionString = "mongodb+srv://darknsSs512:3350446dark@lirtenhubp-ugo0u.mongodb.net/lirtenhubp?retryWrites=true";
const TestingDbConnectionString = "mongodb+srv://darknsSs512:3350446dark@lirtenhubp-ugo0u.mongodb.net/lirtenhubp?retryWrites=true";


const getDbConnectionString = function () { // Set your connection string to mongoDB 
    // MUST BE CHANGED BEFORE DEPLOYMENT to DBConnectionString
    return DbConnectionString;

}

const getTestingDbConnectionString = function () { // Set your connection string to mongoDB 
    return TestingDbConnectionString;
}

const getDevelopmentPort = function () {
    return 3001 ;
}

module.exports = {
    getDbConnectionString,
    getTestingDbConnectionString,
    getDevelopmentPort
};
