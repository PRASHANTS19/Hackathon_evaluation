// import "react-datepicker/dist/react-datepicker.css";
import { MDBRow, MDBCardHeader, MDBCardFooter, MDBCol, MDBTextArea, MDBBtn, MDBCard, MDBCardTitle, MDBCardText, MDBContainer, MDBCardBody } from "mdb-react-ui-kit";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Timers from "../../Components/Timers";


//////////////////////////////////////////////new card///////////////////////////////////////////////////////////

const Card1 = ({ teamObj }) => {
  const { name, team } = teamObj;
  // console.log(teamObj);



  return (
    <MDBCard alignment='center' style={{ marginBottom: "20px" }}>

      <MDBCardHeader>Team Id: {team?.teamId}</MDBCardHeader>
      <MDBCardHeader>Team Name: {team?.teamName}</MDBCardHeader>
      <MDBCardHeader>Participant Name: {name}</MDBCardHeader>
      <MDBCardBody>
        <MDBCardTitle>Problem Statement: {team?.idea?.problemStatement}</MDBCardTitle>
        <MDBCardText>Problem Description: {team?.idea?.description}</MDBCardText>
      </MDBCardBody>
      {team?.status == "reverted" && (
        <MDBBtn href='#' color='warning' disabled>Idea Status: {team?.status}</MDBBtn>
      )}
      {team?.status == "accepted" && (
        <MDBBtn href='#' color='success' disabled>Idea Status: {team?.status}</MDBBtn>
      )}
      {team?.status == "rejected" && (
        <MDBBtn href='#' color='danger' disabled>Idea Status: {team?.status}</MDBBtn>
      )}
      {team?.status == "pending" && (
        <MDBBtn href='#' color='info' disabled>Idea Status: {team?.status}</MDBBtn>
      )}

      {/* </MDBCardFooter> */}
    </MDBCard>

  )
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////

function TeamDetails({ userObj }) {
  const [teamData, setTeamData] = useState({});
  const [flag, setFlag] = useState(false);


  ////////////////////////////////////updated statemnt///////////////////////////////////////////////////////
  const [update, setUpdate] = useState({
    updatedStatement: '',
    updatedDescription: ''
  });

  const handleInput = (e) => {
    const { id, value } = e.target;
    setUpdate({ ...update, [id]: value });
  };
  const [Submit, setSubmit] = useState(false);

  useState(() => {
    setSubmit(false);
  }, [Submit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!update?.updatedStatement || !update?.updatedDescription) {
      Swal.fire({
        icon: "error", title: "Oops...", text: "Statement or description is empty!"
      });
    }
    else {
      teamData.team.idea.problemStatement = update?.updatedStatement;
      teamData.team.idea.description = update?.updatedDescription;
      teamData.team.status = "pending";

      axios.post("/updatedIdea", teamData.team).then(
        (response) => {
          setSubmit(true);
          Swal.fire("Great", "Idea sent succesfully!", "success");
        },
        (error) => {
          console.log(error);
          Swal.fire({
            icon: "error", title: "Oops...", text: "Something went wrong!",
          });
        }
      );
    }
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/particpantsDetails/${userObj?.email}`).then(
      (response) => {
        setTeamData(response.data);
        setFlag(true)
      },
      (error) => {
        console.log("this is error in team detail", error);
      }
    );
  }, []);


  return (
    <>

      <div className="cards">
        <MDBRow>
          <MDBCol><Timers /></MDBCol>
          <MDBCol>
            <h3 className="fw-bold mb-2 pb-2 pb-md-0 mb-md-4 text-center ">
              Participant Details
            </h3>
          </MDBCol>
          <MDBCol></MDBCol>
        </MDBRow>

        {flag && (
          <>
            <MDBRow>
              <MDBCol lg="6" class="d-flex justify-content-center align-items-center" >
                <Card1 teamObj={teamData} />
              </MDBCol>
            </MDBRow>
          </>
        )}
        {flag && teamData?.team?.status == "reverted" && (
          <>
            <div >
              <MDBRow>
                <MDBCol>
                  <MDBTextArea style={{ resize: "none" }} label='Update your problem statement' id='updatedStatement' value={update.updatedStatement} onChange={(e) => handleInput(e)} rows={3} />
                </MDBCol>
                &nbsp;
                <MDBCol>
                  <MDBTextArea style={{ resize: "none" }} label='Update your problem description' id='updatedDescription' value={update.updatedDescription} onChange={(e) => handleInput(e)} rows={3} />
                </MDBCol>
              </MDBRow>
              <MDBBtn style={{ margin: "5px 5px" }} onClick={handleSubmit}>Submit</MDBBtn>
            </div>
          </>
        )}
      </div>
    </>
  );
}
export default TeamDetails;