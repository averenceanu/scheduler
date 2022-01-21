export function getAppointmentsForDay(state, day) {
  let appointmentsArray = [];  //[1,2,3]
  let appointments = []
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
