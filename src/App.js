import React, { createContext, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home/Home';
import NotFound from './components/NotFound/NotFound';
import MenuDetails from './components/MenuDetails/MenuDetails';
import Header from './components/Header/Header';
import LogIn from './components/LogIn/LogIn';
import Shipment from './components/Shipment/Shipment';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';


export const UserContext = createContext();
export const LogInContext = createContext();
function App() {
  const [ cart, setCart ] = useState([]);
  const [ logedIn , setLogedIn ] = useState({});
  console.log(logedIn)

  return (
    <UserContext.Provider value = {{value:[cart,setCart],value2:[logedIn,setLogedIn]}}>
    <Router>
      <Header/>
      <Switch>
        <Route exact path = '/'>
          <Home/>
        </Route>
        <Route path= '/food/:foodId'>
          <MenuDetails/>
        </Route>
        <Route path='/log-in'>
          <LogIn/>
        </Route>
        <PrivateRoute path = '/shipment'>
            <Shipment/>
        </PrivateRoute>
        <Route path= '*'>
          <NotFound/>
        </Route>
      </Switch>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
