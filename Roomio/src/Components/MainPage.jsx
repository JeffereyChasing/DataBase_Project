import React from 'react'
import {Link} from 'react-router-dom'

const MainPage = () => {

    return (
      <div>
        <div>
          <div style={{display:'flex',flexDirection:"column", height:"100vh",padding:"100px",backgroundColor:""}}>
            <Link to="/searchapartment">Search Certain Apartment Units</Link>
            <Link to="/registerpet">Register Pet</Link>
            <Link to="/addPost">Post and View Interests</Link>
            <Link to="/buildingunitinfor">Display Unit and Building Info</Link>
          </div>
        </div>
      </div>
    );


}

export default MainPage;
