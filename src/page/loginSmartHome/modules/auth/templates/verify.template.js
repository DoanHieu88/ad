import React, { useCallback, useEffect, useState } from "react";
import useVerifyController from "../controllers/verify.controller";
import { Controller, FormProvider } from "react-hook-form";
import OTPInput from "react-otp-input";
import CountdownTimer from "../../../libs/common/CountdownTimer";
import { Box, Typography } from "@material-ui/core";
import { sendOtp } from "../../../libs/data/auth";
import {
  useAuthContext,
  useAuthDispatch,
} from "../../../libs/provider/AuthProvider";
import { AuthAction, AuthTabPanel } from "../../../libs/models/common";
import useExpiredController from "../controllers/expired.controller";

const totalSeconds = 2 * 60 + 0;

const VerifyTemplate = () => {
  const { userInfo, messageOverOtp, statusResend, timeExpired } =
    useAuthContext();
  const { verifyForm, isCountOver, setCountOver, handleVerify } =
    useVerifyController();
  const { handleResetExpired } = useExpiredController();
  const dispatch = useAuthDispatch();

  const [remainingSeconds, setRemainingSeconds] = useState(totalSeconds);

  const {
    formState: { errors },
  } = verifyForm;

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the default form submission behavior
    }
  };

  useEffect(() => {
    if (timeExpired === 0) return;

    setRemainingSeconds(timeExpired);
  }, [timeExpired]);

  const handleReSendOtp = () => {
    sendOtp({ phone: userInfo.identifier });
  };

  const handleCountOver = useCallback((status) => {
    setCountOver(status);
    dispatch({
      type: AuthAction.STATUS_RESEND,
      payload: false,
    });
    handleResetExpired();
  }, []);

  const handleResend = () => {
    if (statusResend || messageOverOtp.code === 2024) return;

    handleReSendOtp();
    dispatch({
      type: AuthAction.STATUS_RESEND,
      payload: true,
    });
    setCountOver(false);
    setRemainingSeconds(totalSeconds);
  };

  return (
    <FormProvider {...verifyForm}>
      <form
        onSubmit={verifyForm.handleSubmit(handleVerify)}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        <Controller
          control={verifyForm.control}
          name="otp"
          render={({ field: { value, onChange } }) => {
            return (
              <OTPInput
                containerStyle={{
                  justifyContent: "center",
                  width: "100%",
                  gap: "20px",
                }}
                inputStyle={{
                  border: `1px solid #C2C2C2`,
                  width: "48px",
                  height: "48px",
                  borderRadius: "6px",
                  boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.25)",
                }}
                value={value}
                onChange={(e) => {
                  onChange(e);
                }}
                numInputs={6}
                inputType="tel"
                renderInput={(props) => (
                  <input
                    {...props}
                    onKeyDown={handleInputKeyDown}
                    placeholder="0"
                  />
                )}
              />
            );
          }}
        />

        {messageOverOtp.code !== 0 ? (
          <Typography
            style={{ color: "#EA0029", marginTop: "8px", lineHeight: "24px" }}
          >
            {messageOverOtp.message}
          </Typography>
        ) : errors["otp"] ? (
          <Typography
            style={{ color: "#EA0029", marginTop: "8px", lineHeight: "24px" }}
          >
            {errors["otp"].message}
          </Typography>
        ) : null}
        <Box>
          <CountdownTimer
            isCountOver={isCountOver}
            handleCountOver={handleCountOver}
            remainingSeconds={remainingSeconds}
            setRemainingSeconds={setRemainingSeconds}
            minutes={2}
            seconds={0}
            type="otpExp"
          />

          <Typography
            style={{
              textAlign: "center",
            }}
          >
            {isCountOver ? "OTP đã hết hạn." : "Bạn chưa nhận được OTP?"}{" "}
            <span
              style={{
                textDecoration: "underline",
                color:
                  statusResend ||
                  messageOverOtp.code === 2008 ||
                  messageOverOtp.code === 2024
                    ? "#AEAEAE"
                    : "#EE0033",
                cursor:
                  statusResend ||
                  messageOverOtp.code === 2008 ||
                  messageOverOtp.code === 2024
                    ? "not-allowed"
                    : "pointer",
              }}
              onClick={handleResend}
            >
              Gửi lại
            </span>
          </Typography>

          <Box
            style={{
              marginTop: "16px",
            }}
          >
            <button
              type="submit"
              style={{
                height: "40px",
                backgroundColor:
                  errors["otp"] || isCountOver || messageOverOtp.code !== 0
                    ? "#AEAEAE"
                    : "#EE0033",
                color: "#fff",
                width: "100%",
                borderRadius: "8px",
                border: "none",
                cursor:
                  errors["otp"] || isCountOver || messageOverOtp.code !== 0
                    ? "not-allowed"
                    : "pointer",
              }}
              disabled={
                errors["otp"] || isCountOver || messageOverOtp.code !== 0
              }
            >
              Xác nhận
            </button>
            <button
              style={{
                height: "40px",
                width: "100%",
                marginTop: "8px",
                textDecoration: "underline",
                backgroundColor: "transparent",
                border: "none",
                outline: "none",
                cursor: "pointer",
              }}
              onClick={() => {
                dispatch({
                  type: AuthAction.TAB,
                  payload: AuthTabPanel.LOGIN,
                });

                handleResetExpired();
              }}
            >
              Hủy bỏ
            </button>
          </Box>
        </Box>
      </form>
    </FormProvider>
  );
};

export default VerifyTemplate;
