var mysql = require("mysql");


//db setup
var pool = mysql.createPool({
  connectionLimit : 10,
  host: '50.63.244.202',
  user: 'kuleradbuser1',
  password : 'Welcome!23',
  database : "kuleradbuser1",
  port : 3306,

});


module.exports.getUsers = function(callback){
  pool.getConnection(function(err,connection){

  connection.query('select id, firstname, lastname, email from gf_users', function(err, rows){
    connection.release(function(err){
        if(err) callback(true);
        console.log("Released the connection");

    });

    if(err){
      console.log("Issues connecting to database" + err.stack);
      callback(true);
      }

    //All is good return the results asynchronously
    console.log(rows);
    callback(false,rows);
   });
 });
};

module.exports.editUser = function(data, callback){
  pool.getConnection(function(err,connection){

  var id = data.id;
  connection.query('update gf_users set ? where id =?', [data, id], function(err, rows){
    connection.release(function(err){
        if(err) callback(true);
        console.log("Released the connection");

    });

    if(err){
      console.log("Issues updating user to database" + err.stack);
      callback(true);
      }

    //All is good return the results asynchronously
    console.log(rows);
    callback(false);
   });
 });
};


module.exports.saveUser = function(data, callback){

  pool.getConnection(function(err,connection){

  connection.query('insert into gf_users set ?', data, function(err, rows){
    connection.release(function(err){
        if(err) callback(true);
        console.log("Released the connection");

    });

    if(err){
      console.log("Issues inserting user to database" + err.stack);
      callback(true);
      }

    //All is good return the results asynchronously
    console.log(rows);
    callback(false);
   });
 });
};


module.exports.deleteUser = function(id, callback){
  pool.getConnection(function(err,connection){


  connection.query('delete from gf_users where id = ?', [id], function(err, rows){
    connection.release(function(err){
        if(err) callback(true);
        console.log("Released the connection");

    });

    if(err){
      console.log("Issues inserting user to database" + err.stack);
      callback(true);
      }

    //All is good return the results asynchronously
    console.log(rows);
    callback(false);
   });
 });
};


module.exports.pool = pool;
