import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import { MDBBtn, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import Button from '@mui/material/Button';
import { useNavigate, NavLink } from 'react-router-dom';
import './Navbar.css';


const Navbar2 = () => {
  const [nav, setNav] = useState(false);

  const [showNavbar, setShowNavbar] = useState(false)

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }

  const handleNav = () => {
    setNav(!nav);
  };

  const navigate = useNavigate();

  const handleclick = (e) => {
    e.preventDefault();
    window.login = false;
    window.status = 'Login';
    navigate("/logIn");
  };


  return (
    <nav className="navbar" style={{ zIndex: '1' }}>
      <div className="container1">

        <div className="logo">
          <MDBRow>
          <MDBCol>
            <NavLink to="/">
              <img src="https://cdn-icons-png.flaticon.com/512/5974/5974636.png" width="31px" />
            </NavLink>
          </MDBCol>

          <MDBCol>
        
            <div ><Link to="https://www.incedoinc.com/company-overview/">
              <img src="https://www.incedoinc.com/wp-content/uploads/incedo-logo.png" width="101px" />
            </Link></div>
          </MDBCol>
          </MDBRow>
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <img src="https://cdn0.iconfinder.com/data/icons/basic-ui-vol-1/32/UI_stroke-05-512.png" width="50px" />
        </div>
        <div className={`nav-elements  ${showNavbar && 'active'}`}>
          <ul>
            <li>
              <Link to="/ChangePassword"><Button variant="outlined" color='error'>Update Password</Button></Link>
            </li>
            <li>
              <Button onClick={handleclick} variant="contained" color='error'>{window.status}</Button>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar2;
