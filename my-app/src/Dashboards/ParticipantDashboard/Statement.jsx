/* import "react-datepicker/dist/react-datepicker.css";
import { MDBRow, MDBCol, MDBContainer } from "mdb-react-ui-kit";

const Card = ({ statement, description }) => {
  return (
    <div className="ideaCard">
      <MDBRow>
        <MDBCol md="4">
          <h5 className="fw-bold">Problem Statement</h5>
        </MDBCol>
        <MDBCol md="12">
          <h6 className="">{statement}</h6>
        </MDBCol>
      </MDBRow>
    </div>
  );
};
function Statement() {
  const data = [
    {
      statement:
        "Distinctio pariatur deserunt eos maiores! Quos, quia? Quos atque laudantium dolor impedit, libero rem quia possimus aut, voluptatem numquam hic, nostrum nulla officia enim?",
    },
  ];
  return (
    <div className="cards">
    
      <MDBRow>
        {data.map((value, index) => (
          <MDBCol md="12" key={index}>
            <Card {...value} />
          </MDBCol>
        ))}
      </MDBRow>
    </div>
  );
}
export default Statement; */
