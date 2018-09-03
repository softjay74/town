import React from 'react'
import {Grid, Col} from 'react-bootstrap';
class Dashboard extends React.Component{

    render(){
        return (
            <Grid>
                <Col lg={12}>
                    <h1>Dashboard</h1>
                    <input type="button" value="글쓰기" className="form-control btn-primary" />    
                </Col>
            </Grid>
        )
    }
}
export default Dashboard