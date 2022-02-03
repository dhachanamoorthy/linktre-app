import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "./components/Login/Login";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/" element={< Login/>} />
        </Routes>
      </Router>
    </div>
  );

}
const SignUp = ()=>{
  return(
    <h2>Sign Up</h2>
  )
}
export default App;
