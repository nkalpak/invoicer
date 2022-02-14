import React from "react";
import { Form } from "../../../components/form/form";
import { InputField } from "../../../components/form/input-field";
import { SubmitHandler } from "react-hook-form";
import { Button } from "@mui/material";
import { useStore } from "../../store";
import { InvoiceReceiver, InvoiceReceiverParser } from "../types";

interface IInvoiceReceiverFormProps {
  onSubmit: SubmitHandler<InvoiceReceiver>;
}

export function InvoiceReceiverForm({ onSubmit }: IInvoiceReceiverFormProps) {
  const { invoiceReceiver } = useStore();

  return (
    <Form<InvoiceReceiver>
      onSubmit={onSubmit}
      schema={InvoiceReceiverParser}
      options={{ defaultValues: invoiceReceiver }}
    >
      {({ formState, register }) => (
        <React.Fragment>
          <InputField
            label="Name"
            error={formState.errors.name}
            registration={register("name")}
          />

          <InputField
            label="Address"
            error={formState.errors.address}
            registration={register("address")}
          />

          <InputField
            label="Email"
            error={formState.errors.email}
            registration={register("email")}
          />

          <Button variant="contained" type="submit">
            Submit
          </Button>
        </React.Fragment>
      )}
    </Form>
  );
}
