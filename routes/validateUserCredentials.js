var express = require('express');
var router = express.Router();
var mongodb = require("mongodb");
var mongoClient = mongodb.MongoClient;
var dbUrl = 'mongodb://localhost:27017';
const bcrypt = require('bcrypt');
const saltRounds = 10;

/* POST method home page. */
router.post('/', function(req, res, next) {
    console.log(req.query); // get the data been passed by user through GET method
    console.log(req.body); // get the data been passed by user through POST method
    var data = {};

    mongoClient.connect(dbUrl, (error, client) => {
        if (error) {
            // error whiel connecting to db
        } else {
            var db = client.db("SmartShoppy");
            var collection = db.collection("userAccountDetails");
            // req.body.actPwd
            collection.find({accountId: req.body.userId}).toArray((error, details)=> {
                console.log("details");
                console.log(details);
                if (details.length == 1) {
                    bcrypt.compare(req.body.actPwd, details[0].accountPwd).then(function(result) {
                        if (result) { // true
                            req.session.isUserLoggedin = true;
                            req.session.isAdmin = false;
                            data.msg = 'Valid';
                            if (details[0].isAdmin) {
                                data.isAdmin = true;
                                req.session.isAdmin = true;
                            }
                        } else {
                            req.session.isUserLoggedin = false;
                            req.session.isAdmin = false;
                            data.msg = 'Invalid';
                        }
                        client.close();
                        res.send(JSON.stringify(data));
                    });
                } else {
                    req.session.isUserLoggedin = false;
                    data.msg = 'Invalid';
                    res.send(JSON.stringify(data));
                }   
            });     
        }
    });    
});
  
module.exports = router;
