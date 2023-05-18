import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import Form from "react-bootstrap/Form";
import { MDBCardBody, MDBInput, MDBTable, MDBTextArea, MDBBtn, MDBRow, MDBCard, MDBCol } from 'mdb-react-ui-kit';
import Navbar2 from '../../Components/Navbar2';
import Swal from 'sweetalert2';
import { useNavigate, NavLink } from 'react-router-dom';


function UpdateEvent() {
  const [event, setEvent] = useState({});
  const [usdatedEvent, setUpdatedEvent] = useState({});
  const [editBtn, setEditBtn] = useState(false);
  const [submitted, setSubmited] = useState(false);
  const [errors, serErrors] = useState({});


  useEffect(() => {
    axios.get("/getEvent").then(
      (response) => {
        setEvent(response.data[0]);
        setUpdatedEvent(response.data[0]);
      },
      (error) => {
        console.log(error);
      }
    );
  }, [editBtn]);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitted) {
      axios.post('/updateEvent', usdatedEvent)
        .then((response) => {
          Swal.fire('Great', 'Event updated successfully!', 'success'
          )
          setEditBtn(false);
        }, (error) => {
          console.log(error);
          Swal.fire({ icon: 'error', title: 'Oops...', text: 'Something went wrong!', })
        });

    }
    else {
      setSubmited(false);
    }
  }, [errors, submitted]);



  const handleEditBtn = () => {
    setEditBtn(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    serErrors(validate(usdatedEvent));
    setSubmited(true);
    // setEditBtn(false);
  }

  const handleInput = (e) => {
    const { id, value } = e.target;
    setUpdatedEvent({ ...usdatedEvent, [id]: value });
  }

  const validate = (usdatedEvent) => {
    const errorsObj = {};

    if (!usdatedEvent.eventName) {
      errorsObj.eventName = 'EventName is required';
    }
    else if (!usdatedEvent.startDate) {
      errorsObj.startDate = 'Please select a date';
    }
    else if(!usdatedEvent.endDate){
      errorsObj.endDate = 'Please select a date';
    }
    else if (usdatedEvent.startDate > usdatedEvent.endDate) {
      errorsObj.endDate = 'Enter valid date';
      errorsObj.startDate = 'Enter valid date';
    }
    else if (!usdatedEvent.description) {
      errorsObj.description = 'Description is required';
    }
    return errorsObj;
  }

  const myStyle = {
    color: 'red',
}


  return (
    <>
      <Navbar2 />
      <div> 
            <NavLink to="/AdminDashboard">
                <img src="https://icon-library.com/images/back-button-icon/back-button-icon-8.jpg" height="31px" width="51px" style={{ paddingLeft: "20px" }}>
                </img>
              </NavLink>
        <MDBRow className='justify-content-center align-items-center m-5' >
          <MDBCard >
            <MDBCardBody className='px-8'>
              <h4 className="fw-bold mb-2 pb-2 pb-md-0 mb-md-2 ">Current Event</h4>
              <MDBTable bordered borderColor="primary" className="text-break">
                <thead>
                  <tr >
                    <th style={{ width: "6%" }}>Id</th>
                    <th style={{ width: "25%" }}>Name</th>
                    <th style={{ width: "12%" }}>Start Date</th>
                    <th style={{ width: "12%" }}>End Date</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {EventRow} */}
                  <tr>
                    <td>{event?.eventId}</td>
                    <td>{event?.eventName}</td>
                    <td>{event?.startDate}</td>
                    <td>{event?.endDate}</td>
                    <td>{event?.description}</td>
                  </tr>
                </tbody>
              </MDBTable>
              {!editBtn && (
                <div className="col-12" style={{ textAlign: "right" }}>
                  <MDBBtn onClick={handleEditBtn}>Edit</MDBBtn>
                </div>
              )}

              {editBtn && (

                <MDBRow className='justify-content-center align-items-center m-5'>
                  <MDBCard>
                    <MDBCardBody className='px-8'>

                      <h4 className="fw-bold mb-2 pb-2 pb-md-0 mb-md-2">Update Event</h4>

                      <MDBRow className='align-items-center pt-0 '>
                        <MDBCol md='4' >
                          <MDBInput id="eventName" value={usdatedEvent.eventName} onChange={(e) => handleInput(e)} wrapperClass='mb-2' required className='col-md-4' label='Event Name' size='md' type='text' />
                          <p style={myStyle}>{errors.eventName}</p>
                        </MDBCol>


                        <MDBCol md='4' >
                          <div className="" style={{ bordeRadius: "50px", marginBottom: "15px" }}>
                            <Form.Control placeholder="Start date" label="Start Date" type="date" id="startDate" value={usdatedEvent.startDate} onChange={(e) => handleInput(e)} />
                            <p style={myStyle}>{errors.startDate}</p>
                          </div>

                        </MDBCol>

                        <MDBCol md='4' >
                          <div className="" style={{ bordeRadius: "50px", marginBottom: "15px" }}>
                            <Form.Control placeholder="End date" type="date" id="endDate" value={usdatedEvent.endDate} onChange={(e) => handleInput(e)} />
                            <p style={myStyle}>{errors.endDate}</p>
                          </div>

                        </MDBCol>

                        <MDBRow className='align-items-center pt-2 pb-3'>

                          <MDBCol md='3' className='ps-5'>
                            <h6 className="mb-0">Event Description</h6>
                          </MDBCol>

                          <MDBCol md='9' className='pe-5'>
                            <MDBTextArea id="description" value={usdatedEvent.description} onChange={(e) => handleInput(e)} label='' rows={3} style={{ resize: "none" }} required className='col-md-4' />
                            <p style={myStyle}>{errors.description}</p>
                          </MDBCol >
                        </MDBRow>
                      </MDBRow>
                      <div className='col-12 '>
                        <MDBBtn onClick={handleSubmit} >Update</MDBBtn>
                      </div>

                    </MDBCardBody>
                  </MDBCard>
                </MDBRow>
              )}

            </MDBCardBody>
          </MDBCard>
        </MDBRow>
      </div>
    </>
  )
}

export default UpdateEvent