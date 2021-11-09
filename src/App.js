import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Homepage from 'views/Homepage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path={`todo/:todoId`} />
      </Switch>
    </Router>
  );
}

export default App;
