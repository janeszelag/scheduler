import React, { useState, useEffect} from "react";
const axios = require('axios').default;

export default function useApplicationData() {

  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

 
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
    .then(([daysData, appointmentsData, interviewersData]) => {
      setState(prev => ({...state, days: daysData.data, appointments: appointmentsData.data, interviewers: interviewersData.data }));
    })

  }, [])

  function bookInterview(id, interview) {
    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
      
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    

    return axios
      .put(`/api/appointments/${id}`, {
      interview: interview
    })
    .then(() => {
      setState({...state, appointments});
    })
 
  }

  function cancelInterview(id) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios
    .delete(`/api/appointments/${id}`, {
      interview: null
    })
    .then(() => {
      setState({...state, appointments});
    })

  }

  return { state, setDay, bookInterview, cancelInterview }


}