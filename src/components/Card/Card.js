import React from "react";
import { Link } from "react-router-dom";
import "./card.css";

const Card = (props) => {
  const {
    id,
    title,
    subtitle,
    banner,
    currentCount,
    lastEelement = null,
  } = props;

  return (
    <Link
      to={`/work/${id}`}
      className="card_container"
      key={id}
      ref={lastEelement}
    >
      <img src={banner} width="100%" height="100%" alt={title} />
      <div className="card_content">
        <div className="title">{title}</div>
        <div className="sub_title">{subtitle}</div>
        <div className="card_number">
          {currentCount < 10 ? "0" + currentCount : currentCount}
        </div>
      </div>
    </Link>
  );
};

export default Card;
