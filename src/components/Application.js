import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "components/DayList"
import Appointment from "components/Appointment";
//import axios from "axios";

const axios = require('axios').default;

//dummy data

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "3pm",
    interview: {
      student: "Katherine Szelag",
      interviewer: {
        id: 5,
        name: "Jason Jones",
        avatar: "https://i.imgur.com/Nmx0Qxo.png" ,
      }
    }
  },  
];







//application component

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  useEffect(() => {
    axios.get('/api/days')
    .then(function (daysData) {
      console.log(daysData);
      setDays(daysData.data);
    })
  }, []);


  const allAppointments = appointments.map(appointment => {
    return (
      <Appointment key={appointment.id} {...appointment} />
    )
  })

  return (
    <main className="layout">
      <section className="sidebar">
        <img
            className="sidebar--centered"
            src="images/logo.png"
            alt="Interview Scheduler"
          />
<hr className="sidebar__separator sidebar--centered"/>
<nav className="sidebar__menu">
  <DayList
  days={days}
  day={day}
  setDay={setDay}
  />
</nav>
    <img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"/> 
  
  </section>
      <section className="schedule">
      {allAppointments}
      <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}

