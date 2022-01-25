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
        setState((prev) => ({ ...prev, appointments }));
      });
  }

  //creating a new interview
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then((response) => {
        setState((prev) => ({ ...prev, appointments }));
      });
  }
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
