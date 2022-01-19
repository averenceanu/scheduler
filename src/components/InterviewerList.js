import React from "react"; 
import './InterviewerList.scss'
import InterviewerListItem from "./InterviewerListItem.js"

export default function InterviewerList (props) {
  const {interviewers} = props;
  const interviewersList = interviewers.map(interviewer => 
    <InterviewerListItem
      key={interviewer.id}
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.interviewer}
      setInterviewer={props.setInterviewer}
    />);
  console.log("ok", interviewersList)
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewersList}
      </ul>
    </section>
  );
}