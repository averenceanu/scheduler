import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList.js"
import Appointment from "components/Appointment/index.js";
import getAppointmentsForDay from "../helpers/selectors.js"


export default function Application(props) {
  //declaring all states in one object 
  const [state, setState] = useState({
    day: "Monday", 
    days: [],
    appointments: {}
  })

  //passing a function to useState to be able to use setDay
  const setDay = day => setState({ ...state, day });

  //Axios request
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ])
      .then ((all) => {
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [])

  //array of appointments for this specific day
  const dailyAppointments = getAppointmentsForDay(state, state.day)

  //maping over appointments creating single appointments components 
  const appointmentList = dailyAppointments.map(appointment => <Appointment 
    key = {appointment.id}
    {...appointment}
  />)

  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList
          days={state.days} //previous was days from the array days 
          value={state.day}
          onChange= {setDay}
        />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {appointmentList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
