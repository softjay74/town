import React from 'react';
import {connect} from 'react-redux';
import {Grid, Col} from 'react-bootstrap'
//import {Form, Control} from 'react-redux-form'
//import { isEmpty } from 'validator';
import Textarea from 'react-textarea-autosize';
import {actionCreater as PostAction} from 'redux/modules/post'

const mapDispatchToProps = (dispatch, ownProps) =>{
    return {
        CreateArticle : (formData) => {
           // return null
            dispatch(PostAction.CreateArticle(formData))
        }
    }
}

class ArticleWrite extends React.Component {

       state = {
        subject : null,
        subejctError : null,
        content : null,
        contentError : null,
        videolink : null,
        ImgFile : null
    }

    InputChange = event =>{
        const { target : {name, value} } = event
        this.setState({
            [name] : value,
        })
    }

    InputFile = event =>{
        var files  = event.target.files
        this.setState( {ImgFile : files} )
        console.log(files)
    } 

    handleSubmit = (event) =>{

        event.preventDefault();
        
        this.setState ({
            subjectError : "",
            contentError : ""
        })

        const {CreateArticle} = this.props
        const {subject, content, videolink, ImgFile, subjectError, contentError} = this.state

        const formData = new FormData(event.target);
        formData.append('subject', subject);
        formData.append('content', content);
        formData.append('videolink', videolink)
        formData.append('ImgFile', ImgFile)

        //console.log(formData.get('subject'))
        //console.log(formData.get('content'))
        //console.log(formData.get('videolink'))
        console.log(formData.get('ImgFile'))

       if (!subject){
            this.setState({
                subjectError : "subject is required"
            })
         }
        if (!content){
            this.setState({
                contentError : "content is required"
            })
        }

        console.log("Ready")
        if (!subjectError && !contentError){
           CreateArticle(formData)
           //console.log(subject, content, videolink,ImgFile)
           //posting(subject, content, videolink, ImgFile)
         } 
    }
    
/*
    handleSubmit = event => {
        console.log("TEST")
        event.preventDefault();
        // const {CreateArticle} = this.props
        //const {ImgFile} = this.state

       
        var formData = new FormData(event.target);
        console.log(formData)
        //const subject = event.target.subject.value
        //const content = event.target.content.value
       // const videolink = event.target.videolink.value

       // formData.append('subject',subject);
       // formData.append('content', content);
      //  formData.append('videolink', videolink)
// formData.append('ImgFile', ImgFile)

       // console.log(formData.get('subject'))
       // console.log(formData.get('content'))
       // console.log(formData.get('videolink'))
       // console.log(formData.get('ImgFile'))
        
       //CreateArticle(formData)
          //console.log(data) 
    }    
*/
    render(){
        //const required = str => !isEmpty(str);

        return(
            <Grid>
                <Col lg={6} >
                <span className="error">
                        {this.state.subjectError}
                        <br/>{this.state.contentError}
                    </span> 
                <form onSubmit={this.handleSubmit}>
                <input type="text" id="subject" name="subject" placeholder="Subject" className="form-control" required onChange={this.InputChange}/>
                    <Textarea minRows={6} id="content" name="content" placeholder="Content" className="form-control" required   onChange={this.InputChange}/>
                    <input type="text" id="videolink" name="videolink" placeholder="Youtube URL" className="form-control"  onChange={this.InputChange}/>
                    <input type="file" id="ImgFile" name="ImgFile" className="form-control"  multiple  onChange={this.InputFile.bind(this)} />
                    <button className="form-control btn-primary"  >Send data!</button>
                </form>
       
       {/*
                    <form >
                       
                    <input type="text" name="subject" placeholder="Subject" className="form-control" value={this.state.subject} onChange={this.InputChange}/>
                    <Textarea minRows={6} name="content" placeholder="Content" className="form-control" value={this.state.content}  onChange={this.InputChange}/>
                    <input type="text" name="videolink" placeholder="Youtube URL" className="form-control" value={this.state.videolink}  onChange={this.InputChange}/>
                    <input type="file" name="ImgFile" className="form-control" onChange={this.InputFile.bind(this)}  required multiple  />
                    <input type="button" value="Save" className="form-control btn-primary" onClick={this.submitForm}/>
                    </form>
       */}      
                </Col>
            </Grid>    
        )
    }    
}
export default connect(null, mapDispatchToProps)(ArticleWrite);