
import { MDBRow, MDBCol } from "mdb-react-ui-kit";
import JudgeModal from "./JudgeModal";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../Components/Navbar2";
import FetchTeamData from '../../hooks/fetch-team-data';
import moment from "moment";
import Timers from "../../Components/Timers";


const Card = ({ teamObj, refetch }) => {
  const { teamId, teamName, idea } = teamObj
  return (
    <div className="ideaCard">
      <MDBRow>
        <MDBCol md="6">
          <h6 className="fw-bold">Team ID</h6>
        </MDBCol>
        <MDBCol md="6">
          <h6 className="fw-bold">Team Name</h6>
        </MDBCol>
      </MDBRow>
      <MDBRow>
        <MDBCol md="6">
          <h4 className="fw-bold">{teamId}</h4>
        </MDBCol>
        <MDBCol md="6">
          <h4 className="fw-bold">{teamName.substring(0,8)}</h4>
        </MDBCol>
      </MDBRow>
      <MDBRow>
      </MDBRow>
      <JudgeModal key={teamId} item={{ teamId, teamName, statement: idea.problemStatement, description: idea.description, teamObj }} refetch={refetch} />
    </div>
  );
};
function Judge() {
  const [team, setTeam] = useState([]);
  const [judgeData, setJudgeData] = useState(JSON.parse(localStorage.getItem("data")))

  ///////////////////got teams data from api//////////////////
  const { data, refetch } = FetchTeamData();

  /////////////////////////////////////////////



  useEffect(() => {
    setJudgeData(JSON.parse(localStorage.getItem("data")));
    // console.log(judgeData);
  }, [localStorage.getItem("data")])

  useEffect(() => {
    if (data) {
      const filtered = data?.data?.filter((value, index) => {
        if (judgeData.role_id == "3" && value?.gitHubLink && value?.idea?.demo && value.status === "accepted" && (value.judgeList == null || value.judgeList.indexOf((judgeData?.id).toString()) == -1)) {
          return true;
        }
        else return false;
      })
      setTeam(filtered)
    }
  }, [data]);

  const [event, setEvent] = useState([]);

  useEffect(() => {
    axios.get('/getEvent')
      .then(response => {
        setEvent(response.data);
      }, (error) => {
        console.log(error);
      });
  }, []);



  const currDate = moment().format("YYYY-MM-DD");

  let date = new Date(event[0]?.endDate);

  // add 2 days
  date.setDate(date.getDate() + 2);

  const evaluationDate = moment(date).format("YYYY-MM-DD");

  console.log(evaluationDate);
  ////////////////////////////////////

  return (
    <>
      <Navbar />
      <div className="cards">
      <MDBRow>
        <MDBCol>
          {event[0]?.endDate < currDate && (
            <Timers endDate={evaluationDate} />
          )}
        </MDBCol>
        <MDBCol>
          

            <h3 className="fw-bold mb-2 pb-2 pb-md-0 mb-md-4 text-center ">Judge Dashboard</h3>
            <h5 className="fw-bold mb-2 pb-2 pb-md-0 mb-md-4 text-center" style={{ margin: "-13px" }}>Welcome: {judgeData?.name} </h5>
        </MDBCol>
        <MDBCol></MDBCol>
      </MDBRow>

      <MDBRow>
      {event[0]?.endDate < currDate && currDate<= evaluationDate &&(
        <MDBRow>
          {team.map((value, index) => (
            <>
              <MDBCol style={{ marginBottom: "25px" }} md="4" key={index}>

                <Card teamObj={value} refetch={refetch} />
              </MDBCol>
            </>
          ))}
        </MDBRow>
        
      )}
      {event[0]?.endDate >= currDate && (
        <h2 className="fw-bold mb-2 pb-2 pb-md-0 mb-md-4 text-center " >Evaluation period will start after {event[0]?.endDate}</h2>
      )}
      </MDBRow>
      </div>
    </>);
}
export default Judge;