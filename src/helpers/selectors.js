function getAppointmentsForDay(state, day) {
  let appointmentsArray = [];  
  let appointments = []
    //looping through the days to find the specific day
  for (let days of state.days) {
    if (days.name === day) {
      appointmentsArray = days.appointments
    }
  }
  for (let a = 0; a < appointmentsArray.length; a++) {
    appointments.push(state.appointments[appointmentsArray[a]])
  }
  return appointments;
}

function getInterview (state, interview) {
  if (!interview){
    return null
  } else {
    //getting the interviewer ID
    let interviewerID = interview.interviewer; 
    //retriving interviewer information
    let interviewerInformation = state.interviewers[interviewerID]
    //rebuilding inteviewer object
    interview.interviewer = interviewerInformation
    return interview
  }
}
export { getAppointmentsForDay, getInterview }

