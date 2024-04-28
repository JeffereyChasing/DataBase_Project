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
    const sql =  "SELECT 
    au.UnitRentID,au.unitNumber,au.MonthlyRent,au.squareFootage,au.AvailableDateForMoveIn,MAX(CASE WHEN p.PetType = 'Dog' THEN CASE WHEN pp.isAllowed THEN 'Allowed' ELSE 'Not Allowed' END END) AS DogAllowed,MAX(CASE WHEN p.PetType = 'Cat' THEN CASE WHEN pp.isAllowed THEN 'Allowed' ELSE 'Not Allowed' END END) AS CatAllowed,MAX(CASE WHEN p.PetType = 'Bird' THEN CASE WHEN pp.isAllowed THEN 'Allowed' ELSE 'Not Allowed' END END) AS BirdAllowed, MAX(CASE WHEN p.PetType = 'Turtle' THEN CASE WHEN pp.isAllowed THEN 'Allowed' ELSE 'Not Allowed' END END) AS TurtleAllowed,
    MAX(CASE WHEN p.PetType = 'Rodent' THEN CASE WHEN pp.isAllowed THEN 'Allowed' ELSE 'Not Allowed' END END) AS RodentAllowed FROM 
    ApartmentUnit au
LEFT JOIN 
    PetPolicy pp ON au.CompanyName = pp.CompanyName AND au.BuildingName = pp.BuildingName
LEFT JOIN 
    Pets p ON pp.PetType = p.PetType AND pp.PetSize = p.PetSize AND p.username = ?
WHERE 
    au.CompanyName = ? AND
    au.BuildingName = ?
GROUP BY 
    au.UnitRentID,
    au.unitNumber,
    au.MonthlyRent,
    au.squareFootage,
    au.AvailableDateForMoveIn;
";  
    database.query(sql, [request.body['companyname'],request.body['buildingname'],request.body['username']],(err, result) => {
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

baserouter.post("/interestgroup",(request, response) => {
  const sql =  "SELECT u.*, i.MoveInDate, i.RoommateCnt FROM Users u JOIN Interests i ON u.username = i.username WHERE i.MoveInDate = ? AND i.RoommateCnt = ?;";
  database.query(sql,[ request.body['movein'],request.body['roommate']],(err, result) => {
    console.log({Result: result});
    return response.json({Status:true,Result:result})          
  })
})
//additionall feature: select interest

  

baserouter.post("/average",(request, response) => {
  console.log(request.body)
  const sql =  "SELECT DISTINCT au.UnitRentID, au.CompanyName, au.BuildingName, au.unitNumber, au.MonthlyRent, au.squareFootage, au.AvailableDateForMoveIn, ab.AddrZipCode, room_counts.NumberOfRooms, AVG(au.MonthlyRent) OVER (PARTITION BY ab.AddrZipCode, room_counts.NumberOfRooms) AS AverageMonthlyRentPerRoomCountZip FROM ApartmentUnit au JOIN ApartmentBuilding ab ON au.CompanyName = ab.CompanyName AND au.BuildingName = ab.BuildingName LEFT JOIN (   SELECT UnitRentID, COUNT(UnitRentID) AS NumberOfRooms FROM Rooms GROUP BY UnitRentID) room_counts ON au.UnitRentID = room_counts.UnitRentID LEFT JOIN Rooms r  ON au.UnitRentID = r.UnitRentID WHERE ab.AddrZipCode = 98011 AND room_counts.NumberOfRooms = 5;";
 
    database.query(sql,[ request.body['zipcode'],request.body['roomcount']],(err, result) => {
    console.log({Result: result});
    return response.json({Status:true,Result:result})          
  })
})
//additionall feature: select interest




export {baserouter};