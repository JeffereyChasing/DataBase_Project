import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Pets = () => {

    const [searchdata, setSearchdata] = useState({
        name:""
    })

    const [rooms, setRooms] = useState([]
     
    )

    const nav = useNavigate()
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("http://localhost:3600/server/pets",searchdata)
            .then(result=>{
              if(result.data.Status){
                setRooms(result.data.Result)
                console.log(result)
              }
            })
            .catch(err => console.log(err))
            // see what the error is
    };

 


  return (

        <div style={styles.container}>
        <div style={styles.loginBox}>
            <h1 style={styles.header}>Search For Your Pets</h1>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={{marginBottom:"15px"}}>
                    <label style={{marginRight:"5px"}} htmlFor="name">Username:</label>
                    <input
                        type="text"
                        id="name"
                        onChange={(e) => setSearchdata({...searchdata, name : e.target.value})} 
                        required
                        //mandatory
                        style={styles.input}
                    />
                </div>
               
                <button type="submit" style={{padding: 10, backgroundColor: '#007BFF',color: 'white', border: 'none',
                borderRadius: 4,  cursor: 'pointer', marginTop: 15,justifyContent:"center"}}>Search</button>
    
               
  
        <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>PetName</th>
                <th style={styles.th}>PetType</th>
                <th style={styles.th}>PetSize</th>
                <th style={styles.th}>Username</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map(i => (
                <tr key={i.id}>
                  <td style={styles.td}>{i.username}</td>
                  <td style={styles.td}>{i.PetType}</td>
                  <td style={styles.td}>{i.PetSize}</td>
                  <td style={styles.td}>{i.username}</td>
                </tr>
              ))}
            </tbody>
          </table>
    
    
            </form>
        </div>
    </div>
    );
    };
    
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
    
export default Pets