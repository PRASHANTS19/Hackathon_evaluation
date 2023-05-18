import { MDBCardBody, MDBCol, MDBSpinner, MDBRow, MDBCard, MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';


function AddJudges() {
    const [judges, setJudges] = useState({
        name: '',
        email: '',
        mobile: '',
        role_id: 2,
        password: '',
    });

    const [errors, serErrors] = useState({});
    const [submitted, setSubmited] = useState(false);
    const [isLoading, setIsLoading] = useState(false);



    /////////////////////////////Connect to server/////////////////////////////////////////////
    useEffect(() => {
        if (Object.keys(errors).length === 0 && submitted) {
            setIsLoading(true);
            if (!judges.role_id) {
                Swal.fire({ icon: 'error', title: 'Oops...', text: 'Compulsory field!' })
            }
            else {
                axios.post('/user', judges)
                    .then((response) => {
                        if (parseInt(judges.role_id) === 2) {
                            Swal.fire(
                                'Great',
                                'Panelist added successfully!',
                                'success'
                            )
                            setJudges({ ...judges, name: '', email: '', mobile: '', role_id: 2, password: '' });
                        }
                        else if (parseInt(judges.role_id) === 3) {
                            Swal.fire(
                                'Great',
                                'Judge added successfully!',
                                'success'
                            )
                            setJudges({ ...judges, name: '', email: '', mobile: '', role_id: 3, password: '' });
                        }

                    }, (error) => {
                        Swal.fire({ icon: 'error', title: 'Oops...', text: 'User already exist!', })
                    });
            }
            setIsLoading(false);
        }

        else {
            setSubmited(false);
        }

    }, [errors, submitted]);


    //////////////////////////////handle add judges button////////////////////////////////////////////////

    const handleSubmit = (e) => {
        e.preventDefault();
        serErrors(validate(judges));
        setSubmited(true);
    }

    const handleInput = (e) => {
        const { id, value } = e.target;
        setJudges({ ...judges, [id]: value });

    }


    const myStyle = {
        color: 'red'
    }
    const italicText = {
        color: "#ccc",
      };

    const handleRole = (e) => {
        const x = e.target.value;
        setJudges({ ...judges, role_id: parseInt(x) });
    }


    /////////////////////validations for judge//////////////////////////////

    const validate = (judges) => {
        const errorsObj = {};
        const regex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i;
        const regexPh = /^\d{10}$/i;
        if (!judges.name) {
            errorsObj.name = 'Name is required';
        }
        if (!judges.email) {
            errorsObj.email = 'Email is required';
        }
        else if (!regex.test(judges.email)) {
            errorsObj.email = "This is not a valid email";
        }
        if (!judges.mobile) {
            errorsObj.mobile = 'Number is required';
        }
        else if (!regexPh.test(judges.mobile)) {
            errorsObj.mobile = "Enter valid phone number";
        }
        if (!judges.password) {
            errorsObj.password = 'Password is required';
        }
        else if (judges.password.length < 8) {
            errorsObj.password = 'Minimum password length is 8';
        }

        return errorsObj;
    }
    return (
        <>
            <MDBRow className='justify-content-center align-items-center m-5'>
                <h3 className="fw-bold mb-2 pb-2 pb-md-0 mb-md-4 text-center ">Admin Dashboard</h3>
                <MDBCard>
                    <MDBCardBody className='px-8'>

                        <h4 className="fw-bold mb-2 pb-2 pb-md-0 mb-md-2">Add new Judge/Panelist</h4>

                        <MDBRow className='align-items-center pt-0 '>
                            <MDBCol md='3' >
                                <MDBInput id="name" value={judges.name} onChange={(e) => handleInput(e)} wrapperClass='mb-2' required className='col-md-4' label=<span style={italicText}>Name</span> size='md' type='text' />
                                <p style={myStyle}>{errors.name}</p>
                            </MDBCol>

                            <MDBCol md='3'>
                                <MDBInput id="email" value={judges.email} onChange={(e) => handleInput(e)} wrapperClass='mb-2' label=<span style={italicText}>Email</span> size='md' type='email' required className='col-md-4' />
                                <p style={myStyle}>{errors.email}</p>
                            </MDBCol>

                            <MDBCol md='3'>
                                <MDBInput id="mobile" type="phone" value={judges.mobile} onChange={(e) => handleInput(e)} label=<span style={italicText}>Phone Number</span> required className='col-md-4' />
                                <p style={myStyle}>{errors.mobile}</p>
                            </MDBCol>

                            {/* /////////  password  ////////////////////////// */}

                            <MDBCol md='3' >
                                <MDBInput id="password" value={judges.password} onChange={(e) => handleInput(e)} label=<span style={italicText}>Password</span> type='password' />
                                <p style={myStyle}>{errors.password}</p>
                            </MDBCol>
                        </MDBRow>

                        <MDBRow className=' pb-md-2'>
                            <div style={{ width: "20vw" }}>
                                <select defaultValue={2} value={judges.role_id} onChange={(e) => {
                                    setJudges({
                                        ...judges,
                                        role_id: e.target.value
                                    })
                                }}>
                                    <option value={2} defaultChecked >Panelist</option>
                                    <option value={3}  >Judge</option>

                                </select>
                            </div>

                        </MDBRow>
                        <div className='col-12 '>
                            <MDBBtn onClick={handleSubmit} >Add</MDBBtn>
                        </div>
                    </MDBCardBody>
                </MDBCard>
                {isLoading && (
                    <MDBSpinner color='dark' style={{ marginTop: "5px" }} className="justify-content-center">
                        <span className='visually-hidden'>Loading...</span>
                    </MDBSpinner>
                )}

            </MDBRow>

        </>
    )
}

export default AddJudges;