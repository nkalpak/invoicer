import React, { ComponentProps } from "react";
import { Text, StyleSheet } from "@react-pdf/renderer";

interface ITypographyProps {
  variant: "body1" | "body2" | "overline";
  children: React.ReactNode;
  style?: ComponentProps<typeof Text>["style"];
  align?: "left" | "right";
}

const typographyStyle = StyleSheet.create({
  body1: {
    fontSize: 12,
    letterSpacing: 0.5,
  },
  body2: {
    fontSize: 9,
    letterSpacing: 0.25,
  },
  overline: {
    textTransform: "uppercase",
    fontWeight: 700,
    fontSize: 7,
  },
});

export function Typography({
  variant,
  children,
  style,
  align = "left",
}: ITypographyProps) {
  return (
    <Text
      style={{
        ...(typographyStyle[variant] as any),
        ...style,
        textAlign: align,
      }}
    >
      {children}
    </Text>
  );
}
