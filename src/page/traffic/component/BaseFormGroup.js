import React from "react";
import { Box, Grid, Typography } from "@material-ui/core";

const BaseFormGroup = ({
  label,
  component,
  isRequired,
  error,
  width,
  showErrorMessage,
  widthCustom,
  customStyle,
  isEditRecordModal,
}) => {
  return (
    <Grid
      container
      style={{
        width: width || "100%",
        justifyContent: isEditRecordModal ? "flex-end" : "space-between",
        alignItems: "center",
        alignContent: "center",
        ...customStyle,
      }}
    >
      <Box>
        <Typography
          style={{
            fontSize: "0.9rem",
            color: "black",
            lineHeight: "normal",
            letterSpacing: "normal",
            display: "flex",
            whiteSpace: "nowrap",
            paddingRight: isEditRecordModal ? 6 : 0,
          }}
        >
          {label}
          {isRequired && (
            <span
              style={{
                paddingLeft: "6px",
                color: "#dd3d4b",
              }}
            >
              *
            </span>
          )}
        </Typography>
      </Box>
      <Box style={{ width: widthCustom || "500px" }}>
        <Box
          style={{
            display: "flex",
            gap: "20px",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          {component}
        </Box>
      </Box>
      <React.Fragment>
        <Box style={{ width: "100%" }}>
          {isEditRecordModal ? (
            <Box style={{ width: widthCustom || "500px", marginLeft: 153 }}>
              <Typography
                color="error"
                style={{ marginTop: "5px", fontSize: 12 }}
              >
                {showErrorMessage && error ? (
                  error.message
                ) : (
                  <Box style={{ height: 18 }}></Box>
                )}
              </Typography>
            </Box>
          ) : (
            <Box style={{ width: widthCustom || "500px", marginLeft: "auto" }}>
              <Typography
                color="error"
                style={{ marginTop: "5px", fontSize: 14 }}
              >
                {showErrorMessage && error ? error.message : " "}
              </Typography>
            </Box>
          )}
        </Box>
      </React.Fragment>
    </Grid>
  );
};

export default BaseFormGroup;
