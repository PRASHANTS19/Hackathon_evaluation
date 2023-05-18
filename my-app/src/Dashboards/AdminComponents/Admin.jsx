import { MDBContainer, MDBBtn ,MDBSpinner} from 'mdb-react-ui-kit';
// import 'react-datepicker/dist/react-datepicker.css';
import AddJudges from './AddJudges';
import CreateEvent from './CreateEvent';
import AddDomain from './AddDomain';
import { useState, useEffect } from 'react';
import ShowUsers from './ShowUsers';
import axios from 'axios';
import Navbar from '../../Components/Navbar2';
import { Link, useNavigate } from "react-router-dom";
import moment from 'moment';
import Swal from 'sweetalert2';




function Admin() {

  const navigate = useNavigate();

  //////////////////show user button////////////////////////

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/showUsers");
  }

  /////////////////update event/////////////////////////////
  const handleEvent = (e) => {
    e.preventDefault();
    navigate("/updateEvent");
  }

  ////////////////////handle mail for winners/////////////////
  const [isLoading, setIsLoading] = useState(false);
  const handleMail = (e) => {
    e.preventDefault();
    setIsLoading(true);
    event.result = "true";
    axios.post("/winnersMail", event).then(
      (response) => {
        setIsLoading(false);
        Swal.fire('Great', 'Result declared and Mail sent successfully!', 'success');
      },
      (error) => {
        setIsLoading(false);
        console.log(error);
      }
    );
  }


  //////////////////////api call to check if all judges judged all ideas/////////////////////
  const [allDone,setAllDone] = useState(false);
  axios.get("/allJudges").then(
    (response) => {
      // console.log(response.data);
      setAllDone(response.data);
    },
    (error) => {
      console.log(error);
    }
  );

  //////////////////////api call for get the event/////////////////////
  
  const [event, setEvent] = useState({});
  useEffect(() => {
    axios.get("/getEvent").then(
      (response) => {
        setEvent(response.data[0]);
      },
      (error) => {
        console.log(error);
      }
    );

  }, []);

  const currDate = moment().format("YYYY-MM-DD");
  let date = new Date(event?.endDate);
  // add 2 days
  date.setDate(date.getDate() + 2);
  const evaluationDate = moment(date).format("YYYY-MM-DD");


  return (
    <>
      <Navbar />

      <MDBContainer fluid>
        {/* //////////////////////add judges/////////////////// */}
        <AddJudges />


        {/* ////////////////show alll //////////////////////////*/}
        <div className="col text-center">
          <MDBBtn onClick={handleSubmit} className="btn btn-default" style={{ width: "25%" }}> Show Users</MDBBtn>
        </div>


        {/* ///////////////////create event///////////////////////////// */}

        <CreateEvent />

        {/* /////////////////////Edit event ////////////////////////////////////////////////// */}
        <div className="col text-center">
          <MDBBtn onClick={handleEvent} className="btn btn-default" style={{ width: "25%" }}> Update Event</MDBBtn>
        </div>


        {/* /////////////////////////////add domain ///////////////////*/}

        <AddDomain />

        {/* /////////////////////////////send mail to winners///////////////////////////////////// */}
        { (currDate>evaluationDate || allDone) &&(
          <div className="col text-center">
            <MDBBtn onClick={handleMail} className="btn btn-default" style={{ width: "25%", marginBottom: "5%" }}> Declare Results</MDBBtn>
          </div>
        )}
        <div style={{display:"flex", justifyContent:"center"}}>
        {isLoading && (
          <MDBSpinner color='dark' style={{ marginTop: "-4%" , marginBottom:"2%"}} className="justify-content-center">
            <span className='visually-hidden'>Loading...</span>
          </MDBSpinner>
        )}
        </div>

      </MDBContainer>
    </>
  )
}
export default Admin;