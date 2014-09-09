var db =  require('./database');
var pool = db.pool;


module.exports.listActivities = function(callback){

  pool.getConnection(function(err,connection){

connection.query('select a.id, activity_name, description, min_needed, capacity, schedule,location,u.firstname owner from gf_activity a, gf_users u where u.id = a.owner', function(err, rows){
  connection.release(function(err){
      if(err) callback(true);
      console.log("Released the connection");

  });

  if(err){
    console.log("Error while getting the activity list from database" + err.stack);
    callback(true);
    }

  //All is good return the results asynchronously
  console.log(rows);
  callback(false,rows);
 });
});
};

module.exports.getActivityById = function(id,callback){

  pool.getConnection(function(err,connection){

connection.query('select a.id, activity_name, description, min_needed, capacity, schedule,location,u.firstname owner from gf_activity a, gf_users u where u.id = a.owner and a.id=?', [id],function(err, rows){
  connection.release(function(err){
      if(err) callback(true);
      console.log("Released the connection");

  });

  if(err){
    console.log("error while getting the activity from database" + err.stack);
    callback(true);
    }

  //All is good return the results asynchronously
  console.log(rows);
  callback(false,rows);
 });
});
};

module.exports.saveActivity = function(data,callback){

  pool.getConnection(function(err,connection){

connection.query('Insert into gf_activity set ? ', data, function(err, rows){
  connection.release(function(err){
      if(err) callback(true);
      console.log("Released the connection");

  });

  if(err){
    console.log("Error while saving the activity to database" + err.stack);
    callback(true);
    }

  //All is good return the results asynchronously
  console.log(rows);
  callback(false,rows);
 });
});
};

module.exports.deleteActivity = function(data,callback){

  pool.getConnection(function(err,connection){

connection.query('delete from gf_activity where id = ? ', [id], function(err, rows){
  connection.release(function(err){
      if(err) callback(true);
      console.log("Released the connection");

  });

  if(err){
    console.log("Error while deleting the activity from database" + err.stack);
    callback(true);
    }

  //All is good return the results asynchronously
  console.log(rows);
  callback(false,rows);
 });
});
};
