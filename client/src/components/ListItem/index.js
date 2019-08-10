import React from "react";

function ListItem(props) {
  return (
    <div className="card text-center">
      <div className="card-body list-item"><h4>{props.name}</h4></div>
    </div>
  );
}

export default ListItem;
