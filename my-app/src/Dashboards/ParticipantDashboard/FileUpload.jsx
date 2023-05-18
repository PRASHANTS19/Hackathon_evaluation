import { MDBFile, MDBInput, MDBBtn,MDBSpinner } from "mdb-react-ui-kit";
import Swal from "sweetalert2";
import axios from "axios";

import React, { useState, useEffect } from 'react';

function FileUpload({ userObj }) {


  const [selectedFile, setSelectedFile] = useState(null);
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    // setSubmit(false);
  }, [submit])



  function handleFileInput(e) {
    setSelectedFile(e.target.files[0]);
  }

  const [isLoading, setIsLoading] = useState(false);

  let handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedFile) {
      Swal.fire({ icon: 'error', title: 'Oops...', text: 'Please choose a file!', })
    }
    else if (selectedFile.type != "video/mp4") {
      Swal.fire({ icon: 'error', title: 'Oops...', text: 'File should be in .mp4 format!', })
    }
    else {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('ideaId', userObj.ideaId);

      setIsLoading(true);
      axios.post('/upload', formData)
        .then((response) => {
          setIsLoading(false);
          setSubmit(true);
          Swal.fire('Great', 'Video uploaded successfully!', 'success')
        }, (error) => {
          setIsLoading(false);
          Swal.fire({ icon: 'error', title: 'Oops...', text: 'Please upload the video!', })
        });
    }
    return false;
  }

  return (
    <>
      {submit == false && (
        <>
          <MDBFile label="Upload the presentation video in '.mp4' format only" onChange={handleFileInput} />
          <br />
          <MDBBtn onClick={handleSubmit} >Upload</MDBBtn>
          &nbsp;&nbsp;&nbsp;
          {isLoading && (
            <MDBSpinner color='dark' style={{ marginTop: "5px" }} className="justify-content-center">
              <span className='visually-hidden'>Loading...</span>
            </MDBSpinner>
          )}
        </>

      )}
    </>
  );
}

export default FileUpload;


