import express from "express";
import database from "../util/database.js";
import bcrypt from 'bcrypt'


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
          console.log(result[0].userExists)      

          return response.json({loginStatus:true,username:request.body.username})    
        }else{
          console.log(result[0].userExists)      

          return response.json({loginStatus:false})       
   
        }
      }
    });
  });
  // login-in create account

  baserouter.post("/CreateAccount", (request, response) => {
    const sql = "INSERT INTO users (username, first_name, last_name, DOB, gender, email, Phone, passwd) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    
    bcrypt.hash(request.body.passwd, 8, (err, hash) => {
      if(err) return res.json({Status: false, Error: "Query Error"})
      var a = request.body['username'];
      var b = request.body['first_name'];
      var c = request.body['last_name'];
      var d = request.body['DOB'];
      var e = request.body['gender'];
      var f = request.body['email'];
      var g = request.body['phone'];
      var h = hash

      database.query(sql, [a, b, c, d, e, f, g, h], (error, results) => {
        if(error) return response.json({Status: false, Error: "Query Error"})
        return response.json({Status: true})
      });
      //created hash passwd
    })
    
});
  //create account

baserouter.post(`/searchapartment/:id`,(request, response) => {
  const id = request.params.id;

  const sql = "SELECT AU.UnitRentID, AU.CompanyName, AU.BuildingName, AU.unitNumber, AU.MonthlyRent, AU.squareFootage, AU.AvailableDateForMoveIn, PP.PetType, PP.PetSize, CASE WHEN PP.isAllowed THEN 'Allowed' ELSE 'Not Allowed' END AS PetPermission, PP.RegistrationFee, PP.MonthlyFee, CASE WHEN P.PetType IS NOT NULL THEN 'Yes' ELSE 'No' END AS HasPetOfType FROM ApartmentUnit AU JOIN PetPolicy PP ON AU.CompanyName = PP.CompanyName AND AU.BuildingName = PP.BuildingName LEFT JOIN Pets P ON P.PetType = PP.PetType AND P.PetSize = PP.PetSize AND P.username = ? WHERE AU.CompanyName = ? AND AU.BuildingName = ?; "

  database.query(sql, [id,request.body['companyname'],request.body['buildingname']],(err, result) => {
      return response.json({Status:true,Result:result})          

    })
})
//successfully search the apartment

baserouter.get('/pets/:id', (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM pets WHERE username = ?";
  database.query(sql,[id], (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"})
      return res.json({Status: true, Result: result})
  })
})

baserouter.put('/editpets/:id', (req, res) => {
  const id = req.params.id;
  const sql = "UPDATE pets SET petSize = ? WHERE petName = ? AND petType = ? AND username = ? "

  const values = [
      req.body.petsize,
      req.body.petname,
      req.body.pettype
  ]
  database.query(sql,[...values, id], (err, result) => {
      if(err){
        console.log(err)
      }
      return res.json({Status: true, Result: result})
  })
})


baserouter.delete('/deletepet/:id', (request, response) => {
  const id= request.params.id;
  console.log(id)
  const sql = "delete from pets where id = ?"
  database.query(sql,[id], (err, result) => {
      if(err) return response.json({Status: false, Error: "Query Error"+err})
      return response.json({Status: true, Result: result})
  })
})

//pets



baserouter.get('/specificinterest/:id', (request, response) => {
  const id = request.params.id;
  const sql = "SELECT * FROM interests WHERE UnitRentID = ?";
  database.query(sql,id, (err, result) => {
      if(err) return response.json({Status: false, Error: "Query Error"})
      return response.json({Status: true, Result: result})
  })
})
//specific interest









baserouter.post("/add/:id", (request, response) => {
  const id = request.params.id;
  const sql = "INSERT INTO interests (username, UnitRentID, RoommateCnt, MoveInDate) VALUES (?,?,?,?)";
  var b = request.body['UnitRentID']
  var c = request.body['RoommateCnt']
  var d = request.body['MoveInDate']
 
  database.query(sql,[id,b,c,d])

});
// successfully add interest

baserouter.get('/view',(request,response)=>{
  const sql = "SELECT AU.*, I.* FROM ApartmentUnit AU JOIN Interests I ON AU.UnitRentID = I.UnitRentID;"
  database.query(sql,(error,result)=>{
    return response.json({Status:true,Result:result})
  })
})
//successfully show interest

baserouter.post("/unitsearch",(request, response) => {
  const sql = "SELECT AB.CompanyName, AB.BuildingName, AB.AddrNum, AB.AddrStreet, AB.AddrCity, AB.AddrState, AB.AddrZipCode, AB.YearBuilt, AU.unitNumber, AU.MonthlyRent, AU.squareFootage, AU.AvailableDateForMoveIn, COUNT(CASE WHEN R.description LIKE '%bathroom%' THEN 1 END) AS BathroomCount, COUNT(CASE WHEN R.description LIKE '%bedroom%' THEN 1 END) AS BedroomCount, COUNT(CASE WHEN R.description LIKE '%living room%' THEN 1 END) AS LivingRoomCount, COUNT(*) AS TotalRoomCount FROM ApartmentUnit AU JOIN ApartmentBuilding AB ON AU.CompanyName = AB.CompanyName AND AU.BuildingName = AB.BuildingName LEFT JOIN Rooms R ON AU.UnitRentID = R.UnitRentID WHERE AB.BuildingName = ? AND AU.unitNumber = ? GROUP BY AU.UnitRentID;"
  database.query(sql, [request.body['buildingname'],request.body['unitnumber']],(err, result) => {
      console.log({Result: result});
      return response.json({Status:true,Result:result})          

    })
})
//successfully unit search

baserouter.post("/buildingsearch",(request, response) => {
  const sql = "SELECT AB.BuildingName, AB.AddrNum, AB.AddrStreet, AB.AddrCity, AB.AddrState, AB.AddrZipCode, AB.YearBuilt, GROUP_CONCAT(DISTINCT A.Description SEPARATOR ', ') AS AmenitiesSummary, COUNT(DISTINCT AU.UnitRentID) AS AvailableUnitsCount FROM ApartmentBuilding AB LEFT JOIN ApartmentUnit AU ON AB.CompanyName = AU.CompanyName AND AB.BuildingName = AU.BuildingName LEFT JOIN Provides P ON AB.CompanyName = P.CompanyName AND AB.BuildingName = P.BuildingName LEFT JOIN Amenities A ON P.aType = A.aType WHERE AB.BuildingName = ? GROUP BY AB.BuildingName, AB.AddrNum, AB.AddrStreet, AB.AddrCity, AB.AddrState, AB.AddrZipCode, AB.YearBuilt;  "
  database.query(sql, [request.body['buildingname']],(err, result) => {
      console.log({Result: result});
      return response.json({Status:true,Result:result})          

    })
})
//successfully unit search

baserouter.post("/addpets/:id", (request, response) => {
  console.log(request.body)
  const id = request.params.id;
  const sql = "INSERT INTO pets (PetName, PetType, PetSize, username ) VALUES (?,?,?,?)";
  
  const values = [
    request.body.petname,
    request.body.pettype,
    request.body.petsize,
]
database.query(sql,[...values, id], (err, result) => {
    if(err){
      return response.json({Status: false})
    }
    return response.json({Status: true, Result: result})
})
});








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