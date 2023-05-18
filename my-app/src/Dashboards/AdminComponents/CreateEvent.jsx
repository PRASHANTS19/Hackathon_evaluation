import { MDBSpinner, MDBTextArea, MDBCardBody, MDBCol, MDBRow, MDBCard, MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import { useState, useEffect } from 'react';
import Form from "react-bootstrap/Form";
import axios from 'axios';
import Swal from 'sweetalert2';

function CreateEvent() {
    const [errors, serErrors] = useState({});
    const [event, setEvent] = useState({
        eventName: '',
        startDate: '',
        endDate: '',
        description: '',
    });

    const [submitted, setSubmited] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    /////////////////////////////Connect to server/////////////////////////////////////////////

    useEffect(() => {
        if (Object.keys(errors).length === 0 && submitted) {
            setIsLoading(true);
            axios.post('/event', event)
                .then((response) => {
                    setIsLoading(false);
                    Swal.fire(
                        'Great',
                        'Event added successfully!',
                        'success'
                    )
                    setEvent({ ...event, eventName: '', startDate: '', endDate: '', description: '' });
                }, (error) => {
                    console.log(error);
                    setIsLoading(false);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    })
                });

        }
        else {
            setSubmited(false);
        }
    }, [errors, submitted]);


    const handleSubmit = (e) => {
        e.preventDefault();
        serErrors(validate(event));
        setSubmited(true);
    }

    const handleInput = (e) => {
        const { id, value } = e.target;
        setEvent({ ...event, [id]: value });
    }

    ////////////////validations check for event////////////////////////////

    const validate = (event) => {
        const errorsObj = {};

        if (!event.eventName) {
            errorsObj.eventName = 'EventName is required';
        }
        if (!event.description) {
            errorsObj.description = 'Description is required';
        }
        if (!event.startDate || !event.endDate) {
            errorsObj.endDate = 'Please select a date';
            errorsObj.startDate = 'Please select a date';
        }
        if (event.startDate > event.endDate) {
            errorsObj.endDate = 'Enter valid date';
            errorsObj.startDate = 'Enter valid date';
        }
        return errorsObj;
    }
    const myStyle = {
        color: 'red'
    }
      const italicText = {
    color: "#ccc",
  };
    return (
        <>
            <MDBRow className='justify-content-center align-items-center m-5'>
                <MDBCard>
                    <MDBCardBody className='px-8'>

                        <h4 className="fw-bold mb-2 pb-2 pb-md-0 mb-md-2">Create Event</h4>

                        <MDBRow className='align-items-center pt-0 '>
                            <MDBCol md='4' >
                                <MDBInput id="eventName" value={event.eventName} onChange={(e) => handleInput(e)} wrapperClass='mb-2' required className='col-md-4' label = <span style={italicText}>Event Name</span> size='md' type='text' />
                                <p style={myStyle}>{errors.eventName}</p>
                            </MDBCol>


                            <MDBCol md='4' >
                                <div className="" style={{ bordeRadius: "50px", marginBottom: "15px" }}>
                                    <Form.Control
                                        placeholder="Start date"
                                        label=<span style={italicText}>Start Date</span>
                                        type="date"
                                        id="startDate"
                                        value={event.startDate}
                                        onChange={(e) => handleInput(e)}
                                    />
                                    <p style={myStyle}>{errors.startDate}</p>
                                </div>

                            </MDBCol>

                            <MDBCol md='4' >
                                <div className="" style={{ bordeRadius: "50px", marginBottom: "15px" }}>
                                    <Form.Control
                                        placeholder="End date"
                                        type="date"
                                        id="endDate"
                                        value={event.endDate}
                                        onChange={(e) => handleInput(e)}
                                    />
                                    <p style={myStyle}>{errors.endDate}</p>
                                </div>

                            </MDBCol>

                            <MDBRow className='align-items-center pt-2 pb-3'>

                                <MDBCol md='3' className='ps-5'>
                                    <h6 className="mb-0">Event Description</h6>
                                </MDBCol>

                                <MDBCol md='9' className='pe-5'>
                                    <MDBTextArea id="description" value={event.description} onChange={(e) => handleInput(e)} label=<span style={italicText}>Max. 5000 characters limit</span> rows={3} required className='col-md-4' />
                                    <p style={myStyle}>{errors.description}</p>
                                </MDBCol>

                            </MDBRow>
                        </MDBRow>
                        <div className='col-12 '>
                            <MDBBtn onClick={handleSubmit} >Create</MDBBtn>
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

export default CreateEvent;