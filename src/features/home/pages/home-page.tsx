import { Container, Paper } from "@mui/material";
import React from "react";
import { EverhourPdfGenerator } from "../../invoice-pdf-generator";

export function HomePage() {
  return (
    <Container maxWidth="md">
      <Paper sx={{ padding: 4 }}>
        <EverhourPdfGenerator />
      </Paper>
    </Container>
  );
}
