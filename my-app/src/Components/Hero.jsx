import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";


const Hero = () => {
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
      <div style={{ margin: '-105px 0px 20px'}} className="max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center">

        <h1 className="md:text-7xl sm:text-6xl text-4xl font-bold md:py-6" style={{ margin: '110px 0 0 0' }}>Hackcedo
          <div className='text-[#ee4714] md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>2023</div>
        </h1>

        <p className="md:text-l text-justified text-white-500">
          Hackathons which help you put your coding skills to work.
          Hackcedo is essentially online tool that help people manage their projects within a set timeframe. Project creation, progress tracking, deadlines, prize organization - this platform has it all.
        </p>

        {currDate >= event.startDate && currDate <= event.endDate && (
          <Link to="/registrationForm">
            <button className="bg-[#3b71ca] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-white">
              Register
            </button>
          </Link>
        )}
      </div>
    </>
  );
};

export default Hero;
