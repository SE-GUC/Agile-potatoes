const DbConnectionString = "mongodb+srv://Hassan:zizojicko24@cluster0-spbpz.mongodb.net/test?retryWrites=true";
const TestingDbConnectionString = "mongodb+srv://Hassan:zizojicko24@cluster0-spbpz.mongodb.net/Testings?retryWrites=true";


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
