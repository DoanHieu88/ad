import React from "react";

import { FormProvider } from "react-hook-form";
import useLoginController from "../controllers/login.controller";
import BaseInputForm from "../components/BaseInputForm";
import { AuthAction, InputKey } from "../../../libs/models/common";
import {
  Box,
  CircularProgress,
  Typography,
  makeStyles,
} from "@material-ui/core";
import RememberMe from "../components/RememberMe";
import {
  useAuthContext,
  useAuthDispatch,
} from "../../../libs/provider/AuthProvider";
import AppInstallModal from "../components/modals/AppInstallModal";
import ResetIconOtp from "../../../libs/assets/ResetOtpIcon";

const LoginTemplate = () => {
  const classes = useStyles();
  const dispatch = useAuthDispatch();
  const { captchaImage } = useAuthContext();
  const { loginForm, loginMutate, handleLogin, handleGetCaptcha } =
    useLoginController();

  const handleOpenAppInstallModal = () => {
    dispatch({
      type: AuthAction.STATUS_MODAL,
      payload: true,
    });
  };

  const handleResetCaptcha = () => {
    if (captchaImage !== "") {
      dispatch({
        type: AuthAction.CATPCHA_STATUS,
        payload: "",
      });
    }
  };

  return (
    <FormProvider {...loginForm}>
      <form
        onSubmit={loginForm.handleSubmit(handleLogin)}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "32px",
        }}
      >
        <Box>
          <BaseInputForm
            name="identifier"
            label="Số điện thoại"
            type={InputKey.phone}
            placeholder="Nhập số điện thoại"
            customCallBack={handleResetCaptcha}
            maxLength={10}
            isRequired
          />

          <Box style={{ height: "16px" }} />

          <BaseInputForm
            name="password"
            label="Mật khẩu"
            type={InputKey.password}
            placeholder="Nhập mật khẩu"
            isRequired
          />

          {captchaImage !== "" && (
            <Box
              style={{
                paddingTop: "30px",
              }}
            >
              <Box
                style={{
                  margin: "auto",
                  width: "fit-content",
                  display: "flex",
                  gap: "10px",
                  cursor: "pointer",
                }}
              >
                <img src={captchaImage || ""} alt="Catcha_Image" />
                <Box onClick={handleGetCaptcha}>
                  <ResetIconOtp />
                </Box>
              </Box>
              <BaseInputForm
                name="captcha"
                label="Mã Captcha"
                type={InputKey.captcha}
                placeholder="Nhập mã captcha"
                isRequired
                maxLength={10}
              />
            </Box>
          )}

          <Box
            style={{
              marginTop: "20px",
            }}
          >
            <RememberMe />
          </Box>
        </Box>

        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <Typography>Bạn chưa có tài khoản?</Typography>
          <Typography>
            <span
              style={{
                textDecoration: "underline",
                color: "#EE0033",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              onClick={handleOpenAppInstallModal}
            >
              Tải ứng dụng Viettel Home
            </span>{" "}
            để đăng ký tài khoản
          </Typography>
        </Box>

        <button className={classes.btnSubmit} disabled={loginMutate.isLoading}>
          {loginMutate.isLoading ? (
            <CircularProgress
              size={20}
              color="#fff"
              style={{
                marginTop: "3px",
              }}
            />
          ) : (
            "Đăng nhập"
          )}
        </button>
      </form>
      <AppInstallModal />
    </FormProvider>
  );
};

const useStyles = makeStyles({
  btnSubmit: {
    height: "40px",
    backgroundColor: "#EE0033",
    color: "#fff",
    width: "100%",
    borderRadius: "8px",
    border: "none",
    outline: "none",
    cursor: "pointer",
  },
});

export default LoginTemplate;
