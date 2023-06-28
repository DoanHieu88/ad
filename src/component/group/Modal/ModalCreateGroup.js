import {
  Box,
  Button,
  Dialog,
  Switch,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React, { useState } from "react";
import CreateUser from "./FormUser";
import { useMutation } from "@tanstack/react-query";
import { addGroup } from "../../../until/api";
import { emailRegex, nameGroupRegex, phoneRegex } from "../../../until/regex";
import FormGroup from "./FormGroup";
import { typeErrForm } from "../../../until/type";
import { footerModalStyle } from "../../../until/style-common";

export const useStylesModalCreate = makeStyles({
  root: {
    "& .MuiDialog-paper": {
      overflowY: "unset",
    },
    "& .MuiPaper-rounded": {
      borderRadius: "12px",
    },
  },
  btnDropdown: {
    width: 450,
    border: "solid 1px #bababb",
    background: "#fff",
    height: 40,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: "4px",
    paddingLeft: 20,
    cursor: "pointer",
    "& p": {
      color: "#bababb",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    "& span": {
      color: "#333",
    },
  },
  Row: {
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: "20px",
  },
  TextFieldCenter: {
    width: 140,
    "& .MuiOutlinedInput-inputMarginDense": {
      textAlign: "center",
    },
  },
  Description: {
    fontSize: 12,
    paddingTop: 5,
    fontStyle: "italic",
  },
  labelInput: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#000",
    paddingBottom: "5px",
  },
});

const ModalCreateGroup = ({ open, handleClose }) => {
  const footerClass = footerModalStyle();
  const classes = useStylesModalCreate();
  const [textSearch, setTextSearch] = useState("");
  const [provinceSelected, setProvinceSelected] = useState();
  const [districtSelected, setDistrictSelected] = useState();
  const [wardSelected, setWardSelected] = useState();
  const [isCheckedCreateUser, setIsCheckedCreateUser] = useState(false);
  const [userType, setUserType] = useState();
  const [userRole, setUserRole] = useState();
  const [dataSubmit, setDataSubmit] = useState({
    parentGroup: "",
    name: "",
    provinceId: "",
    districtId: "",
    wardId: "",
    phone: "",
    email: "",
    type: null,
    userName: "",
    role: "",
    userType: "",
    password: "",
    repeatPassword: "",
    cameraLimited: 30,
  });
  const [messErr, setMessErr] = useState({
    groupErr: "",
    addressErr: "",
    addressDetailErr: "",
    phoneErr: "",
    emailErr: "",
    userNameErr: "",
    passwordErr: "",
    repeatPasswordErr: "",
    typeGroupErr: "",
    userRoleErr: "",
    userTypeErr: "",
  });

  const disableBtn = React.useMemo(() => {
    let disable = true;
    if (
      Object.keys(dataSubmit).length &&
      dataSubmit.name &&
      dataSubmit.districtId &&
      dataSubmit.wardId &&
      dataSubmit.provinceId &&
      dataSubmit.phone &&
      dataSubmit.type
    ) {
      if (
        !messErr.groupErr &&
        !messErr.addressErr &&
        !messErr.addressDetailErr &&
        !messErr.phoneErr &&
        !messErr.emailErr &&
        !messErr.typeGroupErr
      ) {
        disable = false;
      }
      if (isCheckedCreateUser) {
        disable = true;
        if (
          dataSubmit.userName &&
          dataSubmit.password &&
          dataSubmit.repeatPassword &&
          dataSubmit.userType &&
          dataSubmit.role
        )
          if (
            !messErr.userNameErr &&
            !messErr.passwordErr &&
            !messErr.repeatPasswordErr &&
            !messErr.roleErr &&
            !messErr.userTypeErr
          ) {
            disable = false;
          }
      }
      if (dataSubmit.type === 20 && !dataSubmit.cameraLimited) {
        disable = true;
      }
      // disable = false;
    }
    return disable;
  }, [dataSubmit, isCheckedCreateUser, messErr]);

  const changMessErr = (key, value) => {
    setMessErr((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // blur form
  const onBlurGroupName = (value) => {
    let groupErr = "";
    if (!(value || value.trim())) groupErr = typeErrForm["emptyNameGroup"];
    if (value && !nameGroupRegex.test(value))
      groupErr = typeErrForm["invalidGroup"];
    changMessErr("groupErr", groupErr);
  };

  const onBlurAddress = (dataSubmit) => {
    let addressErr = "";
    if (!dataSubmit.provinceId || !dataSubmit.districtId || !dataSubmit.wardId)
      addressErr = typeErrForm["emptyAddress"];

    changMessErr("addressErr", addressErr);
  };

  const onBlurPhone = (value, checked = isCheckedCreateUser) => {
    let phoneErr = "";
    if (checked && !(value || value.trim()))
      phoneErr = typeErrForm["emptyPhone"];
    if (value && !phoneRegex.test(value))
      phoneErr = typeErrForm["invalidPhone"];
    changMessErr("phoneErr", phoneErr);
  };

  const onBlurEmail = (value) => {
    let emailErr = "";
    // if (checked && !(value || value.trim()))
    //   emailErr = typeErrForm["emptyEmail"];

    if (value && !emailRegex.test(value))
      emailErr = typeErrForm["invalidEmail"];

    changMessErr("emailErr", emailErr);
  };

  const onBlurAddressDetail = (value) => {
    let addressDetailErr = "";
    if (!(value || value.trim()))
      addressDetailErr = typeErrForm["emptyAddressDetail"];

    if (value && value.length < 6)
      addressDetailErr = typeErrForm["addressDetailInvalid"];
    changMessErr("addressDetailErr", addressDetailErr);
  };

  const onBlurGroupType = (value) => {
    let typeGroupErr = "";
    if (!value) typeGroupErr = typeErrForm["emptyTypeGroup"];
    changMessErr("typeGroupErr", typeGroupErr);
  };

  const onBlurUserName = (value) => {
    let userNameErr = "";
    if (isCheckedCreateUser) {
      if (!value.trim()) userNameErr = typeErrForm["emptyUsername"];
      if (!nameGroupRegex.test(value))
        userNameErr = typeErrForm["invalidUsername"];
    }

    changMessErr("userNameErr", userNameErr);
  };

  const onBlurPassWord = (value) => {
    let passwordErr = "";
    if (!value.trim()) passwordErr = typeErrForm["emptyPassword"];
    changMessErr("passwordErr", passwordErr);
  };

  const onBlurRepeatPassword = (value) => {
    let repeatPasswordErr = "";
    if (!value.trim()) repeatPasswordErr = typeErrForm["emptyRepeatPassword"];
    if (dataSubmit.password && value && dataSubmit.password !== value)
      repeatPasswordErr = typeErrForm["repeatPasswordNotMatch"];
    changMessErr("repeatPasswordErr", repeatPasswordErr);
  };

  const onBlurUserRole = (value) => {
    let userRoleErr = "";
    if (!value) userRoleErr = typeErrForm["emptyUserRole"];
    changMessErr("userRoleErr", userRoleErr);
  };

  const onBlurUserType = (value) => {
    let userTypeErr = "";
    if (!value) userTypeErr = typeErrForm["emptyUserType"];
    changMessErr("userTypeErr", userTypeErr);
  };

  const onChangeDataSubmit = (value, key) => {
    setDataSubmit((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  //api
  const handleCreateGroup = useMutation((formData) => addGroup(formData));

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="draggable-dialog-title"
      maxWidth="xl"
      className={classes.root}
    >
      <Box
        style={{
          width: 1000,
          height: "auto",
        }}
      >
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginInline: "24px",
            padding: "20px 0 10px 0",
          }}
        >
          <Typography style={{ fontWeight: 800 }}> Create New Group</Typography>
        </Box>
        <Box style={{ height: "auto", padding: "8px 24px" }}>
          <Box style={{ display: "flex", flexDirection: "column" }}>
            <FormGroup
              onChangeDataSubmit={onChangeDataSubmit}
              onBlurGroupName={onBlurGroupName}
              onBlurPhone={onBlurPhone}
              onBlurAddress={onBlurAddress}
              onBlurAddressDetail={onBlurAddressDetail}
              onBlurGroupType={onBlurGroupType}
              onBlurEmail={onBlurEmail}
              setTextSearch={setTextSearch}
              setWardSelected={setWardSelected}
              setDistrictSelected={setDistrictSelected}
              setProvinceSelected={setProvinceSelected}
              provinceSelected={provinceSelected}
              districtSelected={districtSelected}
              wardSelected={wardSelected}
              dataSubmit={dataSubmit}
              textSearch={textSearch}
              messErr={messErr}
            />

            <Box className={classes.Row}>
              <Box style={{ display: "flex", alignItems: "center" }}>
                <Switch
                  onChange={(e) => {
                    setIsCheckedCreateUser(e.target.checked);
                    setMessErr((prev) => ({
                      ...prev,
                      userNameErr: "",
                      passwordErr: "",
                      repeatPasswordErr: "",
                      userRoleErr: "",
                      userTypeErr: "",
                    }));
                    setDataSubmit((prev) => ({
                      ...prev,
                      userName: "",
                      password: "",
                      repeatPassword: "",
                      role: "",
                      userType: "",
                    }));
                    onBlurEmail(dataSubmit.email, e.target.checked);
                    onBlurPhone(dataSubmit.phone, e.target.checked);
                  }}
                />
                <Typography>Create User account</Typography>
              </Box>
            </Box>
            {isCheckedCreateUser && (
              <CreateUser
                setUserType={setUserType}
                userType={userType}
                setUserRole={setUserRole}
                userRole={userRole}
                setDataSubmit={setDataSubmit}
                onChangeDataSubmit={onChangeDataSubmit}
                onBlurRepeatPassword={onBlurRepeatPassword}
                onBlurPassWord={onBlurPassWord}
                onBlurUserName={onBlurUserName}
                messErr={messErr}
                onBlurUserType={onBlurUserType}
                onBlurUserRole={onBlurUserRole}
                dataSubmit={dataSubmit}
              />
            )}
          </Box>
        </Box>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "20px 0 24px 0",
          }}
        >
          <Button
            onClick={() => {
              handleCreateGroup.mutate({
                ...dataSubmit,
                parentId: "",
              });
            }}
            className={footerClass.btnSubmit}
            disabled={disableBtn}
          >
            Save
          </Button>
          <Button onClick={handleClose} className={footerClass.btnCancel}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default React.memo(ModalCreateGroup);
