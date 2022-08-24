var express = require('express');
var router = express.Router();
var mongoClient = require("mongodb").MongoClient;
var dburl = 'mongodb://localhost:27017';
const bcrypt = require('bcrypt');
const saltRounds = 10;


/* GET home page. */
router.post('/', function(req, res, next) {
    var data = {msg: '', status: 'Error'};
    mongoClient.connect(dburl, (error, client) => {
        if (error) {
            data.msg = 'Error while connecting to db';
        } else { 
            var db = client.db("SmartShoppy");
            var collection = db.collection("userAccountDetails");
            
            var findQuery = 
            {
                $or: [
                    {accountId: req.body.accountId}, 
                    {mailId: req.body.mailId}
                ]
            };
            collection.find(findQuery).toArray((error, result) => {
                if (error) {
                    data.msg = 'Error while interacting with collection';
                } else {
                    if (result.length >= 1) {
                        data.msg = 'Error'
                        data.msg = 'User id OR Mail id, already exists';
                        client.close();
                        res.send(JSON.stringify(data));
                    } else {
                        bcrypt.hash(req.body.accountPwd, saltRounds, function(err, hash) {
                            // Store hash in your password DB.

                            req.body.accountPwd = hash;
                            collection.insertOne(req.body, (error) => {
                                if (error) {
                                    data.msg = "Error while connecting to collection";
                                    data.status = 'Error';
                                } else {
                                    data.msg = ('Successfully created your account , Please login to continue');
                                    data.status = 'Success';
                                }
                                client.close();
                                res.send(JSON.stringify(data));
                            });
                        });
                       
                    }
                }
            })
        }
    });
});



module.exports = router;
