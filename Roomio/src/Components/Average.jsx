import axios from "axios"
import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useLoaderData } from 'react-router-dom';

const Average = () => {


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'  
    });
  };
  
    const [unit, setUnit] = useState({
        zipcode: "",
        bedroom:"",
        bathroom:"",
        livingroom:""
    })
    //search

    const [rooms, setRooms] = useState([])



    useEffect(() => {
      if (rooms.length > 0) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }, [rooms]);  // This effect runs every time 'rooms' changes.
  
    const nav = useNavigate()
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("http://localhost:3600/server/average",unit)
            .then(result=>{
              if(result.data.Status){
                console.log(result.data.Result)

                setRooms(result.data.Result)
              }
            },)
          
            .catch(err => console.log(err))
            // see what the error is
    };
















return (
  <div style={styles.container}>
      <div style={styles.loginBox}>
          <h1 style={styles.header}>Estimate Monthly Rent
</h1>
    
          <form onSubmit={handleSubmit} style={styles.form}>
              <div style={{marginBottom:"15px"}}>
                  <label style={{marginRight:"5px"}} htmlFor="zipcode">Zip Code:</label>
                  <input
                      type="text"
                      id="zipcode"
                      onChange={(e) => setUnit({...unit, zipcode : e.target.value})} 
                      required
                      //mandatory
                      style={styles.input}
                  />
              </div>
              <button onClick={scrollToTop} style={styles.scrollButton}>Scroll to Top</button>

              <div style={styles.inputGroup}>
                  <label style={{marginRight:"9px"}} htmlFor="roomcount">Number of Bedroom:</label>
                  <input
                      type="text"
                      id="bedroom"
                      onChange={(e) => setUnit({...unit, bedroom : e.target.value})} 
                      required
                      //mandatory
                      style={styles.input}
                  />
              </div>

              <div style={styles.inputGroup}>
                  <label style={{marginRight:"9px"}} htmlFor="roomcount">Number of Bathroom:</label>
                  <input
                      type="text"
                      id="bathroom"
                      onChange={(e) => setUnit({...unit, bathroom : e.target.value})} 
                      required
                      //mandatory
                      style={styles.input}
                  />
              </div>

              <div style={styles.inputGroup}>
                  <label style={{marginRight:"9px"}} htmlFor="roomcount">Number of Livingroom:</label>
                  <input
                      type="text"
                      id="livingroom"
                      onChange={(e) => setUnit({...unit, livingroom : e.target.value})} 
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



              <table style={styles.table} >

      
            <thead>
              <tr>
                <th style={styles.th}>UnitRentID</th>
                <th style={styles.th}>CompanyName</th>
                <th style={styles.th}>BuildingName</th>
                <th style={styles.th}>unitNumber</th>
                <th style={styles.th}>MonthlyRent</th>
                <th style={styles.th}>AvailableDateForMoveIn</th>
                <th style={styles.th}>AddrZipCode</th>
                <th style={styles.th}>Monthly Rent</th>
                <th style={styles.th}>Average Monthly Rent</th>

                <th style={styles.th}>Bathroom</th>
                <th style={styles.th}>Bedroom</th>
                <th style={styles.th}>Livingroom</th>

              </tr>
             
            </thead>

            <tbody>
              {rooms.map(i => (
                <tr key={i.id}>
                  <td style={styles.td}>{i.UnitRentID} </td> 
                  <td style={styles.td}>{i.CompanyName}</td>
                  <td style={styles.td}>{i.BuildingName}</td>
                  <td style={styles.td}>{i.unitNumber}</td>
                  <td style={styles.td}>{i.MonthlyRent} </td> 
                  <td style={styles.td}>{i.AvailableDateForMoveIn}</td>
                  <td style={styles.td}>{i.AddrZipCode}</td>
                  <td style={styles.td}>{i.MonthlyRent}</td>
                  <td style={styles.td}>{i.AverageMonthlyRent}</td>

                  <td style={styles.td}>{i.NumberOfBathrooms}</td>
                  <td style={styles.td}>{i.NumberOfBedrooms}</td>
                  <td style={styles.td}>{i.NumberOfLivingrooms}</td>

                </tr>
              ))}



                  </tbody>



            

          

          </table>

          {rooms.length === 0 && <p>There is no such room available</p>}

     
              
      
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
      width: '90vw',
  },
  header: {
      textAlign: 'center',
      marginBottom: 20,
  },
  form: {
      display: 'flex',
      flexDirection: 'column',
      height:"!000px"
  },
  input: {
      padding: 10,
      border: '1px solid #ccc',
      borderRadius: 4,
      marginBottom:"15px"
  },
  tableContainer: {
    maxHeight: '300px',
    overflowY: 'auto',
    margin: 'auto'
},
table: {
    width: '100%',
    borderCollapse: 'collapse',
},
th: {
    background: '#f4f4f4',
    color: '#333',
    fontWeight: 'bold',
    border: '1px solid #ccc',
    padding: '8px',
    textAlign: 'left',
    fontSize:"11px"
},
td: {
    border: '1px solid #ccc',
    padding: '8px',
    textAlign: 'left',
    fontSize:"11px"

},
  scrollButton: {
    position: 'fixed',
    right: 20,
    bottom: 20,
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer'
  }
  //styles

}

export default Average