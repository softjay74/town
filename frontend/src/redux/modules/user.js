import {push} from 'react-router-redux'
import {actionCreator as errorAction} from 'redux/modules/error'
           

// initial State
const SAVE_TOKEN = "SAVE_TOKEN"
const LOGOUT = "LOGOUT"

function saveToken(token){
    return{
        type: SAVE_TOKEN,
        token
    }
}


function setLogout(){
    return{
        type: LOGOUT,
    }
}


const initialState ={
    isLogged : localStorage.getItem("jwt") ? true : false,
}

function logout(){
    console.log("LOGOUT")
    return function(dispatch){
        fetch('/rest-auth/logout/',{
            mothed : "POST",
            headers : {
                "Content-Type" : "application/json"
            }
        })
        .then(response => response.json())
        .then(json => {
            console.log(json)
            dispatch(setLogout())
            dispatch(push("/"))
        })

    }
}
function FacebookLogin(access_token){
    //console.log("AccessToken", access_token)
    return function(dispatch){
        fetch("/rest-auth/facebook/",{
            method : "POST",
            headers : {
                "Content-Type" : "application/json"     
            },
            body : JSON.stringify({
                access_token
            })
        })
        .then(response => response.json())
        .then(json =>{
                console.log(json)
                if (json.token){
                    localStorage.setItem('jwt',json.token)  // localStorage에 저장
                    dispatch(saveToken(json.token))   // state에 상태 변화
                    dispatch(push('/'))                  // Redirect
                }
        })
        .catch(err => {
            console.log(err)
            dispatch(errorAction.addError(err))
        })    
    }    
}

function Login(username, password){
    console.log(username, password)
    return(dispatch) =>{
        
        dispatch(errorAction.removeError())
        
        fetch('rest-auth/login/',{
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body :JSON.stringify({
                username : username,
                password : password
            })
        })
        .then(response=> response.json())
        .then(json =>{
            console.log(json)
            if (json.token) {
                localStorage.setItem('jwt', json.token)
                dispatch(saveToken(json.token))
                dispatch(push("/"))
            } else {
                dispatch(errorAction.addError(json))    
            }

        })
        .catch(err => {
            console.log(err)
            dispatch(errorAction.addError(err))
        })    
    }
}


function signup(username, fullname, password1, password2,  email){
    return(dispatch)=>{
        fetch('/rest-auth/registration/',{
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body :JSON.stringify({
                username, 
                password1,
                password2,
                name : fullname,
                email   
            })
        })
        .then(response=>response.json())
        .then(json=>{
            console.log(json)
            if (json.token) {
                localStorage.setItem('jwt', json.token)
                dispatch(saveToken(json.token))
                dispatch(push("/"))
            } else {
                dispatch(errorAction.addError(json))    
            }
        })
        .catch(err=>{
            console.log(err)
            dispatch(errorAction.addError(err))    
            })
    }
}


function reducer(state=initialState, action){
    switch(action.type){
        case "SAVE_TOKEN" :
            return applySetToken(state, action)
        case "LOGOUT" :
            return applyLogout(state, action)
        default :
            return state;
    }
}

function applySetToken(state, action){
    const {token} = action
    return {
        ...state,
        isLogged : true,
        token
    } 
}

function applyLogout(state, action){
    localStorage.removeItem('jwt')
    return{
        ...state,
        isLogged : false
    }
}

const actionCreator = {
    FacebookLogin,
    Login,
    signup,
    logout
}

export { actionCreator }

export default reducer