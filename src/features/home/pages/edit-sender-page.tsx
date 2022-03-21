import { Container, Paper } from "@mui/material";
import React from "react";
import { InvoiceSenderForm } from "../../invoice-pdf-generator/components/invoice-sender-form";
import { useStore } from "../../store";

export function EditSenderPage() {
  const { setInvoiceSender } = useStore();

  return (
    <Container maxWidth="md">
      <Paper sx={{ padding: 4 }}>
        <InvoiceSenderForm onSubmit={(data) => setInvoiceSender(data)} />
      </Paper>
    </Container>
  );
}
