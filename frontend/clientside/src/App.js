import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import './App.css';
import AllClient from './component/admin/Allclient';
import ParkingDetails from './component/admin/ParkingDetails';
import PlaceUpdate from "./component/admin/PlaceUpdate";
import AddPlace from "./component/admin/AddPlace";
import AdminLogin from "./component/admin/Adminlogin";
import Main from "./component/admin/Main";
import Welcomeadmin from "./component/admin/Welcomeadmin";
import UserProfile from './component/admin/Userprofile';
import Userlogin from './component/admin/Userlogin';
import Reservatiohestory from './component/admin/Reservationshestory';
import Useredite from './component/admin/Useredite';
import Makereservation from "./component/admin/Makereservation" ;
import Invoice from "./component/admin/Invoice";
import UserSignup from "./component/admin/Usersignup";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/parkings" element={<ParkingDetails />} />
          <Route path="/PlaceUpdate/:id" element={<PlaceUpdate />} />
          <Route path="/AddPlace" element={<AddPlace />} />
          <Route path="/Client" element={<AllClient />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/welcome" element={<Welcomeadmin />} />
          <Route path="/user/login" element={<Userlogin />} />
          <Route path="/user/signup" element={<UserSignup />} />
          <Route path="/user/profile/:userid" element={<UserProfile />} />
          <Route path="/user/reservations/history/:userid" element={<Reservatiohestory />} />
          <Route path="/user/profile/edit/:userid" element={<Useredite />} />
          <Route path="/user/profile/makereservation/:userid" element={<Makereservation />} />
          <Route path="/user/profile/makereservation/invoice/:invoiceDetails" element={<Invoice />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
