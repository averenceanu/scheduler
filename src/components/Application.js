import React from "react";
import "components/Application.scss";
import DayList from "components/DayList.js";
import Appointment from "components/Appointment/index.js";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "../helpers/selectors.js";
import useApplicationData from "../hooks/useApplicationData.js";

export default function Application(props) {
  const { state, setDay, bookInterview, cancelInterview } =
    useApplicationData();

  //array of appointments for this specific day
  const appointments = getAppointmentsForDay(state, state.day);

  //array of interterviewers for this specific day
  const interviewersList = getInterviewersForDay(state, state.day);

  //maping over appointments creating single appointments components
  const appointmentList = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewersList}
        bookInterview={bookInterview}
        onDelete={cancelInterview}
      />
    );
  });

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
          <DayList days={state.days} value={state.day} onChange={setDay} />
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
