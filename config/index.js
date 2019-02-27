const getDbConnectionString = function () { // Set your connection string to mongoDB 
    // return "enter connection string here"
    return "mongodb+srv://AgilePotatoes:123potatoe456@mycluster-omzad.mongodb.net/lirtenDB?retryWrites=true"
}

const getDevelopmentPort = function () {
    return 3000 ;
}

module.exports = {
    getDbConnectionString,
    getDevelopmentPort
};
