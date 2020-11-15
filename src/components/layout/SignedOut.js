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
            <li><NavLink to='/'>About</NavLink></li>
            <li><NavLink to='/'>Contact</NavLink></li>
            <li><NavLink to='/'>SignUp</NavLink></li>
            <li><NavLink to='/'>Login</NavLink></li>          
        </ul>
    )
}

export default SignedOut;