import React from "react";
import { Box } from "@material-ui/core";
import VideoControl from "../components/VideoControl";

const PlaybackTemplate = () => {
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <VideoControl />
    </Box>
  );
};

export default PlaybackTemplate;
