import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditPets = () => {
    const {id} = useParams()
    const [pet, setPet] = useState({
        petname: "",
        pettype: "",
        petsize: "",
});
      const navigate = useNavigate()

      useEffect(()=> {
        axios.get('http://localhost:3600/server/pets/'+id)
        .then(result => {
            console.log("this is from useffect",result.data)
            setPet({
                ...pet,
                petname: result.data.Result[0].petname,
                pettype: result.data.Result[0].pettype,
                petsize: result.data.Result[0].petsize,
            })
        }).catch(err => console.log(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3600/server/editpets/'+id, pet)
        .then(result => {
            if(result.data.Status) {
                console.log("this is from handlesubmit",result.data)
            } else {
                console.log(result.data.Error)
            }
        }).catch(err => console.log(err))
    }
    



  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Add Pets</h3>



        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label for="petname" className="form-label">
              Pet Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="petname"
              placeholder="Enter pet name"
              value={pet.petname}
              onChange={(e) =>
                setPet({ ...pet, petname: e.target.value })
              }
            />
          </div>


          <div className="col-12">
            <label for="pettype" className="form-label">
              Pet Type
            </label>
            <input
              type="pettype"
              className="form-control rounded-0"
              id="pettype"
              placeholder="Enter type"
              autoComplete="off"
              value={pet.pettype}
              onChange={(e) =>
                setPet({ ...pet, pettype: e.target.value })
              }
            />
          </div>
          <div className='col-12'>
            <label for="petsize" className="form-label">
              Pet Size:
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="petsize"
              placeholder="Enter pet size"
              autoComplete="off"
              value={pet.petsize}
              onChange={(e) =>
                setPet({ ...pet, petsize: e.target.value })
              }
            />
          </div>
      
         
 
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Add Pets
            </button>
          </div>
        </form>






      </div>
    </div>
  )
}

export default EditPets