import React from 'react';
import { NavLink } from 'react-router-dom'

const SignedOutLinks = () => {
    return (
        <ul className="right">
             <li><NavLink to='/Home'>Home</NavLink></li>
            <li><NavLink to='/About'>About</NavLink></li>
            <li><NavLink to='/SignIn'>Sign In</NavLink></li>
            <li><NavLink to='/SignUp'>Sign Up</NavLink></li>        
        </ul>
    )
}


export default SignedOutLinks;