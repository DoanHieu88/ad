import {
  Box,
  Dialog,
  IconButton,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import CloseModalIcon from "../page/masterMap/Icons/CloseModalIcon";

const CustomModal = ({ title, isOpen, children, handleClose }) => {
  const classes = useCustomModalStyle();

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      maxWidth="xl"
      className={classes.root}
    >
      <Box className={classes.content}>
        <Box className={classes.header}>
          <Typography>{title}</Typography>
          <IconButton onClick={handleClose} className={classes.icon}>
            <CloseModalIcon width={16} height={16} color="#000" />
          </IconButton>
        </Box>
        <Box style={{ marginTop: 10 }}>{children}</Box>
      </Box>
    </Dialog>
  );
};

const useCustomModalStyle = makeStyles({
  root: {
    "& .MuiDialog-paper": {
      overflowY: "unset",
    },
    "& .MuiPaper-rounded": {
      borderRadius: "12px",
    },
  },
  content: {
    padding: "20px",
    minWidth: "480px",
  },
  header: {
    position: "relative",
    width: "100%",
    "& p": {
      textAlign: "center",
      fontSize: "21px",
    },
  },
  icon: {
    position: "absolute",
    top: -5,
    right: 0,
  },
  footer: {
    display: "flex",
    justifyContent: "center",
    gap: "32px",
  },
});

export default CustomModal;
