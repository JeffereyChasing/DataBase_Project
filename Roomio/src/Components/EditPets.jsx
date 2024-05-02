import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditPets = () => {
    const { id, username,type } = useParams();
    const [pet, setPet] = useState({
        petname: "",
        pettype: "",
        petsize: "",
    });
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3600/server/pets/${username}`)
            .then(result => {
                setPet({
                    petname: result.data.Result[0].petname,
                    pettype: result.data.Result[0].pettype,
                    petsize: result.data.Result[0].petsize,
                });
            }).catch(err => console.log(err));
    }, [username]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3600/server/editpets/${username}/${id}/${type}`, pet)
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
            <h3 className="text-center mb-4">Edit Pets</h3>
            <form className="row g-3" onSubmit={handleSubmit}>
              
                <div className="col-12" style={{            marginBottom: '10px',}}>
                    <label htmlFor="petsize" className="form-label">Pet Size: </label>
                    <input
                        type="text"
                        className="form-control"
                        style={styles.input}
                        id="petsize"
                        placeholder="Enter pet size"
                        value={pet.petsize}
                        onChange={(e) => setPet({ ...pet, petsize: e.target.value })}
                    />
                </div>
                <div className="col-12" style={{            marginBottom: '10px',}}>
                    <button
                        type="submit"
                        style={styles.button}
                       
                    >Update Pet</button>
                </div>
            </form>
        </div>
    );
};

export default EditPets;
