import React,{ useState }from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'


const CreateAccount = () => {
    const [user,setUser] = useState({
        username:"",
        first_name:"",
        last_name:"",
        DOB:"",
        gender:"",
        email:"",
        phone:"",
        passwd:"",

    })

    const nav  = useNavigate()

    //maintain and update all account informaiton
    const handleSubmit = (event) => {
      event.preventDefault();
      axios.post("http://localhost:3600/server/CreateAccount",user)
          .then(result=>{
            if(result.data.Status){
              nav("/MainPage")
              console.log("success")
            }
          })
          .catch(err => console.log(err))
          // see what the error is
      
  };

    
  return (
    <div>
      <form onSubmit={handleSubmit} style={styles.form}>


        <div style={{ marginBottom: "15px" }}>
          <label style={{ marginRight: "5px" }} htmlFor="username">
            Username:
          </label>
          <input
            type="text"
            id="username"
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            required
            //mandatory
            style={styles.input}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ marginRight: "5px" }} htmlFor="first_name">
          first_name:
          </label>
          <input
            type="text"
            id="first_name"
            onChange={(e) => setUser({ ...user, first_name: e.target.value })}
            required
            //mandatory
            style={styles.input}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ marginRight: "5px" }} htmlFor="last_name">
            last_name:
          </label>
          <input
            type="text"
            id="last_name"
            onChange={(e) => setUser({ ...user, last_name: e.target.value })}
            required
            //mandatory
            style={styles.input}
          />
        </div>


        <div style={{ marginBottom: "15px" }}>
          <label style={{ marginRight: "5px" }} htmlFor="DOB">
            DOB:
          </label>
          <input
            type="text"
            id="DOB"
            onChange={(e) => setUser({ ...user, DOB: e.target.value })}
            required
            //mandatory
            style={styles.input}
          />
        </div>


        <div style={{ marginBottom: "15px" }}>
          <label style={{ marginRight: "5px" }} htmlFor="gender">
            gender:
          </label>
          <input
            type="text"
            id="gender"
            onChange={(e) => setUser({ ...user, gender: e.target.value })}
            required
            //mandatory
            style={styles.input}
          />
        </div>


        <div style={{ marginBottom: "15px" }}>
          <label style={{ marginRight: "5px" }} htmlFor="email">
            email:
          </label>
          <input
            type="text"
            id="email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
            //mandatory
            style={styles.input}
          />
        </div>


        <div style={{ marginBottom: "15px" }}>
          <label style={{ marginRight: "5px" }} htmlFor="phone">
            Phone:
          </label>
          <input
            type="text"
            id="phone"
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
            required
            //mandatory
            style={styles.input}
          />
        </div>



        <div style={styles.inputGroup}>
          <label style={{ marginRight: "9px" }} htmlFor="passwd">
            Password:
          </label>
          <input
            type="password"
            id="passwd"
            onChange={(e) => setUser({ ...user, passwd: e.target.value })}
            required
            //mandatory
            style={styles.input}
          />
        </div>



















        <button
          type="submit"
          style={{
            padding: 10,
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
            marginTop: 15,
            justifyContent: "center",
          }}
        >
          Create Account
        </button>

        <p
          style={{
            textAlign: "center",
            color: "#007BFF",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          
        </p>
      </form>
    </div>
  );
}


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
export default CreateAccount