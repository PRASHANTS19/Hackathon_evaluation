import { MDBCardBody, MDBTable, MDBBtn, MDBRow, MDBCard, MDBCol } from 'mdb-react-ui-kit';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar2 from '../../Components/Navbar2';
import { Popconfirm } from 'antd';
import { style } from '@mui/system';
import { CSVLink } from 'react-csv';
import { useNavigate, NavLink } from 'react-router-dom';


function ShowUsers() {

    const [user, setUser] = useState([]);
    const [team, setTeam] = useState([]);
    const [deleted, setDeleted] = useState(false);


    /////////////////////api calls//////////////////////
    useEffect(() => {
        axios.get('/getUsers')
            .then(response => {
                setUser(response.data);
                setDeleted(false);
            }, (error) => {
                console.log(error);
            });
    }, [deleted]);

    useEffect(() => {
        axios.get('/getTeam')
            .then(response => {
                setTeam(response.data);
                setDeleted(false);
            }, (error) => {
                console.log(error);
            });
    }, [deleted]);


    /////////////////////////////////////delete entry from data base////////////////////////////////////////

    const handleDelete = (id) => {

        axios.delete(`/deleteUser/${id}`)
            .then((response) => {
                console.log(response);
                setDeleted(true);
            }, (error) => {
                console.log(error);
            });

    }



    const panelistData = new Array();
    const panelistRows = user.map((info) => {
        if (info.role_id === 2) {
            panelistData.push(info);
            return (
                <tr>
                    <td>{info.email}</td>
                    <td>{info.name}</td>
                    <td>
                        <Popconfirm title="Delete"
                            description="Are you sure you want to delete the Panelist?"

                            okText="Confirm" cancelText="Cancel" onConfirm={(e) => handleDelete(info.id)} >
                            <MDBBtn className='me-1' color='danger' >Delete</MDBBtn>
                        </Popconfirm>
                    </td>
                </tr>
            );
        }
    });
    // console.log(panelistData);
    const headers = [
        { label: 'User ID', key: 'id' },
        { label: 'Name', key: 'name' },
        { label: 'Email', key: 'email' },
        { label: 'Phone Number', key: 'mobile' }

    ];

    const panelistcsvReport = {
        fileName: 'User_Details.csv', headers: headers, data: panelistData
    };

    const judgeData = new Array();
    const judgeRows = user.map((info) => {
        if (info.role_id === 3) {
            judgeData.push(info);
            return (
                <tr>
                    <td>{info.email}</td>
                    <td>{info.name}</td>
                    <td>
                        <Popconfirm title="Delete"
                            description="Are you sure you want to delete the Judge?"

                            okText="Confirm" cancelText="Cancel" onConfirm={(e) => handleDelete(info.id)} >
                            <MDBBtn className='me-1' color='danger' >Delete</MDBBtn>
                        </Popconfirm>
                    </td>
                </tr>
            );
        }
    });
    // console.log(judgeData);
    const judgecsvReport = {
        fileName: 'User_Details.csv', headers: headers, data: judgeData
    };

    const teamData = team;
    const participentRows = team.map((team) => {
        return (
            <tr>
                <td>{team.teamId}</td>
                <td>{team.teamName}</td>
                <td>{team.status}</td>
                <td>{team.marks}</td>
                {!team?.idea?.demo && (<td>No</td>)}
                {team?.idea?.demo && (<td>Yes</td>)}
            </tr>
        );
    });
    const teamHeader = [
        { label: 'Team ID', key: 'teamId' },
        { label: 'Team Name', key: 'teamName' },
        { label: 'Status', key: 'status' },
        { label: 'Marks', key: 'marks' },
        { label: 'Assigned Panelist ID', key: 'panelistId' }

    ];
    const teamcsvReport = {
        fileName: 'User_Details.csv', headers: teamHeader, data: teamData
    };

    return (
        <>
            <Navbar2 />
            <NavLink to="/AdminDashboard">
              
                <img src="https://icon-library.com/images/back-button-icon/back-button-icon-8.jpg" height="31px" width="51px" style={{ paddingLeft: "20px", marginBottom: "-50px"}}>
                </img>
              
              </NavLink>
        
            <MDBRow className='justify-content-center align-items-center m-5'>
                <MDBCard>
                    <MDBCardBody className='px-8'>
                        <MDBRow>
                            <MDBCol>
                                <h4 className="fw-bold mb-2 pb-2 pb-md-0 mb-md-2 ">Panelist table</h4>
                            </MDBCol>
                            <MDBCol  style={{   display: "flex", justifyContent: "right"}}>
                                <CSVLink {...panelistcsvReport}>
                                    Export to CSV
                                </CSVLink>
                            </MDBCol>
                        </MDBRow>
                        <MDBTable bordered borderColor="primary" className="text-break">
                            <thead>
                                <tr>
                                    <th style={{ width: "33%" }}>Email</th>
                                    <th style={{ width: "33%" }}>Name</th>
                                    <th style={{ width: "33%" }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>{panelistRows}</tbody>
                        </MDBTable>


                    </MDBCardBody>
                </MDBCard>
            </MDBRow>

            <MDBRow className='justify-content-center align-items-center m-5'>
                <MDBCard>
                    <MDBCardBody className='px-8'>
                        <MDBRow>
                            <MDBCol>
                                <h4 className="fw-bold mb-2 pb-2 pb-md-0 mb-md-2">Judge table</h4>
                            </MDBCol>
                            <MDBCol style={{   display: "flex", justifyContent: "right"}}>
                                <CSVLink {...judgecsvReport}>
                                    Export to CSV
                                </CSVLink>
                            </MDBCol>
                        </MDBRow>
                        <MDBTable bordered borderColor="primary" className="text-break">
                            <thead>
                                <tr>
                                    <th style={{ width: "33%" }}>Email</th>
                                    <th style={{ width: "33%" }}>Name</th>
                                    <th style={{ width: "33%" }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>{judgeRows}</tbody>
                        </MDBTable>


                    </MDBCardBody>
                </MDBCard>
            </MDBRow>

            <MDBRow className='justify-content-center align-items-center m-5'>
                <MDBCard>
                    <MDBCardBody className='px-8'>
                        <MDBRow>
                            <MDBCol>
                            <h4 className="fw-bold mb-2 pb-2 pb-md-0 mb-md-2">Team table</h4>
                            </MDBCol>
                            <MDBCol  style={{   display: "flex", justifyContent: "right"}}>
                                <CSVLink {...teamcsvReport}>
                                    Export to CSV
                                </CSVLink>
                            </MDBCol>
                        </MDBRow>
                        <MDBTable bordered borderColor="primary" className="text-break">
                            {/* <table className="table table-stripped"> */}
                            <thead>
                                <tr>
                                    <th style={{ width: "10%" }}>Id</th>
                                    <th style={{ width: "30%" }}>Name</th>
                                    <th style={{ width: "20%" }}>Status</th>
                                    <th style={{ width: "20%" }}>Marks</th>
                                    <th style={{ width: "20%" }}>Demo Submitted</th>
                                </tr>
                            </thead>
                            <tbody>{participentRows}</tbody>
                        </MDBTable>
                    </MDBCardBody>
                </MDBCard>
            </MDBRow>
        </>
    )
}

export default ShowUsers;