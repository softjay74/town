import React from 'react'
import {connect} from 'react-redux'
import {Grid, Col} from 'react-bootstrap'
import {actionCreator as UserAction} from 'redux/modules/user'
import './App.css';

const CheckError = (state, ownProps) => {
    const{ error } = state;
    return{
        error : error.error
    }
}

const mapDispatchToProp = (dispatch, ownProp) =>{
    return {
        signup  : (username, fullname, password1, password2,  email) => {
            dispatch(UserAction.signup(username, fullname, password1, password2,  email))
        }
    }
}

class SignupForm extends React.Component{
    
    state = {
        username :"",
        usernameError : "",
        fullname :"",
        nameError : "",
        email :"",
        emailError : "",
        password1 :"",
        password1Error : "",
        password2 :"",
        password2Error : "",
    }
    

    handleInputChange = event =>{
        const { target : {name, value} } = event
        this.setState({
            [name] : value
        })
    }
    

    formSubmit = event =>{
        
        this.setState({
            usernameError : "",
            fullnameError : "",
            emailError : "",
            password1Error : "",
            password2Error : "",
        })
        const { signup } = this.props
        
        const {username, fullname, email, password1, password2,usernameError, fullnameError, emailError, password1Error, password2Error } = this.state
        //console.log(username, fullname, email, password1, password2)

        if (username.length < 4){
            this.setState({
                usernameError : "username needs to be at least 5 characters long"
            })
        }
        if (!fullname){
            this.setState({
                fullnameError : "Full name is required"
            })
        }
        if(!email.includes("@")){
            this.setState({
                emailError : "Requires valid email"
            })
        }

        if (password1 < 6){
            this.setState({
                password1Error : "password required"
            })    
        }

        if (password1 !== password2) {
            this.setState({
                password2Error : "Passwords does not match"
            })
        }
        if (!usernameError && !fullnameError && !emailError && !password1Error && !password2Error){
            signup(username, fullname, password1, password2,  email)
        } 
        
    }

    render(){


        return(
            <Grid>
                <Col lg={4} lgOffset={4} className="text-center">                
                    <div className="title">
                        <img src={"http://www.seattlen.com/images/logo1.png"} alt="" />
                        <br/>
                        Create a New Account 
                    </div>
                    <p>It's free and always will be.</p>
                    <span className="error">
                    { this.props.error.username && this.props.error.username.map(error => error , <br/>) }
                    { this.props.error.password1 && this.props.error.password1.map(error => error , <br/>) }
                    { this.props.error.email && this.props.error.email.map(error => error , <br/>) }
                    </span>
                    <form>
                    <input type="text" name="username" placeholder="User Name" className="form-control" value={this.state.username} onChange={this.handleInputChange}/>
                    <span className="error">{this.state.usernameError}</span>
                    <input type="text" name="fullname" placeholder="Full Name" className="form-control"  value={this.state.fullname} onChange={this.handleInputChange}/>
                    <span className="error">{this.state.fullnameError}</span>
                    
                    <input type="text" name="email" placeholder="Email" className="form-control"  value={this.state.email} onChange={this.handleInputChange}/>
                    <span className="error">{this.state.emailError}</span>
                    
                    <input type="password" name="password1" placeholder="Password" className="form-control"  value={this.state.password1} onChange={this.handleInputChange}/>
                    <span className="error">{this.state.password1Error}</span>
                    
                    <input type="password" name="password2" placeholder="Confirm Password" className="form-control" value={this.state.password2} onChange={this.handleInputChange}/>
                    <span className="error">{this.state.password2Error}</span>

                    <input type="button" value="Sing up"  className="form-control btn-primary" onClick={this.formSubmit}/>
                    </form>
                    By clicking sign up. you agree to out terms and policy. 
                </Col>
            </Grid>
        )
    }
}
export default connect(CheckError,mapDispatchToProp )(SignupForm)