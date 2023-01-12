const matchIds = (appointments, ids) => {
  const matched = ids.map((id) => appointments[id]);
  return matched;
};

export function getAppointmentsForDay(state, day) {
  let appointmentArray = [];
  state.days.map((dayObject) => {
    if (dayObject.name === day) {
      dayObject.appointments.forEach((apptId) => appointmentArray.push(apptId));
    }
  });
  return matchIds(state.appointments, appointmentArray);
}
