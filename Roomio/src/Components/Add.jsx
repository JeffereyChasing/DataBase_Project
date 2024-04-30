import React, { useState } from 'react';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import View from './View';

const Add = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [values, setValues] = useState({
        UnitRentID: "", 
        RoommateCnt: "", 
        MoveInDate: ""
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`http://localhost:3600/server/add/${id}`, values)
            .then(result => {
                if (result.data.Status) {
                    console.log("success");
                }
            })
            .catch(err => {
                console.log("Error:", err);
            });
    };

    return (
        <div style={styles.container}>
            <h1>View All Interests</h1>
            <div style={styles.viewContainer}>
                <View/>
            </div>

            <div style={styles.loginBox}>
                <h1 style={styles.header}>Join</h1>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={{}}>
                        <label htmlFor="UnitRentID">UnitRentID:</label>
                        <input
                            type="text"
                            id="UnitRentID"
                            value={values.UnitRentID}
                            onChange={(e) => setValues({...values, UnitRentID : e.target.value})}
                            required
                            style={{marginLeft:"10px", padding: 10,
                            border: '1px solid #ccc',
                            borderRadius: 4}}
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label htmlFor="RoommateCnt">Roommate Count:</label>
                        <input
                            type="number"
                            id="RoommateCnt"
                            value={values.RoommateCnt}
                            onChange={(e) => setValues({...values, RoommateCnt : e.target.value})}
                            required
                            style={{marginLeft:"10px", padding: 10,
                            border: '1px solid #ccc',
                            borderRadius: 4,marginTop:"15px"}}                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label htmlFor="MoveInDate">Move-In Date:</label>
                        <input
                            type="date"
                            id="MoveInDate"
                            value={values.MoveInDate}
                            onChange={(e) => setValues({...values, MoveInDate : e.target.value})}
                            required
                            style={{marginLeft:"10px", padding: 10,
                            border: '1px solid #ccc',
                            borderRadius: 4,marginTop:"15px"}}                        />
                    </div>

                    <button type="submit" style={styles.button}>Add Post</button>
                </form>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'lightgrey',
    },
    viewContainer: {
        width: '80%', 
        //small table
        height: '400px',
        overflow: 'auto', 
        //control height
        marginBottom: '10px',
    },
    loginBox: {
        background: 'white',
        padding: 25,
        borderRadius: 10,
        boxShadow: '10 10 30px rgba(0, 0, 0, 0.2)',
        width: '400px',
        marginBottom:"20px",
        height:"300px"
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
    button: {
        padding: 10,
        backgroundColor: '#007BFF',
        color: 'white',
        border: 'none',
        borderRadius: 4,
        cursor: 'pointer',
        marginTop: 15,
        justifyContent: "center",
    }
};

export default Add;
