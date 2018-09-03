import React from 'react';
import { connect } from 'react-redux';
import {Grid, Col} from 'react-bootstrap'
//import {Link} from 'react-router-dom'
import {actionCreater as PostAction} from 'redux/modules/post'
//import Loading from 'component/Loading'
import ArticleList from 'component/ArticleList'

const mapStateToProps =(state, ownProps)=>{
    const { post : {article} } = state
    return {
        article
    }
}

const mapDispatchToProps= (dispatch, ownProps) => {
    return {
        getArticle : (id) =>{
            console.log(id)
            dispatch(PostAction.Article(id))
        }
    }

}

class Article extends React.Component {

    componentWillReceiveProps = (nextProps) =>{
        console.log("next Params :", nextProps.match.params.id)
        console.log("article id:", this.props.match.params.id)
        if(nextProps.match.params.id === this.props.match.params.id){
            return;
          }else {
            window.scrollTo(0, 0);    
           //fetchnewProduct and set state to reload
           const {getArticle} = this.props
           getArticle(nextProps.match.params.id)       

        }
    }
    
    componentDidMount(){
        window.scrollTo(0, 0);
        const { match: { params } } = this.props;
        console.log(params.id)
       const {getArticle} = this.props
       getArticle(params.id)

    }

    render(){
        const {article} = this.props
            if (article){
                return (
                    <div>
                    <Grid>
                    <Col lg={12} md={12} sm={12} xs={12}>
                    <div className="thumbnail">
                        {article.writer.username}- {article.subject}
                        <br/>
                        { article.postImages.length > 0 ?  
                            <img src={article.postImages[0].ImgFile} alt="" /> : null 
                        } 
                        <br/>{article.content}
                        <br/>{article.postImages ? article.postImages.map(image => <img src={image.ImgFile} alt="" />   ) : null }
                        <br/>
                    </div>    
                    </Col>
                    </Grid>
                    <ArticleList />    
                    </div>
                )
            } else {
                return null
            }
        }
    }            
export default connect(mapStateToProps, mapDispatchToProps)(Article);