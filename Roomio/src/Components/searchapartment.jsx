import axios from "axios"
import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

const Searchapartment = () => {

  const [unit, setUnit] = useState({
    companyname: '',
    buildingname: ''
})


  

const nav  = useNavigate()
const handleSubmit = (event) => {
  event.preventDefault();
  axios.post("http://localhost:3600/server/searchapartment",unit)
      .then(result=>console.log(result.data),nav("/MainPage"))
      //navigate to main page after loginin
      .catch(err => console.log(err))
      // see what the error is
  
};

return (
  <div style={styles.container}>
      <div style={styles.loginBox}>
          <h1 style={styles.header}>Search for Apartment</h1>
          <form onSubmit={handleSubmit} style={styles.form}>
              <div style={{marginBottom:"15px"}}>
                  <label style={{marginRight:"5px"}} htmlFor="buildingname">Building:</label>
                  <input
                      type="text"
                      id="building"
                      onChange={(e) => setUnit({...unit, buildingname : e.target.value})} 
                      required
                      //mandatory
                      style={styles.input}
                  />
              </div>
              <div style={styles.inputGroup}>
                  <label style={{marginRight:"9px"}} htmlFor="companyname">Company:</label>
                  <input
                      type="password"
                      id="company"
                      onChange={(e) => setUnit({...unit, companyname : e.target.value})} 
                      required
                      //mandatory
                      style={styles.input}
                  />
              </div>
              <button type="submit" style={{padding: 10, backgroundColor: '#007BFF',color: 'white', border: 'none',
              borderRadius: 4,  cursor: 'pointer', marginTop: 15,justifyContent:"center"}}>Search</button>

              <p style={{textAlign: 'center', color: '#007BFF', textDecoration: 'none',fontWeight: 'bold',}}>
                   <a href="#"  style={{   color: '#007BFF', textDecoration: 'none',fontWeight: 'bold',}}>Additioanl feature</a>
              </p>
              

              


          </form>
      </div>
  </div>
);
}


const styles = {
  container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: 'lightgrey',
  },
  loginBox: {
      background: 'white',
      padding: 25,
      borderRadius: 10,
      boxShadow: '10 10 30px rgba(0, 0, 0, 0.2)',
      width: '300px',
  },
  header: {
      textAlign: 'center',
      marginBottom: 20,
  },
  form: {
      display: 'flex',
      flexDirection: 'column',
  },
  input: {
      padding: 10,
      border: '1px solid #ccc',
      borderRadius: 4,
  },
  //styles

}

export default Searchapartment