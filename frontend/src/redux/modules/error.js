
const ADD_ERROR = "ADD_ERROR"
const REMOVE_ERROR = "REMOVE_ERROR"

function addError(error) {
    return {
        type : ADD_ERROR,
        error
    }
}

function removeError(){
    return {
        type : REMOVE_ERROR
    }
}    

const initialState = {
        error  : ""
    }    

function reducer(state=initialState, action){
        switch (action.type){
            case ADD_ERROR :
                return setError(state, action)
            case REMOVE_ERROR :
                return deleteError(state)
            default :
                return state
    }    
}

function setError(state, action){
    const { error } = action
    return {
        ...state,
        error 
    }
}

function deleteError(state){
    console.log("TTEST")
    return {
        ...state,
        error : ""
    }
}
    
const actionCreator = {
    addError,
    removeError,
}

export {actionCreator}

export default reducer;