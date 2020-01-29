import { useEffect, useReducer} from "react";

import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";

const axios = require('axios').default;


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

  }, []);







  function bookInterview(id, interview) {
    
    const appointment = {
      ...state.appointments[id],
      interview
    };
  

    return axios.put(`/api/appointments/${id}`, appointment)
    .then(() => {
      dispatch({ type: SET_INTERVIEW, id, interview })
    })
 
  }


  function cancelInterview(id) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };  

    return axios.delete(`/api/appointments/${id}`, appointment)
    .then(() => {
      dispatch({ type: SET_INTERVIEW, id, interview: null });
    })

  }

  return { state, setDay, bookInterview, cancelInterview }


}