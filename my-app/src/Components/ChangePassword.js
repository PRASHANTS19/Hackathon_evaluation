import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar2 from './Navbar2';
import Swal from "sweetalert2";



function ChangePassword() {
  const [isSubmit, setSubmit] = useState(false);
  const navigate = useNavigate();
  const [errors, serErrors] = useState({});
  const [selectedOption, setSelectedOption] = useState("");
  const [addBtn, setAddBtn] = useState(false);
  const [password, setPassword] = useState({
    confirmPassword: "",
  });

  const myStyle = {
    color: 'red'
  }

//////////////////////// State for managing password ////////////////////////
  const [teamForm, setTeamForm] = useState({
    email: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword:'',
  });

  const handlePass = (e) => {
    const { id, value } = e.target;
    setPassword({ ...password, [id]: value });
  }

  const handleInput = (e) => {
    const { id, value } = e.target;
    setTeamForm({ ...teamForm, [id]: value });
  }

  const handleclick = (e) => {
    e.preventDefault();
    serErrors(validate(teamForm));
    setSubmit(true);
  }

  ///////////////////////post api//////////////////////////
  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmit) {
      axios.post('/ChangePassword', teamForm)
        .then((response) => {
          console.log(response);
          Swal.fire("Great",
            "Password Updated Successfully!",
            "success");
          window.status = 'Login';
          window.login = false;
          navigate("/logIn")

        }, (error) => {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Incorrect Username or Password',
          });
        });

    }
  }, [errors]);

  /////////////////////validations//////////////////////
  const validate = (teamForm) => {

    const errorsObj = {};

    if (!teamForm.email) {
      errorsObj.email = 'Email is required';
    }
    else if (!teamForm.oldPassword) {
      errorsObj.oldPassword = 'Password is required';
    }
    else if (!teamForm.newPassword) {
      errorsObj.newPassword = 'Password is required';
    }
    else if (teamForm.newPassword.length < 8) {
      errorsObj.newPassword = 'Minimum password length is 8';
    }
    else if (teamForm.oldPassword == teamForm.newPassword) {
      errorsObj.newPassword = 'Cannot be same as old password';
    }
    else if (!teamForm.confirmPassword) {
      errorsObj.confirmPassword = 'Enter confirm password';
    }
    else if (teamForm.newPassword !== teamForm.confirmPassword) {
      errorsObj.confirmPassword = 'Confirm password is not matched';
    }

    return errorsObj;
  }

  return (
    <>
      <Navbar2 />
      <MDBContainer fluid className="p-3 my-5 h-custom">


        <MDBRow>

          <MDBCol col='10' md='6'>
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample image" />
          </MDBCol>

          <MDBCol col='4' md='6'>
            <MDBInput id="email" value={teamForm.email} onChange={(e) => handleInput(e)} wrapperClass='mb-4' label='Email address' type='email' size="lg" />
            <p style={myStyle}>{errors.email}</p>
            <MDBInput id="oldPassword" value={teamForm.oldPassword} onChange={(e) => handleInput(e)} wrapperClass='mb-4' label='Old Password' type='password' size="lg" />
            <p style={myStyle}>{errors.oldPassword}</p>
            <MDBInput id="newPassword" value={teamForm.newPassword} onChange={(e) => handleInput(e)} wrapperClass='mb-4' label='New Password' type='password' size="lg" />
            <p style={myStyle}>{errors.newPassword}</p>
            <MDBInput id="confirmPassword" value={teamForm.confirmPassword} onChange={(e) => handleInput(e)} wrapperClass='mb-4' label='Confirm New Password' type='password' size="lg" />
            <p style={myStyle}>{errors.confirmPassword}</p>

            <div className='col-12'>
              <MDBBtn onClick={handleclick} type='submit' className='bg-primary shadow-1-strong'> Change Password </MDBBtn>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}

export default ChangePassword;

