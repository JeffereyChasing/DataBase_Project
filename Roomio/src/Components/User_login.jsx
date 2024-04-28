import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const User_login = () => {
    axios.defaults.withCredentials = true;
    const [values, setValues] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState(''); 
    const nav = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("http://localhost:3600/server/login", values)
            .then(result => {
                if (result.data.loginStatus) {
                    nav("/MainPage");
                } else {
                    setError('Incorrect username or password.');
                     // Set error message
                }
            })
            .catch(err => {
                setError('Login failed. Please try again.');
                //for fail case 
            });
    };

    const handleCreateAccount = () => {
        nav("/createAccount");
    };
    //navigate to create account page

    return (
        <div style={styles.container}>
            <div style={styles.loginBox}>
                <h1 style={styles.header}>Login Page</h1>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={{ marginBottom: "15px" }}>
                        <label style={{ marginRight: "5px" }} htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            onChange={(e) => setValues({ ...values, username: e.target.value })}
                            required
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={{ marginRight: "9px" }} htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setValues({ ...values, password: e.target.value })}
                            required
                            style={styles.input}
                        />
                    </div>
                    {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
                    <button type="submit" style={styles.button}>Login</button>
                    <p style={styles.createAccountText}>
                        <a href="#" onClick={handleCreateAccount} style={styles.createAccountLink}>Create account</a>
                    </p>
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
        backgroundImage: 'url("../assets/bg.jpg")',
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
    button: {
        padding: 10,
        backgroundColor: '#007BFF',
        color: 'white',
        border: 'none',
        borderRadius: 4,
        cursor: 'pointer',
        marginTop: 15,
        justifyContent: "center"
    },
    createAccountText: {
        textAlign: 'center',
        color: '#007BFF',
        textDecoration: 'none',
        fontWeight: 'bold',
    },
    createAccountLink: {
        color: '#007BFF',
        textDecoration: 'none',
        fontWeight: 'bold',
    }
}

export default User_login;
