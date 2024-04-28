import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MainPage = () => {
    // State to manage hover effect
    const [hoverIndex, setHoverIndex] = useState(null);

    // Style for non-hovered items
    const linkContainerStyle = {
        padding: '20px',
        borderRadius: '10px',
        backgroundColor: 'white',
        marginBottom: '10px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        transition: 'background-color 0.3s ease, box-shadow 0.3s ease, color 0.3s ease',
    };

    // Style for hovered items
    const linkContainerHoverStyle = {
        ...linkContainerStyle,
        backgroundColor: 'skyblue',
        boxShadow: '0 5px 15px rgba(100,0,0,0.2)',
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
            {/* Sidebar Container */}
            <div style={{ width: '300px', backgroundColor: '#4A90E2', padding: '20px' }}>
                {['/searchapartment', '/registerpet', '/add', '/buildingunitinfor','/average','/interestgroup'].map((path, index) => (
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
                            {index === 3 && 'Display Unit and Building Info'}
                            {index === 4 && 'Estimate Monthly Rent'}
                            {index === 5 && 'Search for Interest'}

                        </Link>
                    </div>
                ))}
            </div>
            
            {/* Main Content Area */}
            <div style={{ flex: 1, backgroundColor: '#E5E5E5', padding: '100px' }}>
                <h1>Welcome to the Main Page!</h1>
            </div>
        </div>
    );
}

export default MainPage;
