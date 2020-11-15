import React from 'react';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

const SignedInLinks = (props) => {
    return (
        <ul className="right">
            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/RestaBar'>Create/Edit RestaBar</NavLink></li>
            <li><NavLink to='/OrderStatus'>Order Status</NavLink></li>
            <li><NavLink to='/About'>About</NavLink></li>
            <li><a onClick={props.signOut}>Logout</a></li>
            <li><NavLink to='/' className="btn btn-floating pink lighten-1">
                {props.profile.initials}
            </NavLink></li>
        </ul>
    )
}

const mapDispatchToProps = (dispatch ) =>{
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinks);