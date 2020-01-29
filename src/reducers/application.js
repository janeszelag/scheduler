export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";
  

//function to identify which day is being updated in order to update the spots remaining 
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
      //makes a deep copy of state.days
      const newDays = JSON.parse(JSON.stringify(state.days))
      //updates state.appointments 
      const appointments =  {
        ...state.appointments,
        [id]: {
          ...state.appointments[action.id],
          interview:action.interview ? interview  : null
        }
      }
      //updates the spots remaining depending on whether the interviews are null
      newDays[dayIndex].spots = state.days[dayIndex].appointments.length - 
      state.days[dayIndex].appointments.filter((id) => appointments[id].interview).length
     
      //changes state
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

