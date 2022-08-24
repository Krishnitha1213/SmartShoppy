var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
    var data = {
        status: req.session.isUserLoggedin,
        isAdmin: req.session.isAdmin
    };
    data = JSON.stringify(data);
    res.send(data);

});

module.exports = router;
