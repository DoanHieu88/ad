import React, { memo, useMemo } from "react";
import { Box, makeStyles } from "@material-ui/core";
import PrevVideoIcon from "../icon/PrevVideoIcon";
import PlayVideoIcon from "../icon/PlayVideoIcon";
import StopIcon from "../icon/StopIcon";
import UpSpeedIcon from "../icon/UpSpeedIcon";
import NextSpeedIcon from "../icon/NextSpeedIcon";
import AudioIcon from "../icon/AudioIcon";
import CameraIcon from "../icon/CameraIcon";
import RecordIcon from "../icon/RecordIcon";

const useStyles = makeStyles({
  rootButton: {
    backgroundColor: "#D3D3D3",
    border: "4px",
    width: "32px",
    height: "32px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  listButtonSpeed: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "12px",
    marginInline: "36px",
  },
});

const ListActionVideo = memo(() => {
  const classes = useStyles();

  const listAction = useMemo(() => {
    return [
      {
        button: (
          <Box className={classes.rootButton}>
            <PrevVideoIcon />
          </Box>
        ),
      },
      {
        button: (
          <Box className={classes.rootButton}>
            <PlayVideoIcon />
          </Box>
        ),
      },
      {
        button: (
          <Box className={classes.rootButton}>
            <StopIcon />
          </Box>
        ),
      },
      {
        button: (
          <Box className={classes.rootButton} style={{ rotate: "180deg" }}>
            <PrevVideoIcon />
          </Box>
        ),
      },
      {
        button: (
          <Box className={classes.listButtonSpeed}>
            <Box className={classes.rootButton}>
              <UpSpeedIcon />
            </Box>
            <Box>1x</Box>
            <Box className={classes.rootButton}>
              <NextSpeedIcon />
            </Box>
          </Box>
        ),
      },
      {
        button: (
          <Box className={classes.rootButton}>
            <AudioIcon />
          </Box>
        ),
      },
      {
        button: (
          <Box className={classes.rootButton}>
            <CameraIcon />
          </Box>
        ),
      },
      {
        button: (
          <Box className={classes.rootButton}>
            <RecordIcon />
          </Box>
        ),
      },
    ];
  }, [classes]);

  return (
    <Box
      style={{
        padding: "16px",
        backgroundColor: "#fff",
        display: "flex",
        gap: "12px",
      }}
    >
      {listAction.map((action) => action.button)}
    </Box>
  );
});

export default ListActionVideo;
