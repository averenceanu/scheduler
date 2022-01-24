import React from 'react';
import "./styles.scss"
import Header from "./Header.js"
import Empty from "./Empty.js"
import Show from "./Show.js"
import Confirm from "./Confirm.js"
import Status from "./Status.js"
// import Error from "./Error.js"
import Form from "./Form.js"

import useVisualMode from "../../hooks/useVisualMode.js";



const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM"

export default function Appointment (props) {  
  //console.log(props)
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
      .then(()=> {transition(SHOW)})
  }

  function cancel () {
    // const interview = {
    //   student: name, 
    //   interviewer
    // }
    transition(DELETING)
    props.onDelete(props.id)
      .then (()=> {transition(EMPTY)})
  }

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {/* {props.interview ? <Show {...props.interview}/> : <Empty />}  */}
      {mode === EMPTY && <Empty onAdd={() => 
        transition(CREATE)
      } />}
      {mode === SHOW && (
        <Show
          student={props.interview.student} //props.interview.student
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)} //props.onDelete
        />
      )}
      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers} 
          onCancel={() => {back()}}
          onSave={save}
        />
      )}
      {mode === SAVING && (
        <Status message="Saving"/>
      )}
      {mode === DELETING && (
        <Status message="Deleting"/>
      )}
      {mode === CONFIRM && (
        <Confirm 
          onCancel={() => back()}
          onConfirm={() => cancel()}
          message={"Are you sure you want to delete this?"}
        />
      )}
      
    </article>
  );
}