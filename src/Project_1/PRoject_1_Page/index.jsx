import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from '../Project_1_Componet/Login';
import Dashboard from './Dashboard';
import Category from './Category';
import '../Project_1_CSS/Project1.css';
import 'react-toastify/dist/ReactToastify.css';
import Signup from '../Project_1_Componet/Signup';
import Question from './Question';

const FinalProject = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/Signup" component={Signup} />
                    <Route path="/Addmin/Dashboard" component={Dashboard} />
                    <Route path="/Addmin/Category" component={Category} />
                    <Route path="/Addmin/Question" component={Question} />
                </Switch>
            </Router>
        </div>
    );
};

export default FinalProject;
