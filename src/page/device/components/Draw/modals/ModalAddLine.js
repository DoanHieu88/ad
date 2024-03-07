import React, { useEffect, useState } from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  Grid,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import BaseButton from "../../BaseButton";
import BaseInputForm from "../../BaseForm/BaseInput";
import { useFormContext } from "react-hook-form";

const ModalAddLine = ({ open, handleClose, type, handleSubmit }) => {
  const classes = modalAddStyle();
  const [data, setData] = useState("");
  const {
    watch,
    formState: { errors },
  } = useFormContext();

  const nameLine = watch("line.name");

  useEffect(() => {
    if (!nameLine) return;
    setData(nameLine);
  }, [nameLine]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="draggable-dialog-title"
      maxWidth={"sm"}
    >
      <DialogTitle
        id="simple-dialog-title"
        style={{ padding: "24px 16px 16px 24px" }}
      >
        <Box className={classes.frame}>
          <Box className={classes.textWrapper}>{type || "New"} Line</Box>
          <CloseIcon
            style={{ color: "#222222", cursor: "pointer" }}
            onClick={handleClose}
          />
        </Box>
      </DialogTitle>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          overflow: "unset",
          paddingInline: 30,
        }}
      >
        <Grid container style={{ padding: 18 }} direction="column" spacing={1}>
          <Grid
            item
            container
            spacing={7}
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item>
              <Box style={{ display: "flex" }}>
                <Typography style={{ fontSize: 14, paddingRight: 5 }}>
                  Name
                </Typography>
                <span style={{ color: "#FF0000" }}>*</span>
              </Box>
            </Grid>
            <Grid item>
              {/* <BaseInputForm
                style={{ width: 140 }}
                placeholder="Name"
                name={"line.name"}
                variant="outlined"
                size="small"
              /> */}
              <TextField
                style={{ width: 140 }}
                placeholder="Name"
                // name={"line.name"}
                value={data}
                onChange={(e) => {
                  setData(e.target.value);
                }}
                variant="outlined"
                size="small"
              />
            </Grid>
          </Grid>
        </Grid>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px 0 20px 0",
            gap: "30px",
          }}
        >
          <BaseButton
            label={"Save"}
            type={"redBackground"}
            onClick={() => handleSubmit(data)}
          />
          <BaseButton label={"Cancel"} type={"normal"} onClick={handleClose} />
        </Box>
      </Box>
    </Dialog>
  );
};

const modalAddStyle = makeStyles({
  root: {
    "& .MuiDialog-paper": {
      overflow: "hidden scroll",
    },
  },
  frame: {
    alignItems: "center",
    display: "flex",
    gap: "20px",
    height: "45px",
    justifyContent: "center",
    position: "relative",
  },
  textWrapper: {
    color: "#222222",
    flex: "1",
    height: "45px",
    lineHeight: "45px",
    position: "relative",
    textAlign: "center",
    fontWeight: "bold",
  },
});
export default ModalAddLine;
