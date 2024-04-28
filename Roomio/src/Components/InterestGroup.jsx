import axios from "axios"
import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useLoaderData } from 'react-router-dom';

const InterestGroup = () => {


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'  
    });
  };
  
    const [unit, setUnit] = useState({
        movein: "",
        roommate:"",
    })

    const [rooms, setRooms] = useState([])



    const [name, setName] = useState({
      name:""
    })
    const [contact, setContact] = useState([])


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
        axios.post("http://localhost:3600/server/interestgroup",unit)
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
          <h1 style={styles.header}>Interest for Units 
</h1>
    
          <form onSubmit={handleSubmit} style={styles.form}>
              <div style={{marginBottom:"15px"}}>
                  <label style={{marginRight:"5px"}} htmlFor="movein">Move-in Date:</label>
                  <input
                      type="text"
                      id="movein"
                      onChange={(e) => setUnit({...unit, movein : e.target.value})} 
                      required
                      //mandatory
                      style={styles.input}
                  />
              </div>
              <button onClick={scrollToTop} style={styles.scrollButton}>Scroll to Top</button>

              <div style={styles.inputGroup}>
                  <label style={{marginRight:"9px"}} htmlFor="roommate">Roommate Count:</label>
                  <input
                      type="text"
                      id="roommate"
                      onChange={(e) => setUnit({...unit, roommate : e.target.value})} 
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
                <th style={styles.th}>username</th>
                <th style={styles.th}>DOB</th>
                <th style={styles.th}>MoveInDate</th>
                <th style={styles.th}>Phone</th>
                <th style={styles.th}>Roomate Count</th>
                <th style={styles.th}>email</th>
                <th style={styles.th}>first_name</th>
                <th style={styles.th}>last_name</th>
                <th style={styles.th}>gender</th>
                       
              </tr>
             
            </thead>

            <tbody>
              {rooms.map(i => (
                <tr key={i.id}>
                  <td style={styles.td}>{i.username} </td> 
                  <td style={styles.td}>{i.DOB}</td>
                  <td style={styles.td}>{i.MoveInDate}</td>
                  <td style={styles.td}>{i.Phone}</td>
                  <td style={styles.td}>{i.RoommateCnt} </td> 
                  <td style={styles.td}>{i.email}</td>
                  <td style={styles.td}>{i.first_name}</td>
                  <td style={styles.td}>{i.last_name}</td>
                  <td style={styles.td}>{i.gender} </td> 
                  
                </tr>
              ))}
            </tbody>

            

          

          </table>

    
     
              
      
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
      width: '10000px',
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
  },
  td: {
    border: '1px solid #ccc',
    padding: '8px',
    textAlign: 'left',
  },
  tbody:{
    padding:"300px"
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

export default InterestGroup