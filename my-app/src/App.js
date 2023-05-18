import "./App.css";
import "react-bootstrap/dist/react-bootstrap.min.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/LoginPage";
import RegistrationForm from "./Components/RegistrationForm";
import Frontpage from "./Components/Frontpage";
import Admin from "./Dashboards/AdminComponents/Admin";
import Navbar from "./Components/Navbar";
import Participant from "./Dashboards/ParticipantDashboard/Participant";
import Panelist from "./Dashboards/PanelistDashboard/Panelist";
import Judge from "./Dashboards/JugdeComponents/Judge";
import ChangePassword from './Components/ChangePassword';
import Protected from './Components/Protected';
import ShowUsers from "./Dashboards/AdminComponents/ShowUsers";
import UpdateEvent from "./Dashboards/AdminComponents/UpdateEvent";


function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Frontpage />} />
          <Route path="/logIn" element={<LoginPage />} />
          <Route path="/registrationForm" element={<RegistrationForm />} />
          <Route path="/AdminDashboard" element={<Protected Component={Admin} />} />
          <Route path="/participant" element={<Protected Component={Participant} />} />
          <Route path="/participant/:id" element={<Protected Component={Participant} />} />
          <Route path="/panelist" element={<Protected Component={Panelist} />} />
          <Route path="/judge" element={<Protected Component={Judge} />} />
          <Route path="/ChangePassword" element={<ChangePassword />} />
          <Route path="/showUsers" element={<Protected Component={ShowUsers} />} />
          <Route path="/updateEvent" element={<Protected Component={UpdateEvent} />} />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
