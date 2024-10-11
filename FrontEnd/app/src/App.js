import './App.css';
import { TodoWrapper } from './components/TodoWrapper';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
          path="/tasks"
          element={
            <PrivateRoute>
              <TodoWrapper  />
            </PrivateRoute>
          }
        />
        </Routes>
      </Router>
    </div>
  );
}

export default App;