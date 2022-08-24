var express = require('express');
var router = express.Router();
var mongoClient = require("mongodb").MongoClient;
var dburl = 'mongodb://localhost:27017';

/* GET home page. */
router.post('/', function(req, res, next) {
    var data = {"msg" : ""};
    mongoClient.connect(dburl, (error, client) => {
        var db = client.db("SmartShoppy");
        var collection = db.collection("productDetails");
        collection.insertOne(req.body, (error) => {
            if (error) {
                data.msg = 'Error while inserting data';
            } else {
                data.msg = 'Succfly added product details';
            }
            res.send(JSON.stringify(data));
        })
    })
});

module.exports = router;
