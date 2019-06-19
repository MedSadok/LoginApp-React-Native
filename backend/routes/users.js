var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'',
  database:'users'
});

/* GET users listing. */
router.post('/', function(req, res, next) {

  var password = req.body.password;
  var email = req.body.email;
  connection.query("SELECT * FROM user WHERE password = ? AND email = ? ", [ password, email ], function(err, row, fields){
    if(err) console.log(err);

    if(row.legnth > 0 ){
      res.send({'success' : true, 'message': row[0].email});
    } else {
      res.send({'success': false, 'message': 'User not found, please try again'});
    }

  })
});

module.exports = router;
