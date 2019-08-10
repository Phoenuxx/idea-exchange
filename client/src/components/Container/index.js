import React from "react";

function Container(props) {
  return <div className={`container${props.fluid ? props.fluid : ""}`}>{props.children}</div>;
}

export default Container;
