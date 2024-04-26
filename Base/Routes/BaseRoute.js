import express from "express";
import database from "../util/database.js";
import { useNavigate } from 'react-router-dom.js'


const baserouter = express.Router();
const nav  = useNavigate()

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
          nav('/MainPage')
          
        }

        console.log('Does the username "this" exist?', exists ? 'Yes' : 'No');
      }
    });
  });




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

export {baserouter};