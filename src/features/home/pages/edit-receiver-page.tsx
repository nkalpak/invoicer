import { Container, Paper } from "@mui/material";
import React from "react";
import { useStore } from "../../store";
import { InvoiceReceiverForm } from "../../invoice-pdf-generator/components/invoice-receiver-form";

export function EditReceiverPage() {
  const { setInvoiceReceiver } = useStore();

  return (
    <Container maxWidth="md">
      <Paper sx={{ padding: 4 }}>
        <InvoiceReceiverForm onSubmit={(data) => setInvoiceReceiver(data)} />
      </Paper>
    </Container>
  );
}
