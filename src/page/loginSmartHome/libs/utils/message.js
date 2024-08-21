const getMessageOtp = (code) => {
  switch (code) {
    case 2024:
      return "Bạn đã dùng tối đa số OTP trong ngày";
    case 2001:
      return "Mã OTP không chính xác. Vui lòng thử lại.";
    case 2008:
      return "Mã OTP hết hạn. Vui lòng thử lại.";
    case 2009:
      return "Mã OTP không chính xác. Vui lòng thử lại.";
    case 2023:
      return "Mã OTP không chính xác. Vui lòng thử lại";
    default:
      return "";
  }
};

export { getMessageOtp };
