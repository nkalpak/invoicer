import { useStore } from "../../store";
import { Form } from "../../../components/form/form";
import React from "react";
import { InputField } from "../../../components/form/input-field";
import { Button } from "@mui/material";
import { SubmitHandler } from "react-hook-form";
import { FormRow } from "../../../components/form-row/form-row";
import { InvoiceSender, InvoiceSenderParser } from "../types";

type SenderFormSchema = InvoiceSender;

interface IInvoiceSenderFormProps {
  onSubmit: SubmitHandler<SenderFormSchema>;
}

export function InvoiceSenderForm({ onSubmit }: IInvoiceSenderFormProps) {
  const { invoiceSender } = useStore();

  return (
    <Form<SenderFormSchema>
      schema={InvoiceSenderParser}
      onSubmit={onSubmit}
      options={{ defaultValues: invoiceSender }}
    >
      {({ formState, register }) => (
        <React.Fragment>
          <FormRow>
            <InputField
              error={formState.errors.firstName}
              registration={register("firstName")}
              label="First name"
            />

            <InputField
              registration={register("lastName")}
              error={formState.errors.lastName}
              label="Last name"
            />
          </FormRow>

          <InputField
            registration={register("address")}
            error={formState.errors.address}
            label="Address"
          />

          <FormRow>
            <InputField
              registration={register("country")}
              error={formState.errors.country}
              label="Country"
            />

            <InputField
              registration={register("city")}
              error={formState.errors.city}
              label="City"
            />

            <InputField
              registration={register("postalCode")}
              error={formState.errors.postalCode}
              label="Postal code"
            />
          </FormRow>

          <InputField
            registration={register("email")}
            error={formState.errors.email}
            label="Email"
          />

          <InputField
            registration={register("everhourApiKey")}
            error={formState.errors.everhourApiKey}
            label="Everhour Api Key (optional)"
          />

          <Button variant="contained" type="submit">
            Submit
          </Button>
        </React.Fragment>
      )}
    </Form>
  );
}
