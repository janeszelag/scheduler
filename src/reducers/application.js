export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";
  
  
function getDayIndexByAppointmentId(state, id) {
    
  for (let day of state.days) {
    if (day.appointments.includes(id)) {
      return state.days.indexOf(day);
    }
  }
}


export default function reducer(state, action) {

  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.day }
    case SET_APPLICATION_DATA:
      return { ...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers }
    case SET_INTERVIEW: {
      const { id, interview } = action;
      const dayIndex = getDayIndexByAppointmentId(state, action.id);
      const newDays = JSON.parse(JSON.stringify(state.days))
      const appointments =  {
        ...state.appointments,
        [id]: {
          ...state.appointments[action.id],
          interview:action.interview ? interview  : null
        }
      }
      newDays[dayIndex].spots = state.days[dayIndex].appointments.length - 
      state.days[dayIndex].appointments.filter((id) => appointments[id].interview).length
     

      return { ...state,
      appointments,
      days: newDays
      } 
      
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

