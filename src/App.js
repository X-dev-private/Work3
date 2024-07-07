import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import LandPage from './pages/LandPage';
import AppPage from './pages/AppPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandPage} />
        <Route path="/app" component={AppPage} />
      </Switch>
    </Router>
  );
}

export default App;
