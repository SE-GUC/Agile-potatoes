const getDbConnectionString = function () { // Set your connection string to mongoDB 
    return "mongodb+srv://Esraa:<mimi45211!>@cluster0-bme9n.mongodb.net/test?retryWrites=true"
}

const getDevelopmentPort = function () {
    return 3000 ;
}

module.exports = {
    getDbConnectionString,
    getDevelopmentPort
};
