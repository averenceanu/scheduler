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

function getInterviewersForDay (state, day) {
  let interviewersArray = [];
  let interviewers = [];

  //looping through the days to find the spefic day
  for (let days of state.days) {
    if (days.name === day) {
      interviewersArray = days.interviewers
    }
  }

  //getting the interviewers from the interviewers object
  for (let i = 0; i < interviewersArray.length; i++) {
    interviewers.push(state.interviewers[interviewersArray[i]])
  }
  return interviewers
}

function getInterview (state, interview) {
  if (!interview){
    console.log("null")
    return null
  } else {
    //getting the interviewer ID
    let interviewerID = interview.interviewer; //2
    //retriving interviewer information
    let interviewerInformation = state.interviewers[interviewerID]
    //rebuilding inteviewer object
    let interviewerObject = {
      student: interview.student, 
      interviewer: interviewerInformation
    }
    return interviewerObject
  }
}
export { getAppointmentsForDay, getInterview, getInterviewersForDay }