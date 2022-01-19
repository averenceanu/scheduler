import React from "react"; 
import './InterviewerListItem.scss'
import classNames from "classnames";

export default function InterviewerListItem (props) {

  const listClass = classNames("interviewers__item", {
    "interviewers__item--selected" : props.selected
  })

  //console.log("THIS", props)
  return (
    <li 
      onClick={props.setInterviewer}
      className={listClass}
      >
    <img
      className="interviewers__item-image"
      src={props.avatar}
      alt={props.name}
    />
    {props.selected && props.name}
    </li>
  );
}
