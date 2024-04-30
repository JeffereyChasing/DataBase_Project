import React, { useState } from 'react';
import { Link,useParams} from 'react-router-dom';
import { useGlobal } from '../App';
import mainpage_bg from '../assets/mainpage_bg.jpg'


const MainPage = () => {
    // State to manage hover effect
    const [hoverIndex, setHoverIndex] = useState(null);


    const {id} = useParams()

    const linkContainerStyle = {
        padding: '20px',
        borderRadius: '10px',
        backgroundColor: 'white',
        marginBottom: '10px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        transition: 'background-color 0.3s ease, box-shadow 0.3s ease, color 0.3s ease',
    };
    // Style for non-hovered items

    const linkContainerHoverStyle = {
        ...linkContainerStyle,
        backgroundColor: 'lightgrey',
        boxShadow: '0 5px 15px rgba(100,0,0,0.2)',
    };
    // Style for hovered items



    return (
        <div style={{ display: 'flex', flexDirection: 'row', height: '100vh'   }}>
            {/* Sidebar Container */}
            <div style={{ width: '300px', backgroundColor: 'grey', padding: '20px', }}>
                {[`/searchapartment/${id}`, `/pets/${id}`, `/add/${id}`, '/unitsearch','/buildingsearch',
                '/average','/interestgroup'].map((path, index) => (
                    <div
                        style={hoverIndex === index ? linkContainerHoverStyle : linkContainerStyle}
                        onMouseEnter={() => setHoverIndex(index)}
                        onMouseLeave={() => setHoverIndex(null)}
                        key={index}
                    >
                        <Link to={path} style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}>
                            {index === 0 && 'Search Certain Apartment Units'}
                            {index === 1 && 'Register Pet'}
                            {index === 2 && 'Post and View Interests'}
                            {index === 3 && 'Display Unit Info'}
                            {index === 4 && 'Display Building Info'}
                            {index === 5 && 'Estimate Monthly Rent'}
                            {index === 6 && 'Search for Interest'}

                        </Link>
                    </div>
                ))}
            </div>
            
            {/* Main Content Area */}
            <div style={{  flex: 1,
    backgroundImage: `url(${mainpage_bg})`,
    backgroundSize: 'cover',  // Cover the entire area of the div
    backgroundRepeat: 'no-repeat',  // Do not repeat the image
    backgroundPosition: 'center',  // Center the image within the div
    padding: '80px'}}>
                <h1 style={{marginLeft:"50px"}}>Welcome to the Main Page!</h1>
            </div>
        </div>
    );
}

export default MainPage;
