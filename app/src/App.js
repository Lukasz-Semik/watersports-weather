import React from 'react';
import Background from './components/Background';
import Dashboard from './components/Dashboard';

const App = () => (
  <div>
    <Background />
    <div className="wrapper--main">
      <Dashboard />
    </div>
  </div>
)

export default App;