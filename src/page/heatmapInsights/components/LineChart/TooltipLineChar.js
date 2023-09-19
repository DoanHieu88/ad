import React from "react";
import { Box, Typography, makeStyles } from "@material-ui/core";

const useStyle = makeStyles({
  container: {
    width: 171,
    boxShadow: "0 0 6px 0 rgba(0, 0, 0, 0.15)",
    backgroundColor: "#fff",
    borderRadius: "5px",
    padding: 20,
    zIndex: 2,
  },
  label: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    paddingBottom: 10,
  },
  content: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "column",
  },
  fillColor: {
    width: "12px",
    height: 12,
    borderRadius: "50%",
    marginRight: 8,
  },
  value: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 8,

    "& p": {
      fontSize: 12,
    },
  },
});
const TooltipLineChar = ({ payload }) => {
  const classes = useStyle();
  return (
    <Box className={classes.container}>
      <Typography className={classes.label}>
        {(payload &&
          payload.length &&
          payload[0].payload &&
          payload[0].payload.name) ||
          ""}
      </Typography>
      <Box className={classes.value}>
        <Typography></Typography>
        <Typography></Typography>
      </Box>
      <Box className={classes.content}>
        {(payload || []).map((item, index) => (
          <Box
            style={{ display: "flex", msFlexDirection: "column" }}
            key={item.name}
          >
            <Box className={classes.value}>
              <Box
                className={classes.fillColor}
                style={{ background: item.color }}
              ></Box>
              <Typography style={{ textTransform: "capitalize" }}>
                {item.name}:
              </Typography>
              <Typography>
                {item.value}% ~{/* take real value ->*/}
                {item && item.payload && item.payload[`${item.name}_real`]}{" "}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TooltipLineChar;
