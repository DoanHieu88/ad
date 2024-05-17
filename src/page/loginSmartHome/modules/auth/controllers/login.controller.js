import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { loginSchema } from "../../../libs/validations/auth.validation";
import { getCatpcha, loginSmartHome, sendOtp } from "../../../libs/data/auth";
import { useMutation } from "@tanstack/react-query";
import {
  useAuthContext,
  useAuthDispatch,
} from "../../../libs/provider/AuthProvider";
import { AuthAction, AuthTabPanel } from "../../../libs/models/common";
import useGetAppId from "../../../libs/hooks/useGetAppId";

const useLoginController = () => {
  const { captchaImage } = useAuthContext();
  const dispatch = useAuthDispatch();
  const appId = useGetAppId();

  const loginForm = useForm({
    defaultValues: {
      identifier: "",
      password: "",
    },
    mode: "onChange",
    resolver: yupResolver(loginSchema),
  });

  const handleGetCaptcha = () => {
    getCatpcha({ phone: loginForm.getValues("identifier") })
      .then((res) => {
        if (res.success) {
          if (dispatch !== null) {
            dispatch({
              type: AuthAction.CATPCHA_STATUS,
              payload: "data:image/jpeg;base64," + res.data,
            });
            loginForm.setValue("captcha", "");
          }
        } else {
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSendOtp = () => {
    sendOtp({ phone: loginForm.getValues("identifier") }).then((res) => {
      const { success, data } = res;

      if (success) {
        const dataJson = JSON.parse(data);

        if (dataJson.code === 2024) {
          dispatch({
            type: AuthAction.MESSAGE_OVER_OTP,
            payload: "Bạn đã dùng tối đa số OTP trong ngày",
          });
        }
      }
    });
  };

  const loginMutate = useMutation({
    mutationFn: (data) =>
      loginSmartHome({
        ...data,
        appId,
      }),
    onSuccess: (res) => {
      const { success, data } = res;

      if (success) {
        localStorage.setItem("smartHome", JSON.stringify(data));
      } else {
        const dataJson = JSON.parse(data.data);

        if (dataJson.code === 2003) {
          loginForm.setError("password", {
            type: "manual",
            message: "Mật khẩu hoặc số điện thoại không khớp.",
          });
          loginForm.setError("identifier", {
            type: "manual",
            message: "",
          });
        }

        if (dataJson.code === 2013) {
          loginForm.setError("password", {
            type: "manual",
            message: dataJson.message,
          });

          if (captchaImage !== "") {
            handleGetCaptcha();
          }
        }

        if (dataJson.code === 3005) {
          handleGetCaptcha();
        }

        if (dataJson.code === 3003) {
          loginForm.setError("captcha", {
            type: "manual",
            message: "Mã Captcha không hợp lệ",
          });

          handleGetCaptcha();
        }

        if (dataJson.code === 2030) {
          dispatch({
            type: AuthAction.USER_INFO,
            payload: {
              identifier: loginForm.getValues("identifier"),
              password: loginForm.getValues("password"),
            },
          });

          dispatch({
            type: AuthAction.TAB,
            payload: AuthTabPanel.VERIFY,
          });
          handleSendOtp();
        }
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleLogin = (data) => {
    if (loginMutate.isLoading) return;

    loginMutate.mutate(data);
  };

  return {
    loginForm,
    loginMutate,

    handleLogin,
  };
};

export default useLoginController;
