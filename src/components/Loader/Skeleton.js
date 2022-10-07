import React from "react";
import "./skeleton.css";

const Skeleton = (props) => {
  const { width = "100%", height = "100%" } = props;
  return (
    <div className="skeleton_wrapper" style={{ width, height }}>
      {" "}
    </div>
  );
};

export default Skeleton;
