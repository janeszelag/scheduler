import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";


export default function InterviewerListItem(props) {


  const interviewClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  })

  const imageClass = classNames("interviewers__item-image", {
    "interviewers__item--selected-image": props.selected
  })

  return (
    <li className={interviewClass} onClick={props.setInterviewer}>
    <img
      className={imageClass}
      src={props.avatar}
      alt="Lisa Jones"
    />
    {props.selected && props.name}
  </li>
  );
}

