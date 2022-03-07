import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./app.css";
import HomePage from "../src/HomePage";
import Login from "../src/components/Login/Login";
import UserDashboard from "./components/Main/Dashboard/UserDashboard";
import Dashboard from "./components/Main/Dashboard/Dashboard";
import Orders from "./components/Main/Dashboard/Orders/Orders";
import UserFaves from "./components/Main/Dashboard/Favorites/UserFaves";
import UserInfo from "./components/Main/Dashboard/EditForms/UserInfo";
import ProductDashboard from "./components/Main/ProductCategory/ProductDashboard";
import AllProduct from "./components/Main/ProductCategory/AllProducts";
function App() {
  return (
    <div className="app">
      <div className="section">
        <Router>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/login" element={<Login />} />
            <Route path="/product" element={<ProductDashboard/>}/>
            <Route exact path="/userdashboard" element={<UserDashboard />}>
              <Route index element={<Dashboard />} />
              <Route path="/userdashboard/edit-user-info" element={<UserInfo/>}/>
              <Route path="/userdashboard/orders" element={<Orders/>}/>
              <Route path="/userdashboard/user-faves" element={<UserFaves/>}/>
            </Route>
            <Route exact path="/product" element={<ProductDashboard />}>
              <Route index element={<AllProduct/>} />
              <Route path="/product/nutrition" element={<Orders/>}/>
              <Route path="/product/training" element={<UserFaves/>}/>
            </Route>
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
