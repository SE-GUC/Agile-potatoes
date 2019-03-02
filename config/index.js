const getDbConnectionString = function () { // Set your connection string to mongoDB 
    return "mongodb+srv://Islam98:<1871998>@lirtenhub-qoiuq.mongodb.net/test?retryWrites=true" ;
}

const getDevelopmentPort = function () {
    return 3000 ;
}

module.exports = {
    getDbConnectionString,
    getDevelopmentPort
};
