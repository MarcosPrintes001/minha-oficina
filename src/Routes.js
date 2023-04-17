import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

import LoginPage from './pages/login/login'
import Home from './pages/home/home'
import UserPage from "./pages/user/user";

const Routes = () => {
   return(
       <BrowserRouter>
           <Route component = { LoginPage }  path="/" exact />
           <Route component = { Home }  path="/home" />
           <Route component = { UserPage }  path="/usuario" />
       </BrowserRouter>
   )
}

export default Routes;