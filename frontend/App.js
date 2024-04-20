import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { NotFound } from './pages/NotFound';
import { Inbox } from './pages/Inbox';
import { EmailDetail } from './pages/EmailDetail';
import { Compose } from './pages/Compose';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <ProtectedRoute exact path="/c/:emailCategory" component={Inbox} />
        <ProtectedRoute exact path="/c/:emailCategory/:emailId" component={EmailDetail} />
        <ProtectedRoute exact path="/compose" component={Compose} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
