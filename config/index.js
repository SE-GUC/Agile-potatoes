const DbConnectionString = "mongodb+srv://IbrahimMohammed47:123potatoe456@mycluster-omzad.mongodb.net/lirtenDB?retryWrites=true";
const TestingDbConnectionString = "";


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
