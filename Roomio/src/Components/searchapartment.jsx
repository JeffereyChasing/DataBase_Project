import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link,useLoaderData,useParams } from 'react-router-dom';
import apartment from '../assets/apartment.jpg'
const Searchapartment = () => {

    const {id} = useParams();

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    
    const [unit, setUnit] = useState({
        companyname: "",
        buildingname: "",
        username: "",
    });

    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        if (rooms.length > 0) {
            scrollToTop();
        }
    }, [rooms]);

    const nav = useNavigate();
    
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`http://localhost:3600/server/searchapartment/${id}`, unit)
            .then(result => {
                if (result.data.Status) {
                    setRooms(result.data.Result);
                    console.log(result);
                }
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div style={styles.container}>
            <div style={styles.loginBox}>
                <h1 style={styles.header}>Search for Apartment</h1>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={{ marginBottom: "15px" }}>
                        <label style={{ marginRight: "5px" }} htmlFor="buildingname">Building:</label>
                        <input
                            type="text"
                            id="building"
                            onChange={(e) => setUnit({ ...unit, buildingname: e.target.value })}
                            required
                            style={styles.input}
                        />
                    </div>
                    <button onClick={scrollToTop} style={styles.scrollButton}>Scroll to Top</button>
                    <div style={styles.inputGroup}>
                        <label style={{ marginRight: "9px" }} htmlFor="companyname">Company:</label>
                        <input
                            type="text"
                            id="company"
                            onChange={(e) => setUnit({ ...unit, companyname: e.target.value })}
                            required
                            style={styles.input}
                        />
                    </div>
                  
                    <button type="submit" style={styles.submitButton}>Search</button>
                    <p style={{ textAlign: 'center', color: '#007BFF', textDecoration: 'none', fontWeight: 'bold' }}>
                        <a href="#" style={{ color: '#007BFF', textDecoration: 'none', fontWeight: 'bold' }}>Additional feature</a>
                    </p>

                    <div style={styles.tableContainer}>
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>UnitRentID</th>

                                    <th style={styles.th}>CompanyName</th>
                                    <th style={styles.th}>BuildingName</th>
                                    <th style={styles.th}>unitNumber</th>
                                    <th style={styles.th}>MonthlyRent</th>
                                    <th style={styles.th}>squareFootage</th>
                                    <th style={styles.th}>AvailableDateForMoveIn</th>

                                    <th style={styles.th}>RegistrationFee</th>
                                    <th style={styles.th}>MonthlyFee</th>
                                    <th style={styles.th}>HasPetOfType</th>

                                    <th style={styles.th}>PetType</th>
                                    <th style={styles.th}>PetSize</th>
                                    <th style={styles.th}>PetPermission</th>
                                </tr>
                            </thead>
                            
                            <tbody>
                                {rooms.map(i => (
                                    <tr key={i.id}>
                                        <td style={styles.td}>{i.UnitRentID}
                                        <p></p>
                                        <Link to={`/specificinterest/${i.UnitRentID}`} className="btn btn-info btn-sm me-2" style={styles.editButton}>
                                            view interest
                                        </Link></td>
                                        
                                        <td style={styles.td}>{i.CompanyName}</td>
                                        <td style={styles.td}>{i.BuildingName}</td>
                                        <td style={styles.td}>{i.unitNumber}</td>
                                        <td style={styles.td}>{i.MonthlyRent}</td>
                                        <td style={styles.td}>{i.squareFootage}</td>
                                        <td style={styles.td}>{i.AvailableDateForMoveIn}</td>

                                        <td style={styles.td}>{i.RegistrationFee}</td>
                                        <td style={styles.td}>{i.MonthlyFee}</td>
                                        <td style={styles.td}>{i.HasPetOfType}</td>



                                        <td style={styles.td}>{i.PetType}</td>
                                        <td style={styles.td}>{i.PetSize}</td>
                                        <td style={styles.td}>{i.PetPermission}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
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
        backgroundImage: `url(${apartment})`,
    },
    loginBox: {
        background: 'white',
        padding: 25,
        borderRadius: 10,
        boxShadow: '10 10 30px rgba(0, 0, 0, 0.2)',
        width: '90%',
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
    inputGroup: {
        marginBottom: 15,
    },
    submitButton: {
        padding: 10,
        backgroundColor: '#007BFF',
        color: 'white',
        border: 'none',
        borderRadius: 4,
        cursor: 'pointer',
        marginTop: 15,
        justifyContent: "center",
    },
    tableContainer: {
        maxHeight: '300px',
        overflowY: 'auto',
        overflowX: 'auto',

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
}

export default Searchapartment;
