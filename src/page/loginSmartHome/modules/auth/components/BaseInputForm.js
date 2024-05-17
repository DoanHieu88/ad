import React from "react";
import { Box, Typography } from "@material-ui/core";
import { Controller, useFormContext } from "react-hook-form";
import BaseTextField from "./BaseTextField";
import { InputKey } from "../../../libs/models/common";

const BaseInputForm = ({ label, name, type, placeholder, isRequired }) => {
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
        }}
      >
        {label}
        <span style={{ color: "#EE0033" }}>*</span>
      </Typography>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const { onChange, ...rest } = field;

          const handleChaneInput = (e) => {
            if (type === InputKey.password) {
              if (e.target.value.length > 20) return;

              onChange(e.target.value);
            } else if (type === "phone") {
              const value = e.target.value.replace(/\D/g, "").replace(" ", "");

              if (value.length > 10) return;

              onChange(value);
            } else {
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
