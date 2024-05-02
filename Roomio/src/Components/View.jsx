import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const View= () => {
    const [interest,setInterest] = useState([])

    useEffect(()=>{
        axios.get("http://localhost:3600/server/view")
        .then(result => {
            setInterest(result.data.Result)
            console.log(result.data)
        })
    },[])

    const nav  = useNavigate()

    const navigate =()=>{
        nav("/add")
    }

  
    return (
        <div>

                

          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>AvailableDateForMoveIn</th>
                <th style={styles.th}>BuildingName</th>
                <th style={styles.th}>CompanyName</th>
                <th style={styles.th}>MonthlyRent</th>

                <th style={styles.th}>MoveInDate</th>
                <th style={styles.th}>RoommateCnt</th>
                <th style={styles.th}>UnitRentID</th>

                <th style={styles.th}>squareFootage</th>
                <th style={styles.th}>unitNumber</th>
                <th style={styles.th}>username</th>
              </tr>
            </thead>
            <tbody>
              {interest.map(i => (
                <tr key={i.id}>
                  <td style={styles.td}>{i.AvailableDateForMoveIn}</td>
                  <td style={styles.td}>{i.BuildingName}</td>
                  <td style={styles.td}>{i.CompanyName}</td>
                  <td style={styles.td}>{i.MonthlyRent}</td>

                  <td style={styles.td}>{i.MoveInDate}</td>
                  <td style={styles.td}>{i.RoommateCnt}</td>
                  <td style={styles.td}>{i.UnitRentID}</td>
                  <td style={styles.td}>{i.squareFootage}</td>
                  <td style={styles.td}>{i.unitNumber}</td>
                  <td style={styles.td}>{i.username}</td>
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