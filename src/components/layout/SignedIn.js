import React from 'react';
import { NavLink } from 'react-router-dom'

const SignedOut = () => {
    return (
        <ul className="right">
            <li><NavLink to='/'>
                <span >home</span>
                <i className="material-icons left homeIcon">home</i>
            </NavLink></li>
            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/'>Create/Edit RestaBar</NavLink></li>
            <li><NavLink to='/'>Order Status</NavLink></li>
            <li><NavLink to='/'>About</NavLink></li>
            <li><NavLink to='/'>Logout</NavLink></li>
            <li><NavLink to='/' className="btn btn-floating pink lighten-1">NN</NavLink></li>
        </ul>
    )
}

export default SignedOut;