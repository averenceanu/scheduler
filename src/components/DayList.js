import React from "react";
import DayListItem from "./DayListItem.js";

export default function DayList(props) {
  const {days} = props
  const parsedDays = days.map(day => 
  <DayListItem 
    key={day.id} 
    name={day.name}
    spots={day.spots}
    selected={day.name === props.day}
    setDay={props.setDay}  
    />);
  console.log("PARSEDDAYS", parsedDays)
  return (
    <ul>
      {parsedDays}
    </ul>
  )
}
