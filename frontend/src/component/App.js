
import React from 'react';
import {Route, Switch, Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux'
import {Row,  Navbar, Nav, NavItem,Grid, Col} from 'react-bootstrap';
import Article from 'component/Article';
import ArticleList from 'component/ArticleList';
import ArticleWrite from 'component/ArticleWrite';
import ArticleDelete from 'component/ArticleDelete';
import Dashboard from 'component/Dashboard';
import NoMatch from 'component/NoMatch';
import LoginForm from 'component/Login';
import Logout from 'component/Logout'
import SignupForm from 'component/Signup';
import test from 'component/test'
import testform from 'component/testform'

import './App.css';


const CheckLoginStatus = (state, ownProps) => {
    const{ user , routing : {location}, error } = state;
    return{
        isLogged : user.isLogged,
        pathname : location.pathname,
        error : error.error
    }
}

const App = props => (
           
            <div>
            {console.log("isLogged :", props.isLogged)}   
            <Row>
            <Navbar default collapseOnSelect>
            <Navbar.Header>
            <Navbar.Brand>
                    <Link to ="/">NTown US</Link> 
                </Navbar.Brand>
            <Navbar.Toggle />
            </Navbar.Header>    
            <Navbar.Collapse>
                <Nav pullRight>
                <NavItem eventKey={1} href="/">Home</NavItem>
               
                {  props.isLogged ?  <PrivateMenu /> : <PublicMenu /> }
                </Nav>
            </Navbar.Collapse>    
            </Navbar>   
            </Row>  

            <Switch>
            <Route exact path="/" component={ArticleList} />
            
            <Route exact path="/article/:id" component={Article}/>
            <Route exact path="/dashboard" component={Dashboard}/> 
            <Route exact path="/write" component={ArticleWrite}/> 
            <Route exact path="/delete/:id" component={ArticleDelete}/> 
            <Route exact path="/test" component={test}/> 
            <Route exact path="/testform" component={testform}/> 
            <Route exact path="/login" component={LoginForm}/>
            <Route exact path="/logout" component={Logout}/>                  
            <Route exact path="/signup" component={SignupForm}/>  
            <Route component={NoMatch} />  

            </Switch>  
        
            <Row className="Footer">
                <Grid>   
                    <Col lg={12}>
                        Footer
                    </Col>
                </Grid>
            </Row> 
            </div>
)
//export default App 


const PrivateMenu = () =>(
    <Nav>
    <NavItem eventKey={2} href ="/dashboard">Dashboard</NavItem>
    <NavItem eventKey={3} href ="/logout">Log Out</NavItem>
    </Nav>
    
)

const PublicMenu = () =>(
    <Nav>
    <NavItem eventKey={2} href ="/login">Login</NavItem>
    <NavItem eventKey={3} href ="/signup">Sign up</NavItem>
    </Nav>
)

export default withRouter(connect(CheckLoginStatus)(App))