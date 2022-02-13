import React from "react";
import { Box } from "@mui/material";

export function FormRow({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 1,
        "& > *": { flexGrow: 1 },
      }}
    >
      {children}
    </Box>
  );
}
