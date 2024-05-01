import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const DeletePets = () => {
    const { id, username,type } = useParams();
    console.log(id,username,type)
    const [pet, setPet] = useState({
        petname: "",
        pettype: "",
        petsize: "",
    });
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3600/server/deletepets/${username}/${id}/${type}`, pet)
            .then(result => {
                if (result.data.Status) {
                    navigate(`/pets/${username}`);
                } else {
                    console.error(result.data.Error);
                }
            }).catch(err => console.log(err));
    };

    const styles = {
        container: {
            maxWidth: '600px',
            margin: '40px auto',
            padding: '20px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            borderRadius: '8px',
            backgroundColor: '#fff',
        },
      
        input: {
            padding: '10px 15px',
            border: '1px solid lightgrey',
            borderRadius: '5px',
        },
        button: {
            padding: '10px 15px',
            width: '100%',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
        },
     
    };

    return (
        <div style={styles.container}>
            <h3 className="text-center mb-4">Delete Pets</h3>
            <form className="row g-3" onSubmit={handleSubmit}>
              
                <p>Are you sure you want remove {id} from our system? If not you go simply click the go back button</p>
        
                <div className="col-12" style={{            marginBottom: '10px',}}>
                    <button
                        type="submit"
                        style={styles.button}
                       
                    >Yes</button>
                </div>
            </form>
        </div>
    );
};

export default DeletePets;
