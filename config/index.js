const getDbConnectionString = function () { // Set your connection string to mongoDB 
    return "mongodb+srv://manar:manar-28@model-nz4dm.mongodb.net/test?retryWrites=true";
}

const getDevelopmentPort = function () {
    return 3000 ;
}

module.exports = {
    getDbConnectionString,
    getDevelopmentPort
};
