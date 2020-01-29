import React, { useState } from "react";
import InterviewerList from "components/InterviewerList"
import Button from "components/Button"


export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState('');
 

  const reset = function () {
    setName('');
    setInterviewer(null);
  }

  const cancel = function() {
    reset();
    props.onCancel();
    
  }



  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
     } else if (interviewer === null) {
      setError("Please choose an interviewer.");
      return; 
    }
  
    setError("");
    props.onSave(name, interviewer);
  }


  return (
  <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off">
        <input
        onSubmit={event => event.preventDefault()}
        className="appointment__create-input text--semi-bold"
        name='name'
        type="text"
        placeholder="Enter Student Name"
        value = {name}
        onChange={currentName => setName(currentName.target.value)}
        data-testid="student-name-input"
      />
      </form>
      <section className="appointment__validation">{error}</section>
      <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button onClick={cancel} danger>Cancel</Button>
        <Button onClick={() => validate()} confirm>Save</Button>
  
       
      </section>
      
    </section>
  </main>
  );
};