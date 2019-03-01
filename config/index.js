const getDbConnectionString = function () { // Set your connection string to mongoDB 
    return "mongodb://gskhaled:12345@cluster0-shard-00-00-wmsit.mongodb.net:27017,cluster0-shard-00-01-wmsit.mongodb.net:27017,cluster0-shard-00-02-wmsit.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true"
}

const getDevelopmentPort = function () {
    return 3000 ;
}

module.exports = {
    getDbConnectionString,
    getDevelopmentPort
};
