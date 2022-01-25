import React from "react"; 
import './InterviewerList.scss'
import InterviewerListItem from "./InterviewerListItem.js"
import PropTypes from 'prop-types';

function InterviewerList (props) {
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

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList