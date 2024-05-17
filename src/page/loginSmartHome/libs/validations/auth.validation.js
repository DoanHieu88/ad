import * as yup from "yup";

const loginSchema = yup.object().shape({
  identifier: yup
    .string()
    .required("Vui lòng không để trống số điện thoại.")
    .matches(/(0[3|5|7|8|9])+([0-9]{8})\b/, "Số điện thoại không hợp lệ."),
  password: yup.string().required("Vui lòng không để trống mật khẩu."),
});

const verifySchema = yup.object().shape({
  otp: yup
    .string()
    .required("Vui lòng không để trống mã OTP.")
    .matches(/^[0-9]{6}$/, "Mã OTP không hợp lệ."),
});

export { loginSchema, verifySchema };
