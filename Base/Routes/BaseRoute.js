import express from "express";
import database from "../util/database.js";


const baserouter = express.Router();

baserouter.post("/login", (request, response) => {
    console.log(request.body)
    //get login data
    const sql = "SELECT EXISTS (SELECT 1 FROM users WHERE username = ?) AS userExists"
    database.query(sql,request.body['username'], (error, results) => {
      if (error) {
        console.error('Error executing query:', error);
      } else {
        const exists = results[0].userExists;
        //check whether there is a username in the table; we only allow the user to proceed if they do have a username in the system
        if(exists){
          
        }else{
          console.log("Wrong")
        }

        console.log('Does the username "this" exist?', exists ? 'Yes' : 'No');
      }
    });
  });
  // login-in create account

  baserouter.post("/CreateAccount",(request,response)=>{

    const sql = "INSERT INTO users (username, first_name, last_name, DOB, gender, email, Phone, passwd) VALUES (?,?,?,?,?,?,?,?)"
    var a = request.body['username']
    var b = request.body['first_name']
    var c = request.body['last_name']
    var d = request.body['DOB']
    var e = request.body['gender']
    var f = request.body['email']
    var g = request.body['phone']
    var h = request.body['passwd']

    database.query(sql,[a,b,c,d,e,f,g,h])
    // insert into the user table

    
  })
  //create account
  
  baserouter.post("/searchapartment", (request, response) => {
    console.log(request.body)
    const sql = "SELECT * FROM apartmentunit WHERE companyName = ?";

  // The value to substitute into the query placeholder
    const value = [request.body.companyname];

  // Execute the query with the parameter
    database.query(sql, value, (error, results) => {
    if (error) {
      // If an error occurs, log it and send a server error response
      console.error("Error executing the query:", error);
      return response.status(500).json({ error: "Database query failed" });
    }

    // If no error, log and send the results as the response
    console.log("Query results:", results);
   
    //response.json(results);
  });
  })
  //searchapartment(not yet)


/*
   baserouter.get('/searchapartment',(request, response) => {
    const sql =  "SELECT * FROM apartmentunit WHERE companyName = ?";
    database.query(sql, request.body['companyname'],(err, result) => {
        if(err) return response.json({Status: false, Error: "Query Error"})
        return response.json({Status: true, Result: result})
    })
})
    */

baserouter.post("/add", (request, response) => {
  console.log(request.body)
  const sql = "INSERT INTO interests (username, UnitRentID, RoommateCnt, MoveInDate) VALUES (?,?,?,?)";

  var a = request.body['username']
  var b = request.body['UnitRentID']
  var c = request.body['RoommateCnt']
  var d = request.body['MoveInDate']
 
  database.query(sql,[a,b,c,d])

});

// successfully add interest


baserouter.get('./view',(request,result)=>{
  const sql = "SELECT * FROM interests"
  database.query(sql)
})




  

export {baserouter};