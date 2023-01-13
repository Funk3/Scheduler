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

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const interviewerInfo = state.interviewers[interview.interviewer];
  return {
    student: interview.student,
    interviewer: interviewerInfo,
  };
}

export function getInterviewersForDay(state, day) {
  let interviewersArr = [];

  state.days.map((dayObject) => {
    if (dayObject.name === day) {
      dayObject.interviewers.forEach((interviewerId) =>
        interviewersArr.push(interviewerId)
      );
    }
  });
  return matchIds(state.interviewers, interviewersArr);
}
