import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const View= () => {
    const [interest,setInterest] = useState([])

    useEffect(()=>{
        axios.get("http://localhost:3600/server/view")
        .then(result => {
            setInterest(result.data.Result)
        })
    },[])

    const nav  = useNavigate()

    const navigate =()=>{
        nav("/add")
    }

  
    return (
        <div>

                    <button type="submit" style={{padding: 10, backgroundColor: '#007BFF',color: 'white', border: 'none',
                    borderRadius: 4, cursor: 'pointer', marginTop: 15,marginLeft:"80vh"}} onClick={navigate}>Login</button>

          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Username</th>
                <th style={styles.th}>Unit Rent ID</th>
                <th style={styles.th}>Roommate Count</th>
                <th style={styles.th}>Move In Date</th>
              </tr>
            </thead>
            <tbody>
              {interest.map(i => (
                <tr key={i.id}>
                  <td style={styles.td}>{i.username}</td>
                  <td style={styles.td}>{i.UnitRentID}</td>
                  <td style={styles.td}>{i.RoommateCnt}</td>
                  <td style={styles.td}>{i.MoveInDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
}

const styles = {
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
    }
  };
  

export default View