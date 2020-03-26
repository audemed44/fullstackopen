import React from "react";

const Notification = props => {
  const errorStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  };
  const successStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  };
  if (props.message === null) return null;
  else if (props.message.type === "error")
    return <div style={errorStyle}>{props.message.msg}</div>;
  else if (props.message.type === "success")
    return <div style={successStyle}>{props.message.msg}</div>;
  else return null;
};

export default Notification;
