const state = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3],
      interviewers: [1, 2, 3],
      spots: 4
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5],
      interviewers: [4, 5],
      spots: 2
    }
  ],
  appointments: {
    "1": { id: 1, time: "12pm", interview: null },
    "2": { id: 2, time: "1pm", interview: null },
    "3": {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2 }
    },
    "4": { id: 4, time: "3pm", interview: null },
    "5": {
      id: 5,
      time: "4pm",
      interview: { student: "Chad Takahashi", interviewer: 2 }
    }
  },

  interviewers: {
    "1": {  
      "id": 1,
      "name": "Sylvia Palmer",
      "avatar": "https://i.imgur.com/LpaY82x.png"
    },
    "2": {
      id: 2,
      name: "Tori Malcolm",
      avatar: "https://i.imgur.com/Nmx0Qxo.png"
    }
  }
}; 

//updateSpots
function updateSpots (day) {
  let currentSpots = 0 
  //get into the state.days and select the specific day
  for (let days of state.days) {
    if (days.name === day) {
      currentSpots = days.spots
    }
  }
  return currentSpots
  //const selectedDay = state.days.name[day]; 
  
  //grab the value of the current spots available -> const currentSpots 

  //loop through the appointments and see if the interview = null => increment the spots + 1 

}

console.log (updateSpots("Monday"))