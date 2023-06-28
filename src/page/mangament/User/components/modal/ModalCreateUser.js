import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Typography,
  TextField,
} from "@material-ui/core";
import React from "react";

const ModalCreateUser = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="draggable-dialog-title"
      style={{
        "& .": {},
      }}
      maxWidth="xl"
    >
      <Box style={{ width: 1000, height: "auto" }}>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginInline: "24px",
            padding: "20px 0 10px 0",
          }}
        >
          <Typography style={{ fontWeight: 800 }}>Create New User</Typography>
        </Box>
        <DialogContent>
          <Box style={{ display: "flex", justifyContent: "space-evenly" }}>
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Typography>Username *</Typography>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                style={{ width: 450, paddingBottom: 20 }}
              />
              <Typography>Phone *</Typography>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                style={{ width: 450, paddingBottom: 20 }}
              />
              <Typography>Email *</Typography>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                style={{ width: 450, paddingBottom: 20 }}
              />
              <Typography>Password *</Typography>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                type="password"
                style={{ width: 450, paddingBottom: 20 }}
              />
              <Typography>Repeat Password *</Typography>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                type="password"
                style={{ width: 450, paddingBottom: 20 }}
              />
            </Box>
            <Box>
              <Typography>Username *</Typography>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                style={{ width: 450, paddingBottom: 20 }}
              />
              <Typography>Phone *</Typography>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                style={{ width: 450, paddingBottom: 20 }}
              />
              <Typography>Email *</Typography>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                style={{ width: 450, paddingBottom: 20 }}
              />
              <Typography>Password *</Typography>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                style={{ width: 450, paddingBottom: 20 }}
              />
              <Typography>Repeat Password *</Typography>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                style={{ width: 450, paddingBottom: 20 }}
              />
            </Box>
          </Box>
        </DialogContent>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "20px 0 24px 0",
          }}
        >
          <Button
            onClick={() => {}}
            style={{
              width: "120px",
              height: "35px",
              background: "#dd3d4b",
              color: "#fff",
              fontWeight: "600",
              marginRight: 10,
            }}
          >
            Save
          </Button>
          <Button
            onClick={handleClose}
            style={{
              width: "120px",
              height: "35px",
              background: "#fff",
              color: "#333",
              fontWeight: "600",
              border: "solid 1px ",
              marginLeft: 10,
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default React.memo(ModalCreateUser);
