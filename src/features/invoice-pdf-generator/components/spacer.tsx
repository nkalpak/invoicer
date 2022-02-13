import React from "react";
import { View } from "@react-pdf/renderer";

export function Spacer({
  x,
  y,
  fixed,
}: {
  x?: number;
  y?: number;
  fixed?: boolean;
}) {
  return (
    <View
      fixed={fixed}
      style={{
        width: x ? `${x}pt` : 0,
        height: y ? `${y}pt` : 0,
      }}
    />
  );
}
