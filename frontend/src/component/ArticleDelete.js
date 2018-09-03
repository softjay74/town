import React from 'react'
import { connect } from 'react-redux'
import {actionCreater as PostAction} from 'redux/modules/post'

const mapDispatchToProps = (dispatch, ownProps) =>{
    return {
        deletePosting : (id) =>{
            dispatch(PostAction.deletePosting(id))
        }
    }
}
class ArticleDelete extends React.Component{

    render(){
        const { match: { params } } = this.props;
        console.log(params.id)
        const {deletePosting} = this.props
        deletePosting(params.id)
        
        return (null)
    }

}
//export default ArticleDelete
export default connect(null, mapDispatchToProps)(ArticleDelete)


    