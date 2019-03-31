const DbConnectionString = "mongodb+srv://IbrahimMohammed47:123potatoe456@mycluster-omzad.mongodb.net/lirtenDB?retryWrites=true";
const TestingDbConnectionString = "mongodb+srv://IbrahimMohammed47:123potatoe456@mycluster-omzad.mongodb.net/TestlirtenDB?retryWrites=true";;


const getDbConnectionString = function () { // Set your connection string to mongoDB 
    // MUST BE CHANGED BEFORE DEPLOYMENT to DBConnectionString
    return TestingDbConnectionString;

}

const getTestingDbConnectionString = function () { // Set your connection string to mongoDB 
    return TestingDbConnectionString;
}

const getDevelopmentPort = function () {
    return 3000 ;
}

module.exports = {
    getDbConnectionString,
    getTestingDbConnectionString,
    getDevelopmentPort
};
