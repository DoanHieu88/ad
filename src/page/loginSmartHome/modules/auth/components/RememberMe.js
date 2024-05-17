import React from "react";
import { Checkbox } from "@material-ui/core";

const RememberMe = () => {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        width: "fit-content",
      }}
    >
      <Checkbox size="small" defaultValue={true} />
      <span style={{ color: "#4E4E4E", lineHeight: "24px" }}>
        Ghi nhớ tài khoản
      </span>
    </label>
  );
};

export default RememberMe;
