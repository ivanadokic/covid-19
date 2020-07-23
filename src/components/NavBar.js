import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const NavBar = () => {

    return (
        <div style={{ paddingBottom: '15px', marginBottom: '15px' }}>
            <h1 className="header" >COVID-19 World Tracker</h1>

            <NavLink
                to="/">
                <button className="nav">Home</button>
            </NavLink>

            <NavLink
                to="/new">
                <button className="nav">Create a New Collection</button>
            </NavLink>
            <NavLink
                to="/countries">
                <button className="nav">View all data for selected Country</button>
            </NavLink>

        </div>
    );
}

export default NavBar;