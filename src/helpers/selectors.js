
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
