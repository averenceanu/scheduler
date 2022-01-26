import React, { useState } from 'react';
import Button from '../Button.js'
import InterviewerList from '../InterviewerList'

export default function Form (props) {
  const [student, setStudent] = useState(props.student || "")
  const [interviewer, setInterviewer] = useState(props.interviewer || null)
  const [error, setError] = useState("");

  const onChangeHandler = function (id) {
    setInterviewer(id)
  };

  const reset = () => {
    setStudent("")
    setInterviewer("")
  };

  const cancel = () => {
    reset()
    props.onCancel()
  }

  function helper(){
    if(student) {
      setError("")
      props.onSave(student, interviewer)
    } else {
     setError("Student name cannot be blank")
    }
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()} >
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{error}</section>

        </form>
        <InterviewerList 
          {...props}
          value={interviewer}
          onChange = {onChangeHandler}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel} >Cancel</Button>
          <Button confirm onClick={helper}>Save</Button>
        </section>
      </section>
    </main>
  );
}