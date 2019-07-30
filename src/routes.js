import loadable from '@loadable/component';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Error from './components/Error';
import styled from 'styled-components';
import Toast from './components/Toast';

// Routes
const Submission = loadable(() => import('./views/Submission'));
const Form = loadable(() => import('./views/Form'));

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FourOhFour = () => (
  <Container>
    <Error message={'This page could not be found'} />
  </Container>
);

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <div style={{ height: '100%' }}>
          <Toast />
          <Switch>
            <Route path="/" exact={true} component={Form} />
            <Route path="/app/:id" component={Submission} />
            <Route component={FourOhFour} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Routes;
