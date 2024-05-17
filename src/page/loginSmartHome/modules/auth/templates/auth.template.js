import { Box, Typography, makeStyles } from "@material-ui/core";
import {
  useAuthContext,
  useAuthDispatch,
} from "../../../libs/provider/AuthProvider";
import React, { useEffect, useMemo } from "react";
import { AuthAction, AuthTabPanel } from "../../../libs/models/common";
import LoginTemplate from "./login.template";
import VerifyTemplate from "./verify.template";
import { maskPhoneNumber } from "../../../libs/utils/common";
import useGetAppId from "../../../libs/hooks/useGetAppId";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";

const AuthTemplate = () => {
  const classes = useStyles();
  const { authTab, userInfo } = useAuthContext();
  const appId = useGetAppId();
  const dispatch = useAuthDispatch();

  useEffect(() => {
    if (appId !== "" || !dispatch) return;

    const randomId = `${uuidv4()}_${dayjs().format("YYYY-MM-DD_HH:mm:ss")}`;

    localStorage.setItem("app_id", randomId);
    dispatch({
      type: AuthAction.APP_ID,
      appId: randomId,
    });
  }, [appId, dispatch]);

  const titleAuth = useMemo(() => {
    if (authTab === AuthTabPanel.LOGIN) {
      return "Đăng nhập";
    }

    return "Nhập mã xác nhận";
  }, [authTab]);

  return (
    <Box
      style={{
        display: "flex",
        gap: "64px",
      }}
    >
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Typography className={classes.titleAuth}>{titleAuth}</Typography>

        {authTab === AuthTabPanel.VERIFY && (
          <React.Fragment>
            <Typography
              style={{
                fontSize: "16px",
                lineHeight: "24px",
                textAlign: "center",
              }}
            >
              Vui lòng nhập mã OTP vừa được gửi đến số điện thoại
            </Typography>
            <Typography
              style={{
                fontWeight: 600,
                marginTop: "8px",
                textAlign: "center",
                marginBottom: "32px",
              }}
            >
              {maskPhoneNumber(userInfo.identifier)}
            </Typography>
          </React.Fragment>
        )}
        {authTab === AuthTabPanel.LOGIN ? (
          <LoginTemplate />
        ) : (
          <VerifyTemplate />
        )}
      </Box>
      {authTab === AuthTabPanel.VERIFY && (
        <Box>
          <img src="/images/background_otp.png" alt="bg_verify" />
        </Box>
      )}
    </Box>
  );
};

const useStyles = makeStyles({
  titleAuth: {
    fontSize: "36px",
    lineHeight: "40px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "32px",
  },
});

export default AuthTemplate;
