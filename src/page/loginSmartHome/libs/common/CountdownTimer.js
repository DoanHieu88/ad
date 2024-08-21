import React, { memo, useEffect } from "react";

function CountdownTimer({
  minutes = 0,
  seconds,
  type,
  isCountOver,
  onTimeUp,
  handleCountOver,
  remainingSeconds,
  setRemainingSeconds,
}) {
  useEffect(() => {
    const interval = setInterval(() => {
      if (remainingSeconds === 0) {
        clearInterval(interval);
        handleCountOver(true);
        if (onTimeUp) {
          onTimeUp();
        }
      } else {
        setRemainingSeconds(remainingSeconds - 1);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remainingSeconds, onTimeUp, handleCountOver]);

  const displayMinutes = Math.floor(remainingSeconds / 60);
  const displaySeconds = remainingSeconds % 60;

  const format = minutes
    ? `${String(displayMinutes).padStart(2, "0")}:${String(
        displaySeconds
      ).padStart(2, "0")}`
    : `${String(displaySeconds).padStart(2, "0")}`;

  let components;
  switch (type) {
    case "otpExp":
      components = (
        <>
          {isCountOver ? (
            <p
              disabled
              style={{
                marginTop: "10px",
                textAlign: "center",
                color: "#AEAEAE",
                fontWeight: "bold",
              }}
            >
              00:00
            </p>
          ) : (
            <p
              style={{
                textAlign: "center",
              }}
              className=" text-primary-600 my-2 text-center font-semibold "
            >
              {format}
            </p>
          )}
        </>
      );
      break;
    case "reSend":
      components = (
        <React.Fragment>
          {isCountOver ? (
            <button
              className={` text-primary-600 hover:text-primary-700 my-2 text-center font-semibold`}
              onClick={() => handleCountOver(false)}
            >
              Gửi lại OTP
            </button>
          ) : (
            <>
              <button
                className=" my-2 text-center font-medium text-gray-500 opacity-50 "
                disabled
              >
                Gửi lại sau {format}s
              </button>
            </>
          )}
        </React.Fragment>
      );
      break;
    default:
      break;
  }
  return <React.Fragment>{components}</React.Fragment>;
}

export default memo(CountdownTimer);
