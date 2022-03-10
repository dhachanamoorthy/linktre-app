import "./App.css";
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { Login } from "./components/Login/Login";
import { Home } from "./components/Home/Home";
import { Profile } from "./components/Profile/Profile";
import PrivateRoute from "./components/Utils/PrivateRoute";
import { Tree } from "./components/Tree/Tree";
const theme = createTheme({
  typography: {
    fontFamily: [
      'Montserrat',
    ].join(','),
  },});
function App() {
  return (
    <ThemeProvider theme={theme}>
        <div className='App'>
      <Router>
        <Switch>
          <PrivateRoute path="/home" component = {Home}></PrivateRoute>
          <PrivateRoute path="/trees" component = {Tree}></PrivateRoute>
          <PrivateRoute path="/profile" component = {Profile}></PrivateRoute>
          <Route path="/login"><Login/></Route>
          <Route path="/"><Login/></Route>
        </Switch>
      </Router>
    </div>
    </ThemeProvider>
  
  );

}
export default App;
