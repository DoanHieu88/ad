import React, { useEffect } from "react";
import AuthMngtProvider from "../libs/provider/AuthProvider";
import { Box, Paper, makeStyles, styled } from "@material-ui/core";
import "../styles/auth.css";
import AuthTemplate from "./auth/templates/auth.template";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import useGetAppId from "../libs/hooks/useGetAppId";

const LayoutScreen = styled(Box)({
  backgroundImage: "url('/images/background_auth.png')",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  width: "100vw",
  height: "100vh",
  overflow: "hidden",
  backgroundPosition: "center",
  position: "relative",
});

const AuthScreen = () => {
  const classes = useStyles();
  const appId = useGetAppId();

  useEffect(() => {
    if (appId) return;

    localStorage.setItem(
      "app_id",
      `${uuidv4()}_${dayjs().format("YYYY-MM-DD_HH:mm:ss")}`
    );
  }, [appId]);

  return (
    <AuthMngtProvider>
      <LayoutScreen>
        <Box className={classes.icon}>
          <img src="/images/viettel_home_icon.png" alt="Viettel Home Icon" />
        </Box>
        <Box className={classes.popup}>
          <Paper elevation={3} className={classes.content}>
            <AuthTemplate />
          </Paper>
        </Box>
      </LayoutScreen>
    </AuthMngtProvider>
  );
};

const useStyles = makeStyles({
  icon: {
    position: "absolute",
    top: "32px",
    left: "32px",
  },
  popup: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  content: {
    padding: "32px",
    borderRadius: "16px",
  },
});

export default AuthScreen;
