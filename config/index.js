const getDbConnectionString = function () { // Set your connection string to mongoDB 
    return "mongodb+srv://gskhaled:12345@cluster0-wmsit.mongodb.net/test?retryWrites=true";
}

const getDevelopmentPort = function () {
    return 3000 ;
}

module.exports = {
    getDbConnectionString,
    getDevelopmentPort
};
