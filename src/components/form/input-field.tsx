import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";
import React from "react";

type IInputFieldProps = Omit<TextFieldProps, "error"> & {
  type?: "text" | "email" | "password";
  registration: Partial<UseFormRegisterReturn>;
  label?: string;
  className?: string;
  children?: React.ReactNode;
  error?: FieldError | undefined;
  description?: string;
};

export const InputField = ({ helperText, ...props }: IInputFieldProps) => {
  const { type = "text", label, className, registration, error } = props;
  return (
    <TextField
      type={type}
      className={className}
      // eslint-disable-next-line eqeqeq
      error={error != null}
      label={label}
      helperText={error ? error.message : helperText}
      {...registration}
    />
  );
};
