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
    //salt and hash password

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

baserouter.put('/editpets/:username/:id', (request, response) => {
  const id = request.params.id;
  const username = request.params.username;
  const sql = "UPDATE pets SET petName = ?, petType = ?, petSize = ?,username = ? WHERE petName = ? AND username = ? "
  const values = [
      request.body.petname,
      request.body.pettype,
      request.body.petsize,
      username,
      id,
      username
  ]
  database.query(sql,[...values, id], (err, result) => {
    console.log(result)
      if(err){
        console.log(err)
      }
      return response.json({Status: true, Result: result})
  })
})


baserouter.put('/deletepets/:username/:id/:type', (request, response) => {
  const id = request.params.id;
  const username = request.params.username;
  const type = request.params.type;
  const sql = "DELETE FROM pets WHERE petName = ? AND username = ? AND petType = ?"
  const values = [
      id,
      username,
      type
  ]
  database.query(sql,[...values, id], (err, result) => {
    console.log(result)
      if(err){
        console.log(err)
      }
      return response.json({Status: true, Result: result})
  })
})





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
  const sql = "SELECT AU.*, I.* FROM ApartmentUnit AU JOIN Interests I ON AU.UnitRentID = I.UnitRentID ORDER BY AU.UnitRentID ASC;"
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



baserouter.post("/interestgroup/1",(request, response) => {
  const sql =  "SELECT u.*, i.MoveInDate, i.RoommateCnt FROM Users u JOIN Interests i ON u.username = i.username WHERE i.MoveInDate = ?;";
  database.query(sql,[ request.body['movein']],(err, result) => {
    console.log({Result: result});
    return response.json({Status:true,Result:result})          
  })
})
//additionall feature: select interest


baserouter.post("/interestgroup/2",(request, response) => {
  const sql =  "SELECT u.*, i.MoveInDate, i.RoommateCnt FROM Users u JOIN Interests i ON u.username = i.username WHERE i.RoommateCnt = ?;";
  database.query(sql,[ request.body['roommate']],(err, result) => {
    console.log({Result: result});
    return response.json({Status:true,Result:result})          
  })
})
//additionall feature: select interest




  

baserouter.post("/average",(request, response) => {
  console.log(request.body)
  const sql = "SELECT au.UnitRentID, au.CompanyName, au.BuildingName, au.unitNumber, au.MonthlyRent, au.squareFootage, au.AvailableDateForMoveIn, ab.AddrZipCode, MonthlyRent, SUM(CASE WHEN r.name LIKE 'bathroom%' THEN 1 ELSE 0 END) AS NumberOfBathrooms, SUM(CASE WHEN r.name LIKE 'bedroom%' THEN 1 ELSE 0 END) AS NumberOfBedrooms, SUM(CASE WHEN r.name LIKE 'livingroom%' THEN 1 ELSE 0 END) AS NumberOfLivingrooms, AVG(au.MonthlyRent) OVER () AS AverageMonthlyRent FROM ApartmentUnit au JOIN ApartmentBuilding ab ON au.CompanyName = ab.CompanyName AND au.BuildingName = ab.BuildingName JOIN Rooms r ON au.UnitRentID = r.UnitRentID WHERE ab.AddrZipCode = ? GROUP BY au.UnitRentID, au.CompanyName, au.BuildingName, au.unitNumber, au.MonthlyRent, au.squareFootage, au.AvailableDateForMoveIn, ab.AddrZipCode HAVING SUM(CASE WHEN r.name LIKE 'bathroom%' THEN 1 ELSE 0 END) = ? AND SUM(CASE WHEN r.name LIKE 'bedroom%' THEN 1 ELSE 0 END) = ? AND SUM(CASE WHEN r.name LIKE 'livingroom%' THEN 1 ELSE 0 END) = ?;  "
    database.query(sql,[ request.body['zipcode'],request.body['bathroom'],request.body['bedroom'],request.body['livingroom']],(err, result) => {
    console.log({Result: result});
    return response.json({Status:true,Result:result})          
  })
})
//additionall feature: select interest




export {baserouter};