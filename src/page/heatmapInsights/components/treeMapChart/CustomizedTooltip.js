import React from "react";
import { Box, Typography, makeStyles } from "@material-ui/core";

const useStyle = makeStyles({
  container: {
    width: 171,
    height: "auto",
    boxShadow: "0 0 6px 0 rgba(0, 0, 0, 0.15)",
    backgroundColor: "#fff",
    borderRadius: "5px",
    padding: 20,
  },
  label: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "bold",
    width: "100%",
    paddingBottom: 5,
  },
  content: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "column",
  },
  des: {
    fontSize: 12,
    paddingBlock: 8,
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
const CustomizedTooltip = ({ payload }) => {
  const classes = useStyle();
  return (
    <Box className={classes.container}>
      <Box className={classes.content}>
        {(payload || []).map((item) => (
          <Box
            style={{ display: "flex", flexDirection: "column", width: "100%" }}
            key={item.payload.name}
          >
            <Typography className={classes.label}>
              {item.payload.root.name || ""}
            </Typography>
            <Box className={classes.value}>
              <Box
                className={classes.fillColor}
                style={{
                  background:
                    item.payload.root.fillColor || item.payload.fillColor,
                }}
              ></Box>
              <Typography style={{ textTransform: "capitalize" }}>
                {item.payload.name}:{" "}
              </Typography>
              <Typography> {item.value}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CustomizedTooltip;
