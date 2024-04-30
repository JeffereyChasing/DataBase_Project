import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const SpecificInterest = () => {
    const {id} = useParams()
    const [unit, setUnit] = useState([]);
    const [interest, setInterest] = useState([]);

      const navigate = useNavigate()

      useEffect(()=> {
        axios.get('http://localhost:3600/server/specificinterest/'+id)
        .then(result => {
            console.log("this is from useffect",result.data.Result)
            setInterest(result.data.Result)
        }).catch(err => console.log(err))
    }, [])

    
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
    }}
    //styles

    console.log("Interest:", interest)
  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
    <p style={{textAlign:"center"}}>Interest for Unit Rent Id of {id}</p>
      <div style={styles.tableContainer}>
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>MoveInDate</th>
                                    <th style={styles.th}>RoommateCnt</th>
                                    <th style={styles.th}>UnitRentID</th>
                                    <th style={styles.th}>username</th>
                                   
                                </tr>
                            </thead>
                            
                            <tbody>
                            {interest.map((i,index) => (
                            <tr key={i.UnitRentID}>
                            <td style={styles.td}>{i.MoveInDate} </td> 
                            <td style={styles.td}>{i.RoommateCnt}</td>
                            <td style={styles.td}>{i.UnitRentID}</td>
                            <td style={styles.td}>{i.username}</td>
                             </tr>
              ))}  
                            </tbody>
                        </table>
                    </div>
    </div>
)

}



export default SpecificInterest