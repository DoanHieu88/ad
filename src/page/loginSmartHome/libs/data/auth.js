import axios from "axios";

export const loginSmartHome = function (formData) {
  return new Promise((resolve, reject) => {
    axios
      .post("http://192.168.17.89:8080/api/loginCms", formData)
      .then((res) =>
        resolve({
          ...res,
        })
      )
      .catch((err) => reject(err));
  });
};

export const getCatpcha = function (formData) {
  const { phone } = formData;

  return new Promise((resolve, reject) => {
    axios
      .get(`http://192.168.17.89:8080/api/getCapcha?code=${phone}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => reject(err));
  });
};

export const sendOtp = (formData) => {
  const { phone } = formData;

  return new Promise((resolve, reject) => {
    axios
      .get(`http://192.168.17.89:8080/api/sendOTP?code=${phone}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => reject(err));
  });
};

export const verifyOtp = (formData) => {
  const { identifier, otp, appId } = formData;

  return new Promise((resolve, reject) => {
    axios
      .post(`http://192.168.17.89:8080/api/authOTP`, { identifier, otp, appId })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => reject(err));
  });
};
