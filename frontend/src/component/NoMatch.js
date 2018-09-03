import React from 'react';
import Loading from './Loading';
import {Grid} from 'react-bootstrap'

const NoMatch = () =>(
        <Grid className="text-center">
            <Loading />
            <h1>404 Page Not Found</h1>
        </Grid>    
)
export default NoMatch;