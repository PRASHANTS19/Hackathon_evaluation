import "react-datepicker/dist/react-datepicker.css";
import { MDBRow, MDBCol, MDBContainer } from "mdb-react-ui-kit";

const Card = ({ description }) => {
  return (
    <div className="ideaCard">
      <MDBRow>
        <MDBCol md="4">
          <h5 className="fw-bold">Problem Description</h5>
        </MDBCol>
        <MDBCol md="12">
          <h6 className="">{description}</h6>
        </MDBCol>
      </MDBRow>
    </div>
  );
};
function Description() {
  const data = [
    {
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit, illo nobis animi repellat minima sunt eum dicta amet ducimus, a neque veritatis voluptate modi id totam necessitatibus, eligendi voluptates? Sint sequi consequatur veniam officia unde blanditiis voluptas repudiandae tenetur nulla amet in eius ipsum soluta suscipit aliquam quo iusto, voluptatum dolores voluptates illo cupiditate ea omnis ex dolorem! Aut expedita, a ut placeat architecto atque est, necessitatibus reiciendis laborum totam, distinctio non libero consectetur quos voluptates cum illo dolore itaque! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit, illo nobis animi repellat minima sunt eum dicta amet ducimus, a neque veritatis voluptate modi id totam necessitatibus, eligendi voluptates? Sint sequi consequatur veniam officia unde blanditiis voluptas repudiandae tenetur nulla amet in eius ipsum soluta suscipit aliquam quo iusto, voluptatum dolores voluptates illo cupiditate ea omnis ex dolorem! Aut expedita, a ut placeat architecto atque est, necessitatibus reiciendis laborum totam, distinctio non libero consectetur quos voluptates cum illo dolore itaque!",
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
export default Description;
