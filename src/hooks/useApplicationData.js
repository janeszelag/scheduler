import React, { useEffect, useReducer} from "react";
const axios = require('axios').default;


const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.day }
    case SET_APPLICATION_DATA:
      return { ...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers }
    case SET_INTERVIEW: {
      const { id, interview } = action;
      return    { ...state,
      appointments: {
        ...state.appointments,
        [id]: {
          ...state.appointments[action.id],
          interview:action.interview ? { ...interview } : null
        }
      }}
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}





export default function useApplicationData() {


  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => dispatch({ type: SET_DAY, day });

 
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
    .then(([daysData, appointmentsData, interviewersData]) => {
      dispatch({ type: SET_APPLICATION_DATA, days: daysData.data, appointments: appointmentsData.data, interviewers: interviewersData.data });
    })

  }, [])

  function bookInterview(id, interview) {
    
    const appointment = {
      ...state.appointments[id],
      interview
    };
  

    return axios
      .put(`/api/appointments/${id}`, {
      interview: interview
    })
    .then(() => {
      dispatch({ type: SET_INTERVIEW, id, interview })
    })
 
  }


  function cancelInterview(id) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };  

    return axios
    .delete(`/api/appointments/${id}`, {
      interview: null
    })
    .then(() => {
      dispatch({ type: SET_INTERVIEW, id, interview: null });
    })

  }

  return { state, setDay, bookInterview, cancelInterview }


}