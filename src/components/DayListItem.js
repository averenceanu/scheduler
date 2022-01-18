import React from "react";
import './DayListItem.scss'
import classNames from "classnames";


export default function DayListItem(props) {
  const listClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected, 
    "day-list__item--full": !props.spots
  });
  
  const formatSpots = function (props) {
    let formatSpotsResult = ""; 
    if (props.spots === 0) {
      formatSpotsResult = "no spots remaining"
    } else if (props.spots === 1) {
      formatSpotsResult =  "1 spot remaining"
    } else {
      formatSpotsResult = `${props.spots} spots remaining`
    }
    return formatSpotsResult
  }

  return (
    <li 
      onClick={() => props.setDay(props.name)}
      className={listClass} {...formatSpots}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props)}</h3>
    </li>
  );
}