import React ,{useState}from 'react'
import axios from "axios"
import { useNavigate,useParams } from 'react-router-dom'


const AddPets = () => {

    const {id} = useParams();

    const [values, setValues] = useState({
        petname:"",
        pettype:"",
        petsize:"",

    })

    const [message, setMessage] = useState(''); // State to store the feedback message


    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`http://localhost:3600/server/addpets/${id}`,values)
            .then(result=>{
              if(result.data.Status){
                setMessage("New Pet Added")
                nav(`/pets/${id}`)
                console.log(result.data)
              }else{
                setMessage("Failed")

              }
            })
            .catch(err => console.log(err))
            // see what the error is
        
    };

    const nav  = useNavigate()
  
    
    return (
        <div style={styles.container}>
            <div style={styles.loginBox}>
                <h1 style={styles.header}>New Pet!</h1>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={{marginBottom:"15px"}}>
                        <label style={{marginRight:"5px"}} htmlFor="petname">Pet's Name:</label>
                        <input
                            type="text"
                            id="petname"
                            onChange={(e) => setValues({...values, petname : e.target.value})} 
                            required
                            //mandatory
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={{marginRight:"10px"}} htmlFor="pettype">Pet's Type:</label>
                        <input
                            type="text"
                            id="pettype"
                            onChange={(e) => setValues({...values, pettype : e.target.value})} 
                            required
                            //mandatory
                            style={styles.input}
                        />
                    </div>

                    <div style={{marginTop:"15px"}}>
                        <label style={{marginRight:"18px"}} htmlFor="RoommateCnt">Pet's Size</label>
                        <input
                            type="petsize"
                            id="petsize"
                            onChange={(e) => setValues({...values, petsize : e.target.value})} 
                            required
                            //mandatory
                            style={styles.input}
                        />
                    </div>

                    {message && <p style={styles.message}>{message}</p>}


                    <button type="submit" style={{padding: 10, backgroundColor: '#007BFF',color: 'white', border: 'none',
                    borderRadius: 4,  cursor: 'pointer', marginTop: 15,justifyContent:"center"}} >Add new pet</button>

                
                    


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
    message: {
        color: 'red',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 15,
    },
    

}


export default AddPets