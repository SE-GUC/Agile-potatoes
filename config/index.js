const DbConnectionString = "mongodb+srv://gskhaled:12345@cluster0-wmsit.mongodb.net/test?retryWrites=true";
const TestingDbConnectionString = "mongodb+srv://gskhaled:12345@cluster0-wmsit.mongodb.net/test?retryWrites=true";


const getDbConnectionString = function () { // Set your connection string to mongoDB 
    // MUST BE CHANGED BEFORE DEPLOYMENT to DBConnectionString
    return TestingDbConnectionString;

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
