import React, { useState } from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const User_login = () => {

    axios.defaults.withCredentials = true;
    const [values, setValues] = useState({
        username: '',
        password: ''
    })
    //not implemented
    const nav  = useNavigate()
    //navigate to another page
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("http://localhost:3600/server/login",values)
            .then(result=>{
                if(result.data.loginStaus){
                    nav("/MainPage")
                    //need change
                }else{
                    console.log(result.data.loginStatus)
                    nav("/MainPage")
                }
            })
                
            //navigate to main page after loginin
            .catch(err => console.log(err))
            // see what the error is
        
    };




    const handleCreateAccount = () => {
        nav("/createAccount")
    };


    return (
        <div style={styles.container}>
            <div style={styles.loginBox}>
                <h1 style={styles.header}>Login Page</h1>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={{marginBottom:"15px"}}>
                        <label style={{marginRight:"5px"}} htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            onChange={(e) => setValues({...values, username : e.target.value})} 
                            required
                            //mandatory
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={{marginRight:"9px"}} htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setValues({...values, password : e.target.value})} 
                            required
                            //mandatory
                            style={styles.input}
                        />
                    </div>
                    <button type="submit" style={{padding: 10, backgroundColor: '#007BFF',color: 'white', border: 'none',
                    borderRadius: 4,  cursor: 'pointer', marginTop: 15,justifyContent:"center"}}>Login</button>

                    <p style={{textAlign: 'center', color: '#007BFF', textDecoration: 'none',fontWeight: 'bold',}}>
                         <a href="#" onClick={handleCreateAccount} style={{   color: '#007BFF', textDecoration: 'none',fontWeight: 'bold',}}>Create account</a>
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


export default User_login;
