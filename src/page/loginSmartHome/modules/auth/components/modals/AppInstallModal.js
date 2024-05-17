import React from "react";
import {
  useAuthContext,
  useAuthDispatch,
} from "../../../../libs/provider/AuthProvider";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
} from "@material-ui/core";
import { AuthAction } from "../../../../libs/models/common";

const AppInstallModal = () => {
  const { statusModal } = useAuthContext();
  const dispatch = useAuthDispatch();

  const handleClose = () => {
    dispatch({
      type: AuthAction.STATUS_MODAL,
      payload: false,
    });
  };

  return (
    <Dialog
      open={statusModal.appInstall}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth={804}
      maxWidth="md"
    >
      <Box
        style={{
          position: "absolute",
          top: "0",
          right: "0",
          padding: "16px",
          cursor: "pointer",
        }}
        onClick={handleClose}
      >
        <img src="/images/close.png" alt="close" />
      </Box>
      <DialogTitle
        id="alert-dialog-title"
        style={{
          paddingBottom: 0,
          marginBottom: 0,
          marginTop: 30,
        }}
      >
        <p
          style={{
            fontSize: "36px",
            fontWeight: "bold",
            textAlign: "center",
            padding: 0,
            margin: 0,
          }}
        >
          Tải ứng dụng Viettel Home
        </p>
      </DialogTitle>
      <DialogContent>
        <p
          style={{
            textAlign: "center",
          }}
        >
          Nhập từ khóa{" "}
          <span
            style={{
              fontWeight: "bold",
              color: "#EE0033",
            }}
          >
            Viettel Home
          </span>{" "}
          tại APP STORE / GOOGLE PLAY hoặc{" "}
          <span
            style={{
              fontWeight: "bold",
            }}
          >
            quét mã QR.
          </span>
        </p>

        <Grid
          container
          style={{
            justifyContent: "space-between",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Grid item xs={6}>
            <img
              src="/images/search_bar.png"
              alt="search_bar"
              style={{
                width: "320px",
                margin: "auto",
                display: "block",
              }}
            />
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "16px",
                marginTop: "24px",
                width: "100%",
              }}
            >
              <img
                src="/images/app_store.png"
                alt="App_store"
                style={{
                  width: "243px",
                }}
              />
              <img
                src="/images/google_play.png"
                alt="Google_play"
                style={{
                  width: "243px",
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <img src="/images/qr_code.png" alt="qr_code" />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default AppInstallModal;
