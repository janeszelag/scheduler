import React from "react";
import "./styles.scss";
import Show from "./Show"
import Header from "./Header"
import Empty from "./Empty"
import Form from "./Form"
import Status from "./Status"
import Error from "./Error"
import Confirm from "./Confirm"
import {useVisualMode} from "../../hooks/useVisualMode";


export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const CONFIRM = "CONFIRM"
  const ERROR_SAVE = "ERROR_SAVE"
  const ERROR_DELETE = "ERROR_DELETE"

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);

    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(() => transition(ERROR_SAVE, true));
  }


  function deleteAppt() {
    transition(DELETING);
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(() => transition(ERROR_DELETE, true))
  }


  return (
    <article className="appointment" data-testid="appointment" >
      
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status message={SAVING} />}
      {mode === CREATE && 
      <Form 
      interviewers={props.interviewers} 
      onCancel={() => back()}
      onSave={save}
      />}
      {mode === EDIT && <Form 
      interviewers={props.interviewers}
      name={props.interview.student}
      onCancel={() => transition(SHOW)}
      onSave={save}
      /> }
      {mode === DELETING && <Status message={DELETING} />}
      {mode === SHOW && (
      <Show 
      student={props.interview.student} 
      interviewer={props.interview.interviewer} 
      onDelete={() => transition(CONFIRM)} 
      onEdit={() => transition(EDIT)}
        />)}
      {mode === CONFIRM && <Confirm 
      onConfirm={deleteAppt} 
      onCancel={() => transition(SHOW, true)} 
      message="Are you sure you would like to delete?"
      />}
      {mode === ERROR_SAVE && <Error message="Could not save interview" onClose={() => back()} />}
      {mode === ERROR_DELETE && <Error message="Could not delete interview" onClose={() => back()} />}
    </article>
   
  );
}; 


