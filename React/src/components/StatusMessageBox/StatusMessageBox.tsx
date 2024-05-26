import React from "react";

interface StatusMessageBoxProps {
  severity: string;
  message: string | undefined;
}

const StatusMessageBox = ({ severity, message }: StatusMessageBoxProps) => {
  return <div>{message}</div>;
};

export default StatusMessageBox;
