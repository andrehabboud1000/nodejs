var express = require('express');
var router = express.Router();
var url = require('url');
/* GET users listing. */
router.get('/', function (req, res, next) {
    var queryData = url.parse(req.url, true).query;
    var mysql = require('mysql');
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "logindb"
    });

    con.connect();
    con.query("select * from user where username='"+queryData.use+"' and password='"+queryData.pass+"'",function (err,rows,fields) {
        if (!err){
            if (rows.length>0){
                var login = {msg:'Thanks,login info is correct'}
                res.send(login);
            }else{
                var error = {msg:'user is not valid'}
                res.send(error);
            }
        }else{
            var error = {msg:'error cannot execute query'}
            res.send(error);
        }
    });
con.end();


});

module.exports = router;
