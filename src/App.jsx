import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import TypingTestContainer from './containers/TypingTest.container';
import TypingTestAdminContainer from './containers/TypingTestAdmin.container';
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";

//import AdminContainer from './containers/admin/Admin.container';
// prefix admin container component names with 'Admin'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route exact path="/">
              <Redirect to="/typing-test" />
            </Route>

            <Route exact path="/typing-test" component={TypingTestContainer} />
            <Route exact path="/typing-test/admin" component={TypingTestAdminContainer} />

          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;