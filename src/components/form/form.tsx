import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import {
  useForm,
  UseFormReturn,
  SubmitHandler,
  UseFormProps,
} from "react-hook-form";
import { ZodType, ZodTypeDef } from "zod";
import { Box } from "@mui/material";

interface IFormProps<TFormValues, Schema> {
  className?: string;
  onSubmit: SubmitHandler<TFormValues>;
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
  options?: UseFormProps<TFormValues>;
  id?: string;
  schema?: Schema;
}

export const Form = <
  TFormValues extends Record<string, unknown> = Record<string, unknown>,
  Schema extends ZodType<unknown, ZodTypeDef, unknown> = ZodType<
    unknown,
    ZodTypeDef,
    unknown
  >
>({
  onSubmit,
  children,
  className,
  options,
  id,
  schema,
}: IFormProps<TFormValues, Schema>) => {
  const methods = useForm<TFormValues>({
    ...options,
    resolver: schema && zodResolver(schema),
  });

  return (
    <Box
      className={className}
      component="form"
      onSubmit={methods.handleSubmit(onSubmit)}
      id={id}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {children(methods)}
    </Box>
  );
};
