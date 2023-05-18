
import { MDBRow, MDBCol, MDBCard, MDBCardBody, } from "mdb-react-ui-kit";
import "./Panelist.css";
import PanelistModal from "./PanelistModal";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../Components/Navbar2";
import moment from "moment";
import FetchTeamData from "../../hooks/fetch-team-data";
import Timers from "../../Components/Timers";

const Card = ({ teamObj, refetch, isLoading }) => {

  const { teamId, teamName, idea } = teamObj;
  return (
    <div className="teamCard">
      {!isLoading && teamObj?.newComment && (
        <MDBCard style={{ backgroundColor: "#fcf2b3" }}>
          <MDBCardBody >
            <MDBRow>
              <MDBCol md="6">
                <MDBRow>
                  <h6 className="fw-bold">Team ID</h6>
                </MDBRow>
                <MDBRow>
                  <h4 className="fw-bold">{teamId}</h4>
                </MDBRow>
              </MDBCol>
              <MDBCol md="6">
                <MDBRow>
                  <h6 className="fw-bold">Team Name</h6>
                </MDBRow>
                <MDBRow>
                  <h4 className="fw-bold">{teamName.substring(0,8)}</h4>
                </MDBRow>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <PanelistModal item={{ teamId, teamName, statement: idea.problemStatement, description: idea.description, teamObj, }} refetch={refetch} />
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      )}
      {!teamObj?.newComment && (
        <MDBCard >
          <MDBCardBody >
            <MDBRow>
              <MDBCol md="6">
                <MDBRow>
                  <h6 className="fw-bold">Team ID</h6>
                </MDBRow>
                <MDBRow>
                  <h4 className="fw-bold">{teamId}</h4>
                </MDBRow>
              </MDBCol>
              <MDBCol md="6">
                <MDBRow>
                  <h6 className="fw-bold">Team Name</h6>
                </MDBRow>
                <MDBRow>
                  <h4 className="fw-bold">{teamName.substring(0,8)}</h4>
                </MDBRow>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <PanelistModal
                item={{ teamId, teamName, statement: idea.problemStatement, description: idea.description, teamObj, }} refetch={refetch} />
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      )}
    </div>
  );
};
function Panelist() {
  const [team, setTeam] = useState([]);


  const [panelist, setPanelist] = useState(JSON.parse(localStorage.getItem("data")));
  useEffect(() => {
    setPanelist(JSON.parse(localStorage.getItem("data")));

  }, [localStorage.getItem("data")])


  const { data, refetch, isLoading } = FetchTeamData();

  useEffect(() => {
    if (data) {
      const filtered = data?.data?.filter((value, index) => {
        if (value?.status === "pending" && (!value?.panelistId || value?.panelistId == panelist.id)) return true;
        else return false;
      })
      setTeam(filtered)
    }
  }, [data]);

  ////////////////////////////date (only show to penalist before enddate)///////////////////////////////////////////////

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
    <>
      <Navbar />
      <div className="cards">
        <MDBRow>
          <MDBCol>
            <Timers />
          </MDBCol>
          <MDBCol>
            <h3 className="fw-bold mb-2 pb-2 pb-md-0 mb-md-4 text-center ">Panelist Dashboard</h3>
            <h5 className="fw-bold mb-2 pb-2 pb-md-0 mb-md-4 text-center" style={{ margin: "-13px" }}>Welcome: {panelist?.name} </h5>
          </MDBCol>
          <MDBCol></MDBCol>
        </MDBRow>
        {event?.endDate >= currDate && (
          <MDBRow>
            {team.map((value, index) => (
              <MDBCol style={{ marginBottom: "25px" }} md="4" key={index}>
                <Card teamObj={value} refetch={refetch} isLoadint={isLoading} />
              </MDBCol>
            ))}
          </MDBRow>
        )}
      </div>

      {event?.endDate < currDate && (
        <h2 style={{ color: "red" }} class="text-center">Event ended</h2>
      )}
    </>
  );
}
export default Panelist;
