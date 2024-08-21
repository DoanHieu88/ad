import React from "react";
import { Box, Typography } from "@material-ui/core";
import { Controller, useFormContext } from "react-hook-form";
import BaseTextField from "./BaseTextField";
import { InputKey } from "../../../libs/models/common";

const BaseInputForm = ({
  label,
  name,
  type,
  placeholder,
  isRequired,
  customCallBack,
  maxLength = 20,
}) => {
  const {
    control,
    formState: { errors },
    resetField,
  } = useFormContext();

  const handleResetValue = () => {
    resetField(name);
  };

  return (
    <Box>
      <Typography
        style={{
          marginBottom: "8px",
          fontWeight: 600,
          lineHeight: "24px",
          userSelect: "none",
        }}
      >
        {label}
        {isRequired && <span style={{ color: "#EE0033" }}>*</span>}
      </Typography>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const { onChange, ...rest } = field;

          const handleChaneInput = (e) => {
            if (type === InputKey.password) {
              if (e.target.value.length > maxLength) return;
              customCallBack && customCallBack();

              onChange(e.target.value);
            } else if (type === "phone") {
              customCallBack && customCallBack();

              const value = e.target.value.replace(/\D/g, "").replace(" ", "");

              if (value.length > maxLength) return;

              onChange(value);
            } else {
              customCallBack && customCallBack();

              if (e.target.value.length > maxLength) return;
              const value = e.target.value.replace(" ", "");
              onChange(value);
            }
          };

          return (
            <BaseTextField
              {...rest}
              customStyle={{
                border: errors[name]
                  ? "1px solid #EA0029"
                  : "1px solid #C2C2C2",
              }}
              handleResetValue={handleResetValue}
              onChange={handleChaneInput}
              placeholder={placeholder}
              isPwd={type === InputKey.password}
            />
          );
        }}
      />
      {errors[name] && (
        <Typography
          style={{ color: "#EA0029", marginTop: "8px", lineHeight: "24px" }}
        >
          {errors[name].message}
        </Typography>
      )}
    </Box>
  );
};

export default BaseInputForm;
