import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList.js"
import Appointment from "components/Appointment/index.js";


export default function Application(props) {
  //declaring all states in one object 
  const [state, setState] = useState({
    day: "Monday", 
    days: [],
    appointments: {}
  })

  //passing a function to useState to be able to use setDay
  const setDay = day => setState({ ...state, day });
  const setDays = days => setState((prev => ({ ...prev, days })));

  //declaring variables for use 
  const dailyAppointments = []

  //maping over appointments
  const appointmentList = dailyAppointments.map(appointment => <Appointment 
    key = {appointment.id}
    {...appointment}
  />)

  //Axios request
  useEffect(() => {
    axios.get("/api/days")
      .then ((response) => {
        //console.log(response.data)
        setDays([...response.data])
      })
  }, [])

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
