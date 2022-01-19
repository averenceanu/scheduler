import React from "react"; 
import './InterviewerList.scss'
import InterviewerListItem from "./InterviewerListItem.js"

export default function InterviewerList (props) {
  const {interviewers} = props;
  const interviewersList = interviewers.map(interviewer => 
    <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.value} //it wanted to only have value
      setInterviewer={() => props.onChange(interviewer.id)} //setInterviewer, only keep onChange
    />);
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewersList}
      </ul>
    </section>
  );
}

