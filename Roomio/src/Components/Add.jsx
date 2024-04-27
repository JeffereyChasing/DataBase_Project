import React ,{useState}from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'


const Add = () => {

    const [values, setValues] = useState({
        username: "",
        UnitRentID: "", 
        RoommateCnt: "", 
        MoveInDate: ""
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("http://localhost:3600/server/add",values)
            .then(result=>{
              if(result.data.Status){
                nav("/view")
                console.log("success")
              }
            })
            .catch(err => console.log(err))
            // see what the error is
        
    };

    const nav  = useNavigate()
    const navigate =()=>{
        nav("/view")
    }
    
    return (
        <div style={styles.container}>
            <div style={styles.loginBox}>
                <h1 style={styles.header}>Post</h1>
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
                        <label style={{marginRight:"9px"}} htmlFor="UnitRentID">UnitRentID:</label>
                        <input
                            type="UnitRentID"
                            id="UnitRentID"
                            onChange={(e) => setValues({...values, UnitRentID : e.target.value})} 
                            required
                            //mandatory
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={{marginRight:"9px"}} htmlFor="RoommateCnt">RoommateCnt:</label>
                        <input
                            type="RoommateCnt"
                            id="RoommateCnt"
                            onChange={(e) => setValues({...values, RoommateCnt : e.target.value})} 
                            required
                            //mandatory
                            style={styles.input}
                        />
                    </div>
                    
                    <div style={styles.inputGroup}>
                        <label style={{marginRight:"9px"}} htmlFor="MoveInDate">MoveInDate:</label>
                        <input
                            type="MoveInDate"
                            id="MoveInDate"
                            onChange={(e) => setValues({...values, MoveInDate : e.target.value})} 
                            required
                            //mandatory
                            style={styles.input}
                        />
                    </div>



                    <button type="submit" style={{padding: 10, backgroundColor: '#007BFF',color: 'white', border: 'none',
                    borderRadius: 4,  cursor: 'pointer', marginTop: 15,justifyContent:"center"}} onClick={navigate}>Add Post</button>

                
                    


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


export default Add