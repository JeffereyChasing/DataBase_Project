import express from "express";
import database from "../util/database.js";


const baserouter = express.Router();

baserouter.post("/login", (request, response) => {
    //get login data
    const sql = "SELECT EXISTS (SELECT 1 FROM users WHERE username = ? AND passwd = ? ) AS userExists"
    database.query(sql,[request.body['username'],request.body['password']], (error, result) => {
      if (error) {
        console.error('Error executing query:', error);
      } else {
        //check whether there is a username in the table; we only allow the user to proceed if they do have a username in the system
        if(result[0].userExists == 1){
          return response.json({loginStatus:true})          
        }else{
          return response.json({loginStatus:false})          
        }
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

baserouter.post("/searchapartment",(request, response) => {
    const sql =  "SELECT * FROM apartmentunit WHERE companyName = ?";
    database.query(sql, request.body['companyname'],(err, result) => {
      console.log({Result: result});
      return response.json({Status:true,Result:result})          

    })
})
//successfully search the apartment



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


baserouter.get('/view',(request,response)=>{
  const sql = "SELECT * FROM interests"
  database.query(sql,(error,result)=>{
    return response.json({Status:true,Result:result})
  })
})

//successfully show interest


baserouter.post("/pets",(request, response) => {
  const sql =  "SELECT * FROM pets WHERE username = ?";
  database.query(sql, request.body['name'],(err, result) => {
    console.log({Result: result});
    return response.json({Status:true,Result:result})          
  })
})
//for showing pets


  

export {baserouter};