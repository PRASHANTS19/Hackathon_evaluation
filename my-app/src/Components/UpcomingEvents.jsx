import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import axios from "axios";


///////////////////////card of upcoming event////////////////////////
const Card = ({ description, endDate, eventId, eventName, startDate, status, badgeClass }) => {
  
  const [truncDesc, settruncDesc] = useState(description);
  const displayDesc = (truncDesc) => {
    if (truncDesc && truncDesc.length > 100) {
      return truncDesc.substring(0, 100) + '...';
    }
    return truncDesc;
  }
  const [truncName, settruncName] = useState(eventName);
  const displayName = (truncName) => {
    if (truncName && truncName.length > 30) {
      return truncName.substring(0, 30) + '...';
    }
    return truncName;
  }

  return (
    <div className="text-break" style={{ overflow: "hidden", margin: "-15px 10px" }}>
      <div className="team-item" style={{
        border: "0px solid black", borderRadius: "30px",
        background: "linear-gradient(345deg, rgba(255,255,255,1) 0%, rgba(96,180,255,1) 100%)",
        height: "50vh"
      }}>
        {/* //////////////////// Adding the badge ////////////////////////// */}
        <div className="statusBadge" style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "-30px 0 30px 0",
          fontSize: "18px"

        }}>
        <button className={`badge ${badgeClass}`}>
          {status}
        </button>
        </div>
               
        <div style={{ marginTop: "-2vh" }}>
          <h3>{eventName.substring(0, 30)}</h3>
          <div className="truncatedEventName">{displayName(truncName)}</div>
          <div className="truncatedDescription">{displayDesc(truncDesc)}</div>
        </div>
        <div className="tagline" style={{margin: "20px 0"}}>
          <p>Start Date: {startDate}</p>
        </div>
        <div className="tagline">
          <p>End Date: {endDate}</p>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const slider = useRef(null);
  const [event, setEvent] = useState([]);
  const [isMounted, setIsMounted] = useState(true);
  const [newEventData, setNewEventData] = useState(null);
  
  const fetchData = async () => {
    try {
      const response = await axios.get('/getEvent');
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  
  useEffect(() => {
    async function fetchEventData() {
      const response = await fetchData();
      if (isMounted) {
        setEvent(response);
      }
    }
    fetchEventData();
    return () => setIsMounted(false);
  }, [isMounted]);
  
  useEffect(() => {
    if (event && event.length > 0) {
      const today = new Date();
  
      const updatedEvents = event.map((evt) => {
        const startDate = new Date(evt.startDate);
        const endDate = new Date(evt.endDate);
  
        if (endDate < today) {
          return { ...evt, badgeClass: 'btn btn-danger',status: 'Previous' };
        } else if (startDate > today) {
          return { ...evt, badgeClass: 'btn btn-info',status: 'Upcoming' };
        } else {
          return { ...evt, badgeClass: 'btn btn-success',status: 'Live' };
        }
      });
  
      setNewEventData(updatedEvents);
    }
  }, [event]);
  
  

  const [settings, setSettings] = useState({
    centerMode: true,
    draggable: true,
    centerPadding: "20px",
    pauseOnHover: true,
    infinite: true,
    swipeToSlide: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 2000,
    focusOnSelect: true,
    dots: true,
  });

  // (event?.length >= 3) ? 3 : event?.length


  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 600) {
        setSettings((prevSettings) => ({
          ...prevSettings,
          slidesToShow: 1,
        }));
      }
      else if (window.innerWidth < 768) {
        setSettings((prevSettings) => ({
          ...prevSettings,
          slidesToShow: (event?.length < 2) ? event?.length : 2,
        }));
      } else {
        setSettings((prevSettings) => ({
          ...prevSettings,
          slidesToShow: (event?.length < 3) ? event?.length : 3,
        }));
      }
    }
    window.addEventListener('resize', handleResize);
    return()=>{
      window.removeEventListener('resize', handleResize);
    }
    // console.log("event")
  },[settings]);



  return (
    <>
      {event?.length > 0 && (
        <div id="eventList" className="bg-color" style={{ marginTop: '70px' }} >
          <h2 className="fw-bold mb-2 pb-2 pb-md-0 mb-md-5 text-center" >Hack-a-thon Events</h2>
          <Slider {...settings} ref={slider} style={{width: '97%'}}>
            
            {newEventData && newEventData.map((card, i) => (
              <Card key={i} {...card} />
            ))}
          </Slider>
        </div>
      )}
    </>
  );
}
