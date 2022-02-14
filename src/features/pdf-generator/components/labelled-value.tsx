import React from "react";
import { View } from "@react-pdf/renderer";
import {
  Colors,
  Spacing,
} from "../../invoice-pdf-generator/components/invoice-pdf";
import { Typography } from "./typography";

interface ILabelProps {
  children: React.ReactNode;
  label: string;
}

export function LabelledValue({ children, label }: ILabelProps) {
  return (
    <View>
      <LabelledValue.Label>{label}</LabelledValue.Label>

      {children}
    </View>
  );
}

LabelledValue.Label = function ({ children }: Pick<ILabelProps, "children">) {
  return (
    <Typography
      variant="overline"
      style={{
        color: Colors.lightGray,
        marginBottom: Spacing["1"],
      }}
    >
      {children}
    </Typography>
  );
};
