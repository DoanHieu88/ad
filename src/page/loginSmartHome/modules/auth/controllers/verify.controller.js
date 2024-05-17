import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { verifySchema } from "../../../libs/validations/auth.validation";
import {
  useAuthContext,
  useAuthDispatch,
} from "../../../libs/provider/AuthProvider";
import { sendOtp, verifyOtp } from "../../../libs/data/auth";
import { useMutation } from "@tanstack/react-query";
import useGetAppId from "../../../libs/hooks/useGetAppId";
import { AuthAction } from "../../../libs/models/common";

const useVerifyController = () => {
  const { userInfo, messageOverOtp } = useAuthContext();
  const dispatch = useAuthDispatch();

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
        console.log(data);
      } else {
        console.log(data);
      }
    },
  });

  const handleVerify = (data) => {
    if (messageOverOtp !== "") return;

    verifyMutate.mutate({ identifier: userInfo.identifier, otp: data.otp });
  };

  const handleResend = () => {
    sendOtp({ phone: userInfo.identifier }).then((res) => {
      const { success, data } = res;

      if (success) {
        const dataJson = JSON.parse(data);

        if (dataJson.code === 2024) {
          dispatch({
            type: AuthAction.MESSAGE_OVER_OTP,
            payload: "Bạn đã dùng tối đa số OTP trong ngày",
          });
        }

        if (dataJson.code === 2001) {
          verifyForm.setError("otp", {
            message: "Mã OTP không chính xác. Vui lòng thử lại.",
          });
        }
      }
    });
  };

  return {
    verifyForm,

    handleVerify,
    handleResend,
  };
};

export default useVerifyController;
