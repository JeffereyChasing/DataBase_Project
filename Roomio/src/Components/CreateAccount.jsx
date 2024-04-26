import React,{ useState }from 'react'



const CreateAccount = () => {


    const [user,setUser] = useState({
        username:"",
        first_name:"",
        last_name:"",
        DOB:"",
        gender:"",
        email:"",
        phone:"",
        password:"",

    })

    const handleSubmit = (event) => {
        event.preventDefault();
    };
//we can assume everybody using their username and password to log-in
    
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
            onChange={(e) => setUser({ ...values, username: e.target.value })}
            required
            //mandatory
            style={styles.input}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ marginRight: "5px" }} htmlFor="username">
          first_name:
          </label>
          <input
            type="text"
            id="first_name"
            onChange={(e) => setUser({ ...values, username: e.target.value })}
            required
            //mandatory
            style={styles.input}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ marginRight: "5px" }} htmlFor="username">
            Username:
          </label>
          <input
            type="text"
            id="username"
            onChange={(e) => setUser({ ...values, username: e.target.value })}
            required
            //mandatory
            style={styles.input}
          />
        </div>


        <div style={{ marginBottom: "15px" }}>
          <label style={{ marginRight: "5px" }} htmlFor="username">
            Username:
          </label>
          <input
            type="text"
            id="username"
            onChange={(e) => setUser({ ...values, username: e.target.value })}
            required
            //mandatory
            style={styles.input}
          />
        </div>


        <div style={{ marginBottom: "15px" }}>
          <label style={{ marginRight: "5px" }} htmlFor="username">
            Username:
          </label>
          <input
            type="text"
            id="username"
            onChange={(e) => setUser({ ...values, username: e.target.value })}
            required
            //mandatory
            style={styles.input}
          />
        </div>


        <div style={{ marginBottom: "15px" }}>
          <label style={{ marginRight: "5px" }} htmlFor="username">
            Username:
          </label>
          <input
            type="text"
            id="username"
            onChange={(e) => setUser({ ...values, username: e.target.value })}
            required
            //mandatory
            style={styles.input}
          />
        </div>


        <div style={{ marginBottom: "15px" }}>
          <label style={{ marginRight: "5px" }} htmlFor="username">
            Username:
          </label>
          <input
            type="text"
            id="username"
            onChange={(e) => setUser({ ...values, username: e.target.value })}
            required
            //mandatory
            style={styles.input}
          />
        </div>






        <div style={styles.inputGroup}>
          <label style={{ marginRight: "9px" }} htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            id="password"
            onChange={(e) => setValues({ ...values, password: e.target.value })}
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
          Login
        </button>

        <p
          style={{
            textAlign: "center",
            color: "#007BFF",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          <a
            href="#"
            onClick={{handleSubmit}}
            style={{
              color: "#007BFF",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Create account
          </a>
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