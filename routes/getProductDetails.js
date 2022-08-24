var express = require('express');
var router = express.Router();
var mongoClient = require("mongodb").MongoClient;
var dburl = 'mongodb://localhost:27017';

/* GET home page. */
router.get('/', function(req, res, next) {
    var data = {"productDetailsList" : []};
    mongoClient.connect(dburl, (error, client) => {
        var db = client.db("SmartShoppy");
        var collection = db.collection("productDetails");
        collection.find({}).toArray((error, details) => {
            data.productDetailsList = details;
            res.send(JSON.stringify(data));
        })
    })
});

module.exports = router;
