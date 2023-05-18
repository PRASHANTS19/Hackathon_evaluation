import React, { useEffect, useState } from "react";
import { MDBRange } from "mdb-react-ui-kit";
import axios from "axios";



export default function Marking() {
  const [ui, setUi] = useState(0);
  const [ppt, setPpt] = useState(0);
  const [workflow, setWorkflow] = useState(0);
  const [total, setTotal] = useState(0);


  useEffect(() => {
    let data = parseInt(ui) + parseInt(ppt) + parseInt(workflow);
    setTotal(data);

  }, [ui, ppt, workflow]);
  return (
    <div
      style={{
        padding: "10px",
      }}
    >
      <MDBRange defaultValue={ui} onChange={(e) => {setUi(e.target.value);}}
        min="0"
        max="10"
        step="1"
        id="customRange3"
        label={`User Interface - ${ui}`}
      />
      <MDBRange
        defaultValue={ppt}
        onChange={(e) => {
          setPpt(e.target.value);
        }}
        min="0"
        max="10"
        step="1"
        id="customRange3"
        label={`Presentation - ${ppt}`}
      />
      <MDBRange
        defaultValue={workflow}
        onChange={(e) => {
          setWorkflow(e.target.value);
        }}
        min="0"
        max="10"
        step="1"
        id="customRange3"
        label={`Workflow - ${workflow}`}
      />
      Total - {total}
    </div>
  );
}
