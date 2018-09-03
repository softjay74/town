import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import FacebookLogin from 'react-facebook-login';
import {Grid, Col} from 'react-bootstrap'
import {actionCreator as UserAction} from 'redux/modules/user'
import './App.css'

const CheckError = (state, ownProps) => {
    const{ error } = state;
    return{
        error : error.error
    }
}

const mapDispatchToProp = (dispatch, ownProp) =>{
    return {
        Facebook : (access_token) => {
            dispatch(UserAction.FacebookLogin(access_token))
        },
        userlogin : (username, password) =>{
            dispatch(UserAction.Login(username, password))
        }
    }

}

class LoginForm  extends Component { 
    
    state={
        username:'',
        usernameError:"",
        password :'',
        passwordError :'',
    }

    static propTypes ={
        Facebook : PropTypes.func.isRequired,
        userlogin : PropTypes.func.isRequired,
        //error : PropTypes.string.isRequired
    }

    
    handleInputChange = event =>{
        const { target : {name, value} } = event
        this.setState({
            [name] : value
        })

    }

    handleFacebookLogin = response =>{
        const { Facebook } = this.props
        // console.log("handle:",response)
        // console.log(Facebook)
         Facebook(response.accessToken)
     }

    handleLogin = event => {
         const {userlogin} = this.props
         
         //console.log(username, password)
         this.setState({
            usernameError : "",
            passwordError : "",
        })

        const {username, password, usernameError, passwordError}= this.state;  

        if (!username){
            this.setState({
                usernameError : "username is required"
            })
        }
        if (!password){
            this.setState({
                passwordError : "password required"
            })    
        }
        if (!usernameError && !passwordError){
                userlogin(username, password)
            }
     }

    render(){ 
        return (
            <Grid>
                <Col lg={4} lgOffset={4} className="text-center">
                <img src={"http://www.seattlen.com/images/logo1.png"} alt=""/>
                <p/>
                <span className="error">{this.props.error.non_field_errors}</span>
                <form>
                    <input type="text" name="username" placeholder="User Name" className="form-control" value={this.state.username} onChange={this.handleInputChange}/>
                    <span className="error">{this.state.usernameError}</span>
                    <input type="password" name="password" placeholder="Password" className="form-control"  value={this.state.password} onChange={this.handleInputChange}/>
                    <span className="error">{this.state.passwordError}</span>
                    <input type="button" value="Login" className="form-control btn-primary" onClick={this.handleLogin}/>
                </form>  
                <br/> Or
                <br/>
                <span>    
                <FacebookLogin
                    appId ="225736978123344"
                    autoLoad={false}
                    fields="name,email,picture"
                    callback={this.handleFacebookLogin} 
                    cssClass="my-facebook-button-class"
                    icon="fa-facebook-official"
                    textButton="Log in with facebook"
                />
                </span>
                </Col>
            </Grid>    
        )

    }
}        

export default connect(CheckError,mapDispatchToProp)(LoginForm)