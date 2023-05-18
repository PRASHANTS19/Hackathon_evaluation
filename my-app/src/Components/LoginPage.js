import React, { useState, useEffect } from "react";
import { MDBCard, MDBCardBody, MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox, } from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";
import Navbar2 from "./Navbar2";

function LoginPage() {
  const [isSubmit, setSubmit] = useState(false);
  const navigate = useNavigate();

  /////////////////state for  entered details////////////////
  const [teamForm, setTeamForm] = useState({
    email: "",
    password: "",
  });
  const italicText = {
    color: "#ccc",
  };

  const handleInput = (e) => {
    const { id, value } = e.target;
    setTeamForm({ ...teamForm, [id]: value });
  };

  const styles = {
    backgroundImage: "url('./images/login-bg.png')",
  };

  //////////////////handle login click///////////////////////
  const handleclick = (e) => {
    e.preventDefault();
    setSubmit(true);
    if (!teamForm?.email || !teamForm.password) {
      Swal.fire({ icon: "error", title: "Oops...", text: "Username or password is empty!", });
    }
    else {
      axios.post("/login", teamForm).then(
        (response) => {

          // //////////////send response to dashboard
          window.login = true;
          window.status = "Logout";
          localStorage.setItem("data", JSON.stringify(response.data));
          if (response.data.role_id === 4) {
            navigate("/participant");
          } else if (response.data.role_id === 3) {
            navigate("/judge");
          } else if (response.data.role_id === 2) {
            navigate("/panelist");
          } else if (response.data.role_id === 1) {
            navigate("/AdminDashboard");
          }

          ///////////////////////////
        },
        (error) => {
          console.log(error);
          Swal.fire({ icon: "error", title: "Oops...", text: "Invalid username or password!", });
          setTeamForm({ ...teamForm, email: '', password: '' });
        }
      );
    }
  };

  //////////////get event api for enddates /////////////
  const currDate = moment().format("YYYY-MM-DD");
  const [event, setEvent] = useState({});

  useEffect(() => {
    axios.get('/getEvent')
      .then(response => {
        setEvent(response.data[0]);
      }, (error) => {
        console.log(error);
      });
  }, []);

  return (
    <>      <div style={styles}></div>
      <Navbar2 />
      <MDBContainer fluid className="p-3 my-5 h-custom">
        <MDBRow>
          <MDBCol col="10" md="6">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample image" />
          </MDBCol>
          <MDBCol col="4" md="5">
          <h1 className="md:text-7xl sm:text-6xl text-4xl font-bold md:py-6" style={{ paddingBottom: '30px' }}>Hackcedo</h1>
            <MDBInput id="email" value={teamForm.email} onChange={(e) => handleInput(e)} wrapperClass="mb-4" label=<span style={italicText}>Email Address</span> type="email" size="lg" />
            <MDBInput id="password" value={teamForm.password} onChange={(e) => handleInput(e)} wrapperClass="mb-4" label=<span style={italicText}>Password</span> type="password" size="lg" />
            {currDate >= event.startDate && currDate <= event.endDate && (
            <p className="small fw-bold mt-2 pt-1 mb-2">
              Don't have an account?{" "}
              <Link to="/registrationForm" style={{ color: "blue" }}> Register{" "}</Link>
            </p>
            )}
            <div className="col-12">
              <MDBBtn onClick={handleclick}
                type="submit" className="bg-primary shadow-1-strong">
                {" "}
                LogIn{" "}
              </MDBBtn>
            </div>
          </MDBCol>

        </MDBRow>
      </MDBContainer>
    </>
  );
}
export default LoginPage;