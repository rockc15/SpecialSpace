import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Chatroom from './pages/chatroom';
import login from './pages/login'
import home from './pages/home'
import createNewAccount from "./pages/createNewAccount";
import createNewGroup from "./pages/createNewGroup";

export default class Routes extends React.Component {
    render() {
        return (
            <Router>
                <div className='background'>
                    <Switch>
                        <Route exact path="/" component={login} />
                        <Route exact path="/createNewAccount" component={createNewAccount} />
                        <Route exact path="/createNewGroup" component={createNewGroup} />
                        <Route exact path="/home" component={home} />
                        <Route exact path="/chatroom/:groupName" component={Chatroom} />
                    </Switch>
                </div>
            </Router>
        );
    }

}