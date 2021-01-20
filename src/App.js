import React, { Component } from 'react'
import { Route, Router } from 'react-router-dom'
import {createBrowserHistory} from 'history';
import DashboardContainer from "./container/DashboardContainer"


class App extends Component {
  render() {
    return (
      <Router history={createBrowserHistory()}>
      <div className="App container">
        <Route path="/" component={DashboardContainer} />
      </div>
      </Router>
    )
  }
}
export default App