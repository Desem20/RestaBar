import React, { Component } from 'react'
import SubmitButton from '../Form/SubmitButton'
import { connect } from 'react-redux'
import { signIn } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'


class SignIn extends Component {
    state= {
        email:'',
        password:''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSignIn = (e) => {
        e.preventDefault();
        this.props.signIn(this.state);
    }

    render() {    
        const { authError,auth } = this.props;
        if(auth.uid) return <Redirect to='/' />

        return (
            <section className="section container scrollspy" id="SignIn">
                <div className="row">
                    <div className="col s12 l4 offset-l4 grey darken-4 " style={{marginBottom: "200px"}}>
                        <form>
                            <h5 className="white-text">Sign In</h5>
                            <div className="input-field ">
                                <label htmlFor="email">Email</label>
                                <input type="email" className="white-text" id="email" onChange={this.handleChange}/>
                            </div>
                            <div className="input-field white-text">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="white-text" id="password" onChange={this.handleChange}/>
                            </div>
                            <SubmitButton handleSubmit={this.handleSignIn.bind(this)} />              
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

const mapDispatchToProps = (dispatch) => {
    return{
        signIn:(creds) => dispatch(signIn(creds))
    }
}

export default connect(mapStateToProps ,mapDispatchToProps) (SignIn)
