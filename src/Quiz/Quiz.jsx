import React from 'react'
import './Quiz_CSS/Quiz.css'
import Quiz_login from './Quiz_component/Quiz_login'
import Quiz_Home from './Quiz_page/Quiz_Home';
import Quiz_About from './Quiz_page/Quiz_About';
import Quiz_game from './Quiz_page/Quiz_game';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Fun from './Quiz_page/Fun';

const Quiz = () => {
  return (
    <div>

      <Router>
          <Switch>
            <Route exact path="/">
              <Quiz_login />
            </Route>
            <Route path="/login">
              <Quiz_login />
            </Route>
            <Route path="/game">
              <Quiz_game />
            </Route>
            <Route path="/Home">
              <Quiz_Home />
            </Route>
            <Route path="/About">
              <Quiz_About />
            </Route>

           
          </Switch>
      </Router>
    </div>
  )
}

export default Quiz
