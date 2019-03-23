const getDbConnectionString = function () { // Set your connection string to mongoDB 
    return "mongodb+srv://Hassan:zizojicko24@cluster0-spbpz.mongodb.net/test?retryWrites=true";
}

const getDevelopmentPort = function () {
    return 3000 ;
}

module.exports = {
    getDbConnectionString,
    getDevelopmentPort
};
