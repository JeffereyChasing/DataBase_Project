import React from 'react'
import {Link} from 'react-router-dom'

const MainPage = () => {

    return (
      <div>
        <div>
          <div style={{display:'flex',flexDirection:"row", height:"100vh",padding:"100px",backgroundColor:"grey",}}>
            <div style={{width:"300px", height:"300px", backgroundColor:"skyblue",padding:"70px",borderRadius:"30px"}}>
              <Link to="/searchapartment">Search Certain Apartment Units</Link>
            </div>
            <div style={{width:"300px", height:"300px", backgroundColor:"green",padding:"70px",borderRadius:"30px"}}>
            <Link to="/registerpet">Register Pet</Link>
            </div>
            <div style={{width:"300px", height:"300px", backgroundColor:"skyblue",padding:"70px",borderRadius:"30px"}}>
            <Link to="/add">Post and View Interests</Link>
            </div>
            <div style={{width:"300px", height:"300px", backgroundColor:"skyblue",padding:"70px",borderRadius:"30px"}}>
            <Link to="/buildingunitinfor">Display Unit and Building Info</Link>
            </div>

          </div>
        </div>
      </div>
    );


}

export default MainPage;
