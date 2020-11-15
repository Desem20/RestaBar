import React, { Component } from 'react'
import SubmitButton from '../Form/SubmitButton'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { signUp } from '../../store/actions/authActions'

class SignUp extends Component {
    state= {
        email:'',
        password:'',
        FirstName:'',
        LastName:''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSignUp = (e) => {
        e.preventDefault();
        this.props.signUp(this.state);
    }

    render() {
        const { auth, authError } = this.props;
        if(auth.uid) return <Redirect to='/' />
        return (
            <section className="section container scrollspy" id="SignIn">
                <div className="row">
                    <div className="col s12 l4 offset-l4 grey darken-4 "  style={{marginBottom: "150px"}}>
                        <form >
                            <h5 className="white-text">Sign Up</h5>

                            <div className="input-field ">
                                <label htmlFor="FirstName">First Name</label>
                                <input type="text" className="white-text" id="FirstName" onChange={this.handleChange}/>
                            </div>

                            <div className="input-field ">
                                <label htmlFor="LastName">Last Name</label>
                                <input type="text" className="white-text" id="LastName" onChange={this.handleChange}/>
                            </div>


                            <div className="input-field ">
                                <label htmlFor="email">Email</label>
                                <input type="email" className="white-text" id="email" onChange={this.handleChange}/>
                            </div>
                            <div className="input-field white-text">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="white-text" id="password" onChange={this.handleChange}/>
                            </div>
                            <SubmitButton handleSubmit={this.handleSignUp.bind(this)} />              
                            <div className="center red-text">
                                { authError ? <p>{authError}</p> : null }
                            </div>
                        </form>
                    </div>
                </div>       
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      authError: state.auth.authError,
      auth:state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch)=> {
    return {
      signUp: (creds) => dispatch(signUp(creds))
    }
  }
export default connect(mapStateToProps,mapDispatchToProps)(SignUp)
