import {
  Alert,
  Box,
  Container,
  Paper,
  Step,
  StepButton,
  Stepper,
  Typography,
} from "@mui/material";
import { InvoiceSenderForm } from "../../invoice-pdf-generator/components/invoice-sender-form";
import { InvoiceReceiverForm } from "../../invoice-pdf-generator/components/invoice-receiver-form";
import React from "react";
import { useStore } from "../../store";

enum OnboardingStep {
  SenderInfo,
  ReceiverInfo,
  AdditionalInfo,
}

export function OnboardingPage() {
  const [activeStep, setActiveStep] = React.useState<OnboardingStep>(
    OnboardingStep.SenderInfo
  );

  const { setInvoiceSender, setInvoiceReceiver } = useStore();

  return (
    <Container maxWidth="md">
      <Paper sx={{ padding: 4 }}>
        <Box sx={{ mb: 6 }}>
          <Stepper activeStep={activeStep}>
            <Step active={activeStep === OnboardingStep.SenderInfo}>
              <StepButton
                onClick={() => setActiveStep(OnboardingStep.SenderInfo)}
              >
                Sender details
              </StepButton>
            </Step>

            <Step active={activeStep === OnboardingStep.ReceiverInfo}>
              <StepButton
                onClick={() => setActiveStep(OnboardingStep.ReceiverInfo)}
              >
                Receiver details
              </StepButton>
            </Step>
          </Stepper>
        </Box>

        {(() => {
          switch (activeStep) {
            case OnboardingStep.SenderInfo:
              return (
                <Box>
                  <Alert severity="info" sx={{ mb: 4 }}>
                    <Typography variant="body2">
                      None of the information in this application is sent to a
                      server. It is all stored locally in your browser.
                    </Typography>
                  </Alert>

                  <InvoiceSenderForm
                    onSubmit={(data) => {
                      setInvoiceSender(data);
                      setActiveStep(OnboardingStep.ReceiverInfo);
                    }}
                  />
                </Box>
              );
            case OnboardingStep.ReceiverInfo:
              return (
                <InvoiceReceiverForm
                  onSubmit={(data) => {
                    setInvoiceReceiver(data);
                    setActiveStep(OnboardingStep.AdditionalInfo);
                  }}
                />
              );
            default:
              return null;
          }
        })()}
      </Paper>
    </Container>
  );
}
