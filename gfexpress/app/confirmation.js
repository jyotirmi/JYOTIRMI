var db = require('./database');
var pool = db.pool;


module.export.listConfirmationsByActivity = function(activityId,callback){

  pool.getConnection(function(err,connection){

connection.query('select id, activity_id, user_id from gf_confirmations where activity_id=?', [activityId],function(err, rows){
  connection.release(function(err){
      if(err) callback(true);
      console.log("Released the connection");

  });

  if(err){
    console.log("Error while getting the activity confirmations from database" + err.stack);
    callback(true);
    }

  //All is good return the results asynchronously
  console.log(rows);
  callback(false,rows);
 });
});
};

module.export.listConfirmationsByUser = function(userid,callback){

  pool.getConnection(function(err,connection){

connection.query('select id, activity_id, user_id from gf_confirmations where user_id=?', [userid],function(err, rows){
  connection.release(function(err){
      if(err) callback(true);
      console.log("Released the connection");

  });

  if(err){
    console.log("Error while getting the activity confirmations from database" + err.stack);
    callback(true);
    }

  //All is good return the results asynchronously
  console.log(rows);
  callback(false,rows);
 });
});
};
