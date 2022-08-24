var express = require('express');
var router = express.Router();
var mongoClient = require("mongodb").MongoClient;
var dburl = 'mongodb://localhost:27017';

/* GET home page. */
router.get('/', function(req, res, next) {
    mongoClient.connect(dburl, (error, client) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/JSON');
        var db = client.db("SmartShoppy");
        console.log(db);
        var collection = db.collection("userAccountDetails");
        collection.find({}).toArray((error, details) => {
            var data = {userAccountDetials: details};

            client.close();
            res.send(JSON.stringify(data));
            
        })
    });
});

module.exports = router;
