import React, { FC } from "react";

interface AlertProps {
  message: React.ReactNode;
}
export const Alert: FC<AlertProps> = ({ message }) => {
  return (
    <div
      className="bg-white rounded shadow px-4 py-3 d-flex align-items-center"
      style={{
        width: 368,
        position: "relative",
        overflow: "hidden",
      }}>
      <span
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "6px",
        }}
      />
      <div className="strong">{message}</div>
    </div>
  );
};
