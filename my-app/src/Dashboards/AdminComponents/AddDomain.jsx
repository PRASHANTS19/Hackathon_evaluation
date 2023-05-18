import { MDBSpinner, MDBListGroup, MDBListGroupItem, MDBCardBody, MDBCol, MDBRow, MDBCard, MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import { MDBIcon } from 'mdb-react-ui-kit';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import { FaTrash } from 'react-icons/fa';
import { Popconfirm } from 'antd';



function AddDomain() {
    const [errors, serErrors] = useState({});
    const [domains, setDomains] = useState({
        domainName: '',
    })
    const [domainData, setDomainData] = useState([]);
    const [deleted, setDeleted] = useState(false);




    /////////////////////////////Connect to server/////////////////////////////////////////////
    const [submitted, setSubmited] = useState(false);

    const [load, setLoad] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        if (Object.keys(errors).length === 0 && submitted) {
            setIsLoading(true);
            axios.post('/domain', domains)
                .then((response) => {
                    setIsLoading(false);
                    setLoad(false);
                    setDomains({ ...domains, domainName: '' });
                    setDomainData([...domainData, domains.domainName]);
                    Swal.fire("Great", "Domain added successfully!", "success");

                }, (error) => {
                    // console.log(error);
                    setIsLoading(false);
                    Swal.fire({ icon: "error", title: "Oops...", text: "Domain already exists" });
                    setDomains({ ...domains, domainName: '' });
                });
        }
        else {
            setSubmited(false);
        }
    }, [errors, submitted]);


    ///////////////////////////////////show domain data///////////////////////////////////////


    useEffect(() => {
        axios.get('/getDomain')
            .then(response => {
                // console.log( response.data);
                setDomainData(response.data);
                setDeleted(false);
            }, (error) => {
                console.log(error);

            });

    }, [load, deleted]);

    const italicText = {
        color: "#ccc",
      };


    const dropdownData = domainData.map((info,index) => {
        return (
            <>
                <MDBRow>
                    <MDBCol md='8' className="text-break"  >
                        <MDBListGroupItem  key={info}>{info.domainName}</MDBListGroupItem>
                    </MDBCol>
                    <MDBCol md='4' >
                        <Popconfirm title="Delete"
                            description="Are you sure you want to delete the domain?"

                            okText="Confirm" cancelText="Cancel" onConfirm={(e) => handleDelete(info.domainId)}>
                            <MDBBtn className='m-1' style={{ backgroundColor: '#ed302f' }}> <FaTrash /></MDBBtn>
                        </Popconfirm>
                    </MDBCol>

                </MDBRow>
            </>
        )
    });

    ////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////// delete domain ///////////////////////////////////////////////////////


    const handleDelete = (domainId) => {

        axios.delete(`/deleteDomain/${domainId}`)
            .then((response) => {
                // console.log(response);
                Swal.fire("Great", "Domain deleted successfully!", "success");
                setDeleted(true);

            }, (error) => {
                Swal.fire({ icon: "error", title: "Oops...", text: "Domain in use" });
                console.log(error);
            });

    }

    ///////////////////////////////////////////////////////////////////////////////////////////////


    ////////////////////////////////Add domiain////////////////////////////////////////

    const handleAdd = (e) => {
        e.preventDefault();
        serErrors(validate(domains));
        setSubmited(true);
        setLoad(true);
    }

    const handleInput = (e) => {
        const { id, value } = e.target;
        setDomains({ ...domains, [id]: value });
    }

    ///////////////////////////////////////////////////////////////////////////////////

    ////////////////////////////Validations on domain ///////////////////////////////
    
    const validate = (domains) => {
        const errorsObj = {};
        if (!domains.domainName) {
            errorsObj.domainName = 'Write a domain name';
        }
        return errorsObj;
    }


    const myStyle = {
        color: 'red'
    }
    return (
        <>
            <MDBRow className='justify-content-center align-items-center m-5'>
                <MDBCard>
                    <MDBCardBody className='px-8'>

                        <h4 className="fw-bold mb-2 pb-2 pb-md-0 mb-md-2">Add Domain</h4>

                        <MDBRow className='align-items-center pt-0 '>
                            <MDBCol md='4' >
                                <MDBInput id="domainName" value={domains.domainName} onChange={(e) => handleInput(e)} wrapperClass='mb-2' required className='col-md-4' label=<span style={italicText}>Domain</span>  size='md' type='text' />
                                <p style={myStyle}>{errors.domainName}</p>
                            </MDBCol>

                            {/* sbow doamin list */}
                            <MDBCol md='5' >
                                <MDBListGroup style={{ overflow: "hidden", overflowY: "scroll", maxHeight: "200px", minWidth: '22rem' }}>
                                    {dropdownData}
                                </MDBListGroup>
                            </MDBCol>
                        </MDBRow>


                        <div className='col-12 '>
                            <MDBBtn onClick={handleAdd} >Add</MDBBtn>
                        </div>

                    </MDBCardBody>
                </MDBCard>
                {isLoading && (
                    <MDBSpinner color='dark' style={{ marginTop: "5px" }} className="justify-content-center">
                        <span className='visually-hidden'>Loading...</span>
                    </MDBSpinner>
                )}

            </MDBRow></>
    )
}

export default AddDomain;