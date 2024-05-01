import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import pets from '../assets/pets.jpg'

const Pets = () => {
  const { id } = useParams();
  const [pet, setPet] = useState([]);
  const navigate = useNavigate();
  const nav = useNavigate()

  useEffect(() => {
    axios.get(`http://localhost:3600/server/pets/${id}`)
      .then((result) => {
        if (result.data.Status) {
          setPet(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => {
        console.error('Error fetching pets:', err);
        alert('Failed to fetch data');
      });
  }, [id]);

  

  return (
    <div style={styles.container}>

      <div style={styles.loginBox}>



        <button style={styles.editButton}>
                  <Link to={`/mainpage/${id}`} className="btn btn-info btn-sm me-2" style={styles.editButton}>
                    Go Back
                  </Link>
                  </button>


        <h3 style={{fontSize:"35px", textAlign:"center"}}>Pets List</h3>

      <Link to= {`/addpets/${id}`} className="btn btn-success" style={{fontSize:"30px",marginLeft:"100px"}}>
        Add New Pets
      </Link>
      <div style={styles.tableContainer}>
        <table className="table" style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>PetName</th>
              <th style={styles.th}>PetType</th>
              <th style={styles.th}>PetSize</th>
              <th style={styles.th}>Username</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pet.map((e, index) => (
              <tr key={index}>
                <td style={styles.td}>{e.PetName}</td>
                <td style={styles.td}>{e.PetType}</td>
                <td style={styles.td}>{e.PetSize}</td>
                <td style={styles.td}>{e.username}</td>
                <td style={styles.td}>

                  <button style={styles.editButton}>
                  <Link to={`/editpets/${e.username}/${e.PetName}`} className="btn btn-info btn-sm me-2" style={styles.editButton}>
                    Edit
                  </Link>
                  </button>
                  <button style={styles.deleteButton}>

                  <Link className="btn btn-warning btn-sm" to={`/deletepets/${e.username}/${e.PetName}/${e.PetType}`} style={styles.deleteButton}>
                    Delete
                  </Link>
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundImage: `url(${pets})`,
},
loginBox: {
    background: 'transparent',
    padding: 25,
    borderRadius: 10,
    boxShadow: '10 10 30px rgba(0, 10, 0, 0.2)',
    width: '90%',
    marginTop:"0px",
    marginLeft:"50px",


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

tableContainer: {
    maxHeight: '400px',
    overflowY: 'auto',
    margin: 'auto'
},
table: {
    width: '100%',
    marginTop:"200px",
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
    border: '3px solid #ccc',
    padding: '8px',
    textAlign: 'left',
    fontSize:"15px"

},
editButton: {
  padding: '5px 10px',
  backgroundColor: '#17a2b8', 
  color: 'white',
  borderRadius: '5px',
  textDecoration: 'none', 
  marginRight: '5px',
  transition: 'background-color 0.3s', 
},

deleteButton: {
  padding: '5px 10px',
  backgroundColor: '#ffc107', 
  color: 'white',
  borderRadius: '5px',
  textDecoration: 'none', 
  transition: 'background-color 0.3s', 
}

};

export default Pets;
