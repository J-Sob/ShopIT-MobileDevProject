import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage from './Components/Homepage';
import SignUp from './Components/SignUp';
import LogIn from './Components/Login';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/*" element={<Homepage/>} />
          <Route exact path="/homepage" element={<Homepage/>} />
          <Route exact path="/signup" element={<SignUp/>} />
          <Route exact path="/login" element={<LogIn/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;