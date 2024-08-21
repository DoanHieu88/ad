import extendedDayJs from "../../../../../utils/dayjs";
import { AuthAction } from "../../../libs/models/common";
import { useAuthDispatch } from "../../../libs/provider/AuthProvider";
import { secondsToMMSS } from "../../../libs/utils/common";

const useExpiredController = () => {
  const dispatch = useAuthDispatch();

  const handleResetExpired = () => {
    dispatch({
      type: AuthAction.MESSAGE_OVER_OTP,
      payload: {
        code: 0,
        message: "",
      },
    });

    dispatch({
      type: AuthAction.TIME_EXPIRED,
      payload: 0,
    });

    dispatch({
      type: AuthAction.STATUS_RESEND,
      payload: false,
    });
  };

  const handleExpired = (timeOtp) => {
    const time = extendedDayJs(timeOtp)
      .utc()
      .diff(extendedDayJs().local().add(7, "hours"), "seconds");

    dispatch({
      type: AuthAction.MESSAGE_OVER_OTP,
      payload: {
        code: 2008,
        message: `Bạn đã nhập sai mã OTP quá 5 lần, vui lòng chờ ${secondsToMMSS(
          time
        )} để thử lại`,
      },
    });

    dispatch({
      type: AuthAction.TIME_EXPIRED,
      payload: time,
    });
  };

  return {
    handleResetExpired,
    handleExpired,
  };
};

export default useExpiredController;
