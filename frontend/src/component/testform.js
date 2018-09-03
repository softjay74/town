import React from 'react';
import {Grid, Col} from 'react-bootstrap'
import {connect} from 'react-redux'
import {actionCreater as PostAction} from 'redux/modules/post'

const mapDispatchToProps = (dispatch, ownProps) =>{
    return {
        CreateForm : (formData) =>{
            dispatch(PostAction.CreateForm( formData))
        }
    }
}


class testform extends React.Component{
    
    state = {
        subject : null,
        ImgFile : null
    }

    InputFile = event =>{
        var files  = event.target.files
        this.setState({ImgFile : files })
        console.log(files)
    } 

    handleSubmit = (event) =>{
        event.preventDefault();
        var form=event.target
        console.log(form)
        const formData = new FormData(form);
        //console.log(formData)
       
        const {CreateForm} = this.props
        //const {posting} = this.props
        const {subject, ImgFile} = this.state

        formData.append('subject', 'testsubject');
        formData.append('ImgFile', ImgFile)


        //console.log(formData.get('subject'))
        console.log(formData.get('ImgFile'))

        console.log("Ready")
        console.log(subject, ImgFile)
        CreateForm(formData)
    }

    render(){
        return (

            <Grid>
                <Col lg={6} >
                <form onSubmit={this.handleSubmit}>
                    <input type="text" id="subject" name="subject" placeholder="Subject" className="form-control" required/>
                    <input type="file" id="ImgFile" name="ImgFile" className="form-control"  multiple  onChange={this.InputFile.bind(this)} />
                    <button className="form-control btn-primary"  >Send data!</button>
                </form>
                </Col>
            </Grid>
        )
    }
}
export default connect(null, mapDispatchToProps)(testform);