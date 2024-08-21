import React from "react";
import { Box } from "@material-ui/core";

const VideoControl = () => {
  return (
    <Box
      sx={{
        flex: 1,
      }}
    >
      <canvas
        id="canvas"
        style={{
          backgroundColor: "#C5C5C5",
          width: "100%",
          height: "500px",
        }}
      ></canvas>
    </Box>
  );
};

export default VideoControl;
