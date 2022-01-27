import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  //declaring all states in one object
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  //passing a function to useState to be able to use setDay
  const setDay = (day) => setState({ ...state, day });

  //Axios request
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ])
      .then((all) => {
        setState((prev) => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        }));
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  //deleting an interview
  function cancelInterview(id) {
    //delete the appointment locally
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .delete(`/api/appointments/${id}`, appointment)
      .then((response) => {
        const days = updateSpots();
        setState((prev) => ({ ...prev, appointments, days }));
      });
  }

  //creating a new interview
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const editing = appointment.interview; 
    console.log("this is editing", editing)
    appointment.interview = {...interview}
    console.log("appointment.interview", appointment.interview)
    let days = [...state.days]

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then((response) => {
        if (!editing) {
          days = updateSpots("bookAppointment");
        }
        //let days = updateSpots("bookAppointment");
        setState((prev) => ({ ...prev, appointments, days }));
      });
  }

  function updateSpots(requestType) {
    const days = state.days.map((day) => {
      if (day.name === state.day) {
        if (requestType === "bookAppointment") {
          //console.log(state.appointments)
          return { ...day, spots: day.spots - 1 }; //needs to count the null instead of day.spots
        } else {
          return { ...day, spots: day.spots + 1 };
        }
      } else {
        return { ...day };
      }
    });
    return days;
  }


  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    updateSpots
  };
}
