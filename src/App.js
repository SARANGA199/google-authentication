import logo from './logo.svg';
import './App.css';
import LoginPage from './pages/login.page.tsx';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter

function App() {
  return (
    <Router> {/* Use BrowserRouter instead of Router */}
      <div className="App">
        <LoginPage />
      </div>
    </Router>
  );
}

export default App;
