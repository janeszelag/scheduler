
export function getAppointmentsForDay(state, day) {

  let result = [];

  for (let element of state.days) {
    if (element.name === day) {
      for (let appointment of element.appointments) {
        for (let key in state.appointments) {
          if (appointment === state.appointments[key].id) {
           
            result.push(state.appointments[key]);
          }
        }

      }
    }
  }
  return result; 
}



export function getInterview(state, interview) {

  if (interview) {
    let result = {};

    result['student'] = interview.student
    
    for (let key in state.interviewers) {
      if (interview.interviewer === state.interviewers[key].id) {
        result['interviewer'] = state.interviewers[key]
      }
    }
    return result; 

  } else {
    return null;
  }

}



export function getInterviewersForDay(state, day) {

  let result = [];

  for (let element of state.days) {
    if (element.name === day) {
      for (let interviewer of element.interviewers) {
        for (let key in state.interviewers) {
          if (interviewer === state.interviewers[key].id) {
           
            result.push(state.interviewers[key]);
          }
        }

      }
    }
  }
  return result; 
}