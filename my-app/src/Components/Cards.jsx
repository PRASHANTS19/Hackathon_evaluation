import React from "react";
import { useEffect, useState } from "react";
import Double from "../assets/double.png";
import axios from "axios";


const Cards = () => {

  const [winners, setWinners] = useState([]);

  //////////////////Winners Api and event Api/////////////////////

  useEffect(() => {
    axios.get('/winners')
      .then(response => {
        setWinners(response.data);
      }, (error) => {
        console.log(error);
      });
  }, []);

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

  return (
    <>
      {winners[0]?.marks > 0 && event?.result=="true" && (
        <>
          <div className="w-full py-[10rem] px-4 bg-white">
            <h2 id="topScorers" className="fw-bold mb-2 pb-2 pb-md-0 mb-md-5 text-center"> Winners</h2>

            <div className="max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8" >


              {winners[1]?.status == "accepted" && winners[1]?.marks > 0 && (

                <div className="w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
                  <img className="w-20 mx-auto mt-[-3rem] bg-white" src={Double} alt="/" />
                  <img src="my-app\src\assets\trophy.png" alt="" />
                  <h2 className="text-2xl font-bold text-center py-8">2nd Place</h2>
                  <div className="text-center font-medium">
                    <h3 className="py-2 border-b mx-8 mt-8">Team Id:  {winners[1]?.teamId}</h3>
                    <h4 className="py-2 border-b mx-8 mt-8">Team Name:</h4>
                    <h4 >{winners[1]?.teamName}</h4>
                  </div>
                </div>
              )}

              {winners[0]?.status == "accepted" && winners[0]?.marks > 0 && (
                <div className="w-full shadow-2xl bg-gray-100 flex flex-col p-4 md:my-0 my-8 rounded-lg hover:scale-105 duration-300" >
                  <img className="w-20 mx-auto mt-[-3rem] bg-transparent" src={Double} alt="/" />
                  <h2 className="text-2xl font-bold text-center py-8">1st Place</h2>
                  <div className="text-center font-medium">
                    <h3 className="py-2 border-b mx-8 mt-8">Team Id:  {winners[0]?.teamId}</h3>
                    <h4 className="py-2 border-b mx-8 mt-8">Team Name:</h4>
                    <h4 >{winners[0]?.teamName}</h4>
                  </div>
                </div>
              )}

              {winners[2]?.status == "accepted" && winners[2]?.marks > 0 && (
                <div className="w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
                  <img className="w-20 mx-auto mt-[-3rem] bg-white" src={Double} alt="/" />
                  <h2 className="text-2xl font-bold text-center py-8">3rd Place</h2>
                  <div className="text-center font-medium">
                    <h3 className="py-2 border-b mx-8 mt-8">Team Id:  {winners[2]?.teamId}</h3>
                    <h4 className="py-2 border-b mx-8 mt-8">Team Name:</h4>
                    <h4 >{winners[2]?.teamName}</h4>
                  </div>
                </div>
              )}


            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cards;
