import React from "react";
import "./styles.scss";
import Header from "./Header.js";
import Empty from "./Empty.js";
import Show from "./Show.js";
import Confirm from "./Confirm.js";
import Status from "./Status.js";
import Error from "./Error.js";
import Form from "./Form.js";

import useVisualMode from "../../hooks/useVisualMode.js";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING, true);
    props
      .bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch((error) => {
        console.log("error");
        transition(ERROR_SAVE, true);
      });
  }

  function cancel() {
    transition(DELETING, true);
    props
      .onDelete(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((error) => {
        console.log("error");
        transition(ERROR_DELETE, true);
      });
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {/* {props.interview ? <Show {...props.interview}/> : <Empty />}  */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student} //props.interview.student
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)} //props.onDelete
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => {
            back();
          }}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && (
        <Confirm
          onCancel={() => back()}
          onConfirm={() => cancel()}
          message={"Are you sure you want to delete this?"}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => {
            back();
          }}
          onSave={save}
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          onClose={() => back()}
          message={"Could not delete the appointment"}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          // onClick={() => back()}
          onClose={() => back()}
          message={"Could not save the appointment"}
        />
      )}
    </article>
  );
}
