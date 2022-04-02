import { useStore } from "../../store";
import { Form } from "../../../components/form/form";
import React from "react";
import { InputField } from "../../../components/form/input-field";
import { Button, Link } from "@mui/material";
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
      onSubmit={(data, event, methods) => {
        methods?.reset(data);
        onSubmit(data);
      }}
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
            label="Everhour Api Key"
            helperText={
              <span>
                You can find your Everhour API key at the bottom of{" "}
                <Link
                  href="https://app.everhour.com/#/account/profile"
                  target="_blank"
                >
                  your profile page
                </Link>
                . The API key will allow the application to get your logged
                hours for a month without you needing to explicitly input them
              </span>
            }
          />

          <InputField
            multiline
            minRows={3}
            maxRows={8}
            registration={register("description")}
            error={formState.errors.description}
            label="Description"
            helperText='Some additional information such as IBAN, SWIFT, etc. This information
            will be included as "transfer instructions" inside the invoice'
          />

          <Button
            disabled={!formState.isDirty}
            variant="contained"
            type="submit"
          >
            Save
          </Button>
        </React.Fragment>
      )}
    </Form>
  );
}
