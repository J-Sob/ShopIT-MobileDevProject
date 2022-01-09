import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage from './Components/Homepage';
import SignUp from './Components/SignUp';
import LogIn from './Components/Login';
import LogOut from './Components/LogOut';
import UserProfile from './Components/UserProfile';
import AddProductForm from './Components/AddProductForm';
import Orders from './Components/Orders';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/*" element={<Homepage/>} />
          <Route exact path="/homepage" element={<Homepage/>} />
          <Route exact path="/signup" element={<SignUp/>} />
          <Route exact path="/login" element={<LogIn/>} />
          <Route exact path="/logout" element={<LogOut/>} />
          <Route exact path="/profile" element={<UserProfile/>} />
          <Route exact path="/addproduct" element={<AddProductForm/>} />
          <Route exact path="/userOrders" element={<Orders/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
