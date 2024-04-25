import express from "express";

const baserouter = express.Router();

baserouter.post("/login", (request, response) => {
    console.log(request.body)
    //get login data
  });


export {baserouter};