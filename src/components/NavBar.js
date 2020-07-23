import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {

    return (
        <div >
            <h1 className="header" >COVID-19 World Tracker</h1>

            <NavLink to="/">
                Home
            </NavLink>

            <NavLink
                to="/new">
                Create a New Collection
            </NavLink>

            <NavLink
                to="/countries">
                View all data for selected Country
            </NavLink>

        </div >
    );
}

export default NavBar;