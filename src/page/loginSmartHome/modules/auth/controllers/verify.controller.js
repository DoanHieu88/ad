import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { verifySchema } from "../../../libs/validations/auth.validation";
import { useAuthContext } from "../../../libs/provider/AuthProvider";
import { loginSmartHome, sendOtp, verifyOtp } from "../../../libs/data/auth";
import { useMutation } from "@tanstack/react-query";
import useGetAppId from "../../../libs/hooks/useGetAppId";
import { getMessageOtp } from "../../../libs/utils/message";
import { useState } from "react";
import useExpiredController from "./expired.controller";

const arrCodeOtp = [2001, 2008, 2009, 2024];

const useVerifyController = () => {
  const { userInfo } = useAuthContext();
  const [isCountOver, setCountOver] = useState(false);

  const { handleExpired } = useExpiredController();

  const appId = useGetAppId();

  const verifyForm = useForm({
    defaultValues: {
      otp: "",
    },
    mode: "onChange",
    resolver: yupResolver(verifySchema),
  });

  const verifyMutate = useMutation({
    mutationFn: (data) =>
      verifyOtp({
        ...data,
        appId,
      }),
    onSuccess: (res) => {
      const { success, data } = res;

      if (success) {
        const dataJson = JSON.parse(data);

        if (dataJson.code) {
          if (dataJson.code === 2023 || dataJson.code === 2008) {
            if (dataJson.otpError && dataJson.otpError === 9999) {
              handleExpired(dataJson.lastOTP);

              return;
            }
          }

          if (arrCodeOtp.includes(dataJson.code)) {
            verifyForm.setError("otp", {
              type: "manual",
              message: getMessageOtp(dataJson.code),
            });
          }
        } else {
          if (dataJson.otpError && dataJson.otpError === 9999) {
            handleExpired(dataJson.lastOTP);

            return;
          }

          if (dataJson.correct) {
            loginSmartHome({
              ...userInfo,
              appId,
            }).then((res) => {
              alert("Đăng nhập thành công");
            });
          }
        }
      }
    },
  });

  const handleVerify = (data) => {
    if (isCountOver) return;

    verifyMutate.mutate({ identifier: userInfo.identifier, otp: data.otp });
  };

  const handleResend = () => {
    sendOtp({ phone: userInfo.identifier }).then((res) => {
      const { success, data } = res;

      if (success) {
        const dataJson = JSON.parse(data);

        if (arrCodeOtp.includes(dataJson.code)) {
          verifyForm.setError("otp", {
            type: "manual",
            message: getMessageOtp(dataJson.code),
          });
        }
      }
    });
  };

  return {
    verifyForm,
    isCountOver,

    handleVerify,
    handleResend,
    setCountOver,
  };
};

export default useVerifyController;
