import React from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {Grid, Col} from 'react-bootstrap'
import {actionCreater as PostAction} from 'redux/modules/post'
import Loading from 'component/Loading'

const mapStateToProp = (state, ownProps) =>{
    const {post : {articlelist}} = state;
    return {
        articlelist
    }
}

const mapDispatchToProps = (dispatch, ownProps)=>{
    return{
        ArticleList : () => {
            dispatch(PostAction.ArticleList())
        }
    }
}

class ArticleList extends React.Component {

    state = {
        loading : true,
        openid : []
    }

    static propTypes={
        ArticleList : PropTypes.func.isRequired
    }

    componentDidMount(){
        const { ArticleList } = this.props
        ArticleList()
    }

    componentWillReceiveProps = (nextProps) =>{
        console.log("nextPorps:", nextProps) 
        if(nextProps){
            this.setState({
                loading : false
            })
        }
    }
 
    render(){

        if (this.state.loading) {
            return <Loading />
        } else {

            const {articlelist} = this.props;
            return (
                <Grid>
                    { articlelist.map(article=> <Article {...article} key={article.id}/>) }
                </Grid>
                )
        }
    }

}

const Article = props =>(
    <Col lg={4} md={4} sm={6} xs={12}>
    <div className="thumbnail">
        
        { props.postImages.length > 0 ?  
            <img src={props.postImages[0].ImgFile} alt="" /> : <div className="">{props.content}</div>} 
        {/*props.postImages ? props.postImages.map(image => <img src={image.ImgFile} alt="" /> ) : null */}
        {props.id} -<Link to={`/article/${props.id}`}>{props.subject}</Link> 
        <br/>
        {props.writer.username}
    </div>
    </Col>
)

export default connect(mapStateToProp, mapDispatchToProps)(ArticleList)