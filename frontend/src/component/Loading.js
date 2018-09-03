import React from 'react';
import {Grid, Col} from 'react-bootstrap'

const Loading = () =>(
    <Grid>
    <Col lg={4} lgOffset={4}>
        <img src={require('images/loading.gif')} alt="" />
    </Col>
    </Grid>        
   
)
export default Loading