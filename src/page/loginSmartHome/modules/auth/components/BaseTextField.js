import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import VisibilityIcon from "../../../libs/assets/VisibilityIcon";
import InVisibilityIcon from "../../../libs/assets/InVisibilityIcon";
import ResetInputIcon from "../../../libs/assets/ResetInputIcon";

const { useState } = React;

const BaseTextField = (rest, _ref) => {
  const { isPwd, customStyle = {}, handleResetValue, ...props } = rest;
  const classes = useStyles();
  const [showPwd, setShowPwd] = useState(false);

  const handleShowPwd = () => {
    setShowPwd((prev) => !prev);
  };

  return (
    <Box className={classes.box} style={customStyle}>
      <input
        {...props}
        style={{
          border: "none",
          width: "100%",
          outline: "none",
          fontSize: "16px",
          backgroundColor: "transparent",
          flex: 1,
        }}
        type={isPwd && !showPwd ? "password" : "text"}
      />
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        {props.value.length > 0 && (
          <Box className={classes.icon} onClick={handleResetValue}>
            <ResetInputIcon />
          </Box>
        )}
        {isPwd &&
          (showPwd ? (
            <Box onClick={handleShowPwd} className={classes.icon}>
              <VisibilityIcon />
            </Box>
          ) : (
            <Box onClick={handleShowPwd} className={classes.icon}>
              <InVisibilityIcon />
            </Box>
          ))}
      </Box>
    </Box>
  );
};

const useStyles = makeStyles({
  box: {
    borderRadius: "16px",
    borderBottomLeftRadius: 0,
    padding: "15px 16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "400px",
  },
  icon: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
});

export default React.forwardRef(BaseTextField);
