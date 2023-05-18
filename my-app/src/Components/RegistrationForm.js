import React from "react";
import {MDBSpinner, MDBTextArea, MDBValidation, MDBContainer, MDBCardBody, MDBCol, MDBRow, MDBCard, MDBBtn, MDBInput } from "mdb-react-ui-kit";
import { useState, useEffect } from "react";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar2 from "./Navbar2";

function RegistrationForm() {
  const [isSubmit, setSubmit] = useState(false);
  const [errors, serErrors] = useState({});
  const [selectedOption, setSelectedOption] = useState("");
  const [addBtn, setAddBtn] = useState(false);
  const navigate = useNavigate();
  const [password, setPassword] = useState({
    confirmPassword: "",
  });

  const [domain, setDomain] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //////////////Get domain////////////////////////

  useEffect(() => {
    axios.get("/getDomain").then(
      (response) => {
        setDomain(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  const handleAddBtn = () => {
    setAddBtn(true);
  };

  // for drop down menu only
  const handleSelect = (event) => {
    setSelectedOption(event.target.value);
  };

  //////////////set Team Form //////////////////

  const [teamForm, setTeamForm] = useState({
    team: "",

    n1: "",
    e1: "",
    ph1: "",

    n2: "",
    e2: "",
    ph2: "",

    n3: "",
    e3: "",
    ph3: "",

    n4: "",
    e4: "",
    ph4: "",

    pass: "",
    domain: "",
    problemS: "",
    problemD: "",
  });

  const handlePass = (e) => {
    const { id, value } = e.target;
    setPassword({ ...password, [id]: value });
  };
  const handleInput = (e) => {
    const { id, value } = e.target;
    setTeamForm({ ...teamForm, [id]: value });
  };

  const handleclick = (e) => {
    e.preventDefault();
    serErrors(validate(teamForm));
    setSubmit(true);
  };

  //////////////////connect to server///////////////////////////
  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmit) {
      setIsLoading(true);
      axios.post("/registrationForm", teamForm)
        .then((response) => {
          setIsLoading(false);
          Swal.fire("Great", "Registration Successful!", "success");
          navigate("/logIn");
        },
          (error) => {
            setIsLoading(false);
            console.log(error);
            Swal.fire({ icon: "error", title: "Oops...", text: "Participant already exists" });
          }
        );
    }
  }, [errors]);

  /////////////////validation checks///////////////////////

  const validate = (teamForm) => {
    const errorsObj = {};
    const regex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i;
    const regexPh = /^\d{10}$/i;
    if (!teamForm.team) {
      errorsObj.team = "Team Name is required";
    }
    else if (!teamForm.n1) {
      errorsObj.n1 = "Participant name is required";
    }
    else if (!teamForm.e1) {
      errorsObj.e1 = "Participant email is required";
    } else if (!regex.test(teamForm.e1)) {
      errorsObj.e1 = "this is not a valid email";
    }
    else if (!teamForm.ph1) {
      errorsObj.ph1 = "Participant number is required";
    } else if (!regexPh.test(teamForm.ph1)) {
      errorsObj.ph1 = "This is not a valid phone number";
    }
    else if (!teamForm.n2) {
      errorsObj.n2 = "Participant name is required";
    }
    else if (!teamForm.e2) {
      errorsObj.e2 = "Participant email is required";
    } else if (!regex.test(teamForm.e2)) {
      errorsObj.e2 = "This is not a valid email";
    }
    else if (!teamForm.ph2) {
      errorsObj.ph2 = "Participant number is required";
    } else if (!regexPh.test(teamForm.ph2)) {
      errorsObj.ph2 = "This is not a valid phone number";
    }
    else if (!teamForm.n3) {
      errorsObj.n3 = "Participant name is required";
    }
    else if (!teamForm.e3) {
      errorsObj.e3 = "Participant email is required";
    } else if (!regex.test(teamForm.e3)) {
      errorsObj.e3 = "This is not a valid email";
    }
    else if (!teamForm.ph3) {
      errorsObj.ph3 = "Participant number is required";
    } else if (!regexPh.test(teamForm.ph3)) {
      errorsObj.ph3 = "This is not a valid phone number";
    }
    else if (!teamForm.pass) {
      errorsObj.pass = "Password is required";
    } else if (teamForm.pass.length < 8) {
      errorsObj.pass = "Minimum password length is 8";
    }
    else if (!password.confirmPassword) {
      errorsObj.confirmPassword = "Enter confirm password";
    } else if (teamForm.pass !== password.confirmPassword) {
      errorsObj.confirmPassword = "Confirm password is not matched";
    }
    else if (!teamForm.domain) {
      errorsObj.domain = "Domain not specified";
    }
    else if (!teamForm.problemS) {
      errorsObj.problemS = "Problem statement is required";
    }
    else if (!teamForm.problemD) {
      errorsObj.problemD = "Problem description is required";
    }
    if (teamForm.ph4) {
      if (!regexPh.test(teamForm.ph4)) {
        errorsObj.ph4 = "This is not a valid phone number";
      }
    }
    if (teamForm.e4) {
      if (!regex.test(teamForm.e4)) {
        errorsObj.e4 = "This is not a valid email";
      }
    }


    if (teamForm.ph1 !== "" && teamForm.ph2 !== "" && teamForm.ph3 !== "") {
      if (
        teamForm.ph1 === teamForm.ph2 ||
        teamForm.ph1 === teamForm.ph3 ||
        teamForm.ph1 === teamForm.ph4 ||
        teamForm.ph2 === teamForm.ph3 ||
        teamForm.ph2 === teamForm.ph4 ||
        teamForm.ph3 === teamForm.ph4
      ) {
        if (
          teamForm.ph1 === teamForm.ph2 ||
          teamForm.ph1 === teamForm.ph3 ||
          teamForm.ph1 === teamForm.ph4
        ) {
          errorsObj.ph1 = "Duplicate entries found";
        } else if (
          teamForm.ph2 === teamForm.ph3 ||
          teamForm.ph2 === teamForm.ph4
        ) {
          errorsObj.ph2 = "Duplicate entries found";
        } else if (teamForm.ph3 === teamForm.ph4) {
          errorsObj.ph3 = "Duplicate entries found";
        }
      }
    }
    if (teamForm.e1 !== "" && teamForm.e2 !== "" && teamForm.e3 !== "") {
      if (
        teamForm.e1 === teamForm.e2 ||
        teamForm.e1 === teamForm.e3 ||
        teamForm.e1 === teamForm.e4 ||
        teamForm.e2 === teamForm.e3 ||
        teamForm.e2 === teamForm.e4 ||
        teamForm.e3 === teamForm.e4
      ) {
        if (
          teamForm.e1 === teamForm.e2 ||
          teamForm.e1 === teamForm.e3 ||
          teamForm.e1 === teamForm.e4
        ) {
          errorsObj.e1 = "Duplicate entries found";
        } else if (teamForm.e2 === teamForm.e3 || teamForm.e2 === teamForm.e4) {
          errorsObj.e2 = "Duplicate entries found";
        } else if (teamForm.e3 === teamForm.e4) {
          errorsObj.e3 = "Duplicate entries found";
        }
      }
    }

    return errorsObj;
  };

  const myStyle = {
    color: "red",
  };
  const italicText = {
    color: "#ccc",
  };

  return (
    <>
      <Navbar2 />
      <MDBValidation className="row g-3" noValidate>
        <MDBContainer fluid>
          <MDBRow className="justify-content-center align-items-center m-5">
            <MDBCard>
              <MDBCardBody className="px-8">
                <h3 className="fw-bold mb-2 pb-2 pb-md-0 mb-md-5 text-center">
                  Registration Form
                </h3>

                <MDBRow className="align-items-center pt-0 pb-4 ">
                  <MDBCol md="3" className="ps-5">
                    <h6 className="mb-0">
                      Team Name <span style={{ color: "red" }}>*</span>
                    </h6>
                  </MDBCol>
                  <MDBCol md="6">
                    <MDBInput id="team" value={teamForm.team} onChange={(e) => handleInput(e)} wrapperClass="mb-0" required className="col-md-4" label=<span style={italicText}>Team Name</span> size="md" type="text" />
                    <p style={myStyle}>{errors.team}</p>
                  </MDBCol>
                </MDBRow>

                <MDBRow className="align-items-center pt-0 ">
                  <MDBCol md="3" className="ps-5">
                    <h6 className="mb-0">
                      Participant-1 <span style={{ color: "red" }}>*</span>
                    </h6>
                  </MDBCol>

                  <MDBCol md="3">
                    <MDBInput id="n1"  value={teamForm.n1} onChange={(e) => handleInput(e)} wrapperClass="mb-2" required className="col-md-4" label=<span style={italicText}>Name</span> size="md" type="text"  />
                    <p style={myStyle}>{errors.n1}</p>
                  </MDBCol>

                  <MDBCol md="3">
                    <MDBInput id="e1" value={teamForm.e1}  onChange={(e) => handleInput(e)}  wrapperClass="mb-2" label=<span style={italicText}>Email</span>  size="md"  type="email"  required  className="col-md-4" />
                    <p style={myStyle}>{errors.e1}</p>
                  </MDBCol>

                  <MDBCol md="3">
                    <MDBInput id="ph1"  value={teamForm.ph1}  onChange={(e) => handleInput(e)}  label=<span style={italicText}>Phone Number</span>  type="phone"  required  className="col-md-4"  />
                    <p style={myStyle}>{errors.ph1}</p>
                  </MDBCol>
                </MDBRow>

                <MDBRow className="align-items-center pt-0 ">
                  <MDBCol md="3" className="ps-5">
                    <h6 className="mb-0">
                      Participant-2 <span style={{ color: "red" }}>*</span>
                    </h6>
                  </MDBCol>

                  <MDBCol md="3">
                    <MDBInput id="n2" value={teamForm.n2} onChange={(e) => handleInput(e)} wrapperClass="mb-2" required className="col-md-4" label=<span style={italicText}>Name</span> size="md" type="text" />
                    <p style={myStyle}>{errors.n2}</p>
                  </MDBCol>

                  <MDBCol md="3">
                    <MDBInput id="e2"  value={teamForm.e2}  onChange={(e) => handleInput(e)}  wrapperClass="mb-2"  label=<span style={italicText}>Email</span>  size="md"  type="email"  required  className="col-md-4" />
                    <p style={myStyle}>{errors.e2}</p>
                  </MDBCol>

                  <MDBCol md="3">
                    <MDBInput id="ph2" value={teamForm.ph2} onChange={(e) => handleInput(e)} label=<span style={italicText}>Phone Number</span> type="phone" required className="col-md-4" />
                    <p style={myStyle}>{errors.ph2}</p>
                  </MDBCol>
                </MDBRow>

                <MDBRow className="align-items-center pt-0 ">
                  <MDBCol md="3" className="ps-5">
                    <h6 className="mb-0">
                      Participant-3 <span style={{ color: "red" }}>*</span>
                    </h6>
                  </MDBCol>

                  <MDBCol md="3">
                    <MDBInput
                      id="n3"
                      value={teamForm.n3}
                      onChange={(e) => handleInput(e)}
                      wrapperClass="mb-2"
                      required
                      className="col-md-4"
                      label=<span style={italicText}>Name</span>
                      size="md"
                      type="text"
                    />
                    <p style={myStyle}>{errors.n3}</p>
                  </MDBCol>

                  <MDBCol md="3">
                    <MDBInput
                      id="e3"
                      value={teamForm.e3}
                      onChange={(e) => handleInput(e)}
                      wrapperClass="mb-2"
                      label=<span style={italicText}>Email</span>
                      size="md"
                      type="email"
                      required
                      className="col-md-4"
                    />
                    <p style={myStyle}>{errors.e3}</p>
                  </MDBCol>

                  <MDBCol md="3">
                    <MDBInput
                      id="ph3"
                      value={teamForm.ph3}
                      onChange={(e) => handleInput(e)}
                      label=<span style={italicText}>Phone Number</span>
                      type="phone"
                      required
                      className="col-md-4"
                    />
                    <p style={myStyle}>{errors.ph3}</p>
                  </MDBCol>
                </MDBRow>

                {/* ////////////////add button   //////////// */}

                {!addBtn && (
                  <div className="col-12" style={{ textAlign: "right" }}>
                    <MDBBtn onClick={handleAddBtn}>Add more</MDBBtn>
                  </div>
                )}


                {/* ///////////////////////add more /////////////////////////////////// */}

                {addBtn && (
                  <MDBRow className="align-items-center pt-0 pb-5">
                    <MDBCol md="3" className="ps-5">
                      <h6 className="mb-0">Participant-4</h6>
                    </MDBCol>

                    <MDBCol md="3">
                      <MDBInput
                        id="n4"
                        value={teamForm.n4}
                        onChange={(e) => handleInput(e)}
                        wrapperClass="mb-2"
                        label=<span style={italicText}>Name</span>
                        size="md"
                        type="text"
                      />
                    </MDBCol>

                    <MDBCol md="3">
                      <MDBInput
                        id="e4"
                        value={teamForm.e4}
                        onChange={(e) => handleInput(e)}
                        wrapperClass="mb-2"
                        label=<span style={italicText}>Email</span>
                        size="md"
                        type="email"
                      />
                      <p style={myStyle}>{errors.e4}</p>
                    </MDBCol>

                    <MDBCol md="3">
                      <MDBInput
                        id="ph4"
                        value={teamForm.ph4}
                        onChange={(e) => handleInput(e)}
                        label=<span style={italicText}>Phone Number</span>
                        type="phone"
                      />
                      <p style={myStyle}>{errors.ph4}</p>
                    </MDBCol>
                  </MDBRow>
                )}

{/* //////////////////////////////////////////////////////////////////////////////////////// */}
                {/* /////////////////////////Password/////////////////////////////////// */}

                <MDBRow className="align-items-center pt-0 ">
                  <MDBCol md="3" className="ps-5">
                    <h6 className="mb-0">
                      Password <span style={{ color: "red" }}>*</span>
                    </h6>
                  </MDBCol>

                  <MDBCol md="3">
                    <MDBInput
                      id="pass"
                      value={teamForm.pass}
                      onChange={(e) => handleInput(e)}
                      label=<span style={italicText}>Team Password</span>
                      type="password"
                    />
                    <p style={myStyle}>{errors.pass}</p>
                  </MDBCol>
                  <MDBCol md="3">
                    <MDBInput
                      id="confirmPassword"
                      value={password.confirmPassword}
                      onChange={(e) => handlePass(e)}
                      label=<span style={italicText}>
                        Confirm Team Password
                      </span>
                      type="password"
                    />
                    <p style={myStyle}>{errors.confirmPassword}</p>
                  </MDBCol>
                  <MDBCol md="3" className="align-items-center pt-2 pb-3">
                    <select md="3" id="domain" value={teamForm.domain} onChange={(e) => handleInput(e)} style={{ border: "0px solid black", borderRadius: "10px", height: "37px", width: "145px", backgroundColor: "#3b71ca", color: "white", boxShadow: "0 4px 9px -4px #3b71ca", }}>
                      <option value="">Select Domain</option>

                      {domain.map((value, index) => (
                        <option value={value.domainId}>
                          {value.domainName}
                        </option>
                      ))}
                    </select>
                    <p style={myStyle}>{errors.domain}</p>
                  </MDBCol>
                </MDBRow>

                {/* ////////////////////////////////domains/////////////////////////////////////// */}

                <MDBRow className="align-items-center pt-2 pb-3">
                  <MDBCol md="3" className="ps-5">
                    <h6 className="mb-0">
                      Problem Statement <span style={{ color: "red" }}>*</span>
                    </h6>
                  </MDBCol>

                  <MDBCol md="9" className="pe-5">
                    <MDBTextArea
                      id="problemS"
                      value={teamForm.problemS}
                      onChange={(e) => handleInput(e)}
                      label=<span style={italicText}>
                        Enter problem statement (Max. 500 characters limit)
                      </span>
                      rows={0}
                      style={{ resize: "none" }}
                      required
                      className="col-md-4"
                    />
                    <p style={myStyle}>{errors.problemS}</p>
                  </MDBCol>
                </MDBRow>

                <MDBRow className="align-items-center pt-2 pb-3">
                  <MDBCol md="3" className="ps-5">
                    <h6 className="mb-0">
                      Problem Description{" "}
                      <span style={{ color: "red" }}>*</span>
                    </h6>
                  </MDBCol>

                  <MDBCol md="9" className="pe-5">
                    <MDBTextArea
                      id="problemD"
                      value={teamForm.problemD}
                      onChange={(e) => handleInput(e)}
                      label=<span style={italicText}>
                        Enter problem description and proposed solution (Max. 5000 characters limit)
                      </span>
                      rows={3}
                      style={{ resize: "none" }}
                      required
                      className="col-md-4"
                    />
                    <p style={myStyle}>{errors.problemD}</p>
                  </MDBCol>
                </MDBRow>

                <div className="col-12">
                  <MDBBtn onClick={handleclick}>Submit Form</MDBBtn>
                  {isLoading && (
                    <MDBSpinner color='dark' style={{ marginTop: "5px", marginLeft:"40%" }} className="justify-content-center">
                        <span className='visually-hidden'>Loading...</span>
                    </MDBSpinner>
                )}
                </div>
                
              </MDBCardBody>
            </MDBCard>
          </MDBRow>
        </MDBContainer>
      </MDBValidation>
    </>
  );
}

export default RegistrationForm;
