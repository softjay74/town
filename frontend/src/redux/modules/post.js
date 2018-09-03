import {push} from 'react-router-redux'

const GET_ARTICLE_LIST = "GET_ARTICLE_LIST"
const GET_ARTICLE = "GET_ARTICLE"

function getArticle(article){
    return {
        type : GET_ARTICLE,
        article
    }
}
function getArticleList(articlelist){
    return {
        type : GET_ARTICLE_LIST, 
        articlelist
    }
}

const initialState={
    articlelist : []
}

function ArticleList(){
    return(dispatch) =>{
        fetch('/post/', {
            method : "GET",
            headers : {
                "Content-Type" : "application/json"
            }
        })
        .then(response=> response.json())
        .then(json =>{
            console.log(json)
            dispatch(getArticleList(json))
        })
        .catch(err=>console.log(err))
    }
}

function Article(id){
    console.log(id)
    return(dispatch) =>{
        fetch(`/post/${id}`,{
            method : "GET",
            headers : {
                "Content-Type" : "application/json"
            }
        })
        .then(response=>response.json())
        .then(json=>{
            console.log(json)
            dispatch(getArticle(json))
        })
        .catch(err => console.log(err))
    } 
}

function CreateArticle(formData){
    var token = localStorage.getItem("jwt")
    console.log(formData)
    console.log(formData.get('subject'))
    console.log(formData.get('ImgFile'))
    console.log (token)
    return(dispatch)=>{
        fetch('/posting/',{
            method : "POST",
            headers : {
                //"Content-Type" : "multipart/form-data",
                //"Content-Type" : "application/json",
                Authorization : `JWT ${token}` 
            },
            body : formData
        })
        .then(response=>response.json())
        .then(json =>{
            console.log(json)
            dispatch(push("/"))
        })
        .catch(err=> console.log(err))
        //const{ user:{token}} = getState()
        //console.log({token})
    }

}

function deletePosting(id) {
    var token = localStorage.getItem("jwt")
    return() =>{
        fetch(`/post/${id}/`,{
            method : "DELETE",
            headers : {
                Authorization : `JWT ${token}`
            }
        })
        .then(response => response.json())
        .then(json => console.log(json))
        .catch(err => console.log(err))
    }
}

function CreateForm(formData){
    var token = localStorage.getItem("jwt")
    console.log (token)
    console.log (formData.get('subject'))
    console.log (formData.get('ImgFile'))

    return(dispatch)=>{
        fetch('/formtest/',{
            method : "POST",
            headers : {
                //"Content-Type" : "multipart/form-data",
                Authorization : `JWT ${token}` 
            },
            body : formData
        })
        .then(response=>response.json())
        .then(json =>{
            console.log(json)
        })
        .catch(err=> console.log(err))
    }
}


function reducer(state=initialState, action){
    switch(action.type){
        case GET_ARTICLE_LIST : 
            return applyGetArticleList(state, action)
        case GET_ARTICLE :
            return applyGetArticle(state, action)
        default : 
            return state
    }    
}

function applyGetArticle(state, action){
    const {article} = action
    return {
        ...state,
        article
    } 
}

function applyGetArticleList(state, action){
    const {articlelist} = action
    return {
        ...state,
        articlelist
    } 
}

const actionCreater = {
    ArticleList,
    Article,
    CreateArticle,
    deletePosting,
    CreateForm
}

export { actionCreater }

export default reducer