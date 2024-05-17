import { Box, Typography, makeStyles } from "@material-ui/core";
import { useAuthContext } from "../../../libs/provider/AuthProvider";
import React, { useMemo } from "react";
import { AuthTabPanel } from "../../../libs/models/common";
import LoginTemplate from "./login.template";
import VerifyTemplate from "./verify.template";
import { maskPhoneNumber } from "../../../libs/utils/common";

const AuthTemplate = () => {
  const classes = useStyles();
  const { authTab, userInfo } = useAuthContext();

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
