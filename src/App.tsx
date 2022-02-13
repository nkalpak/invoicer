import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Paper,
  Step,
  StepButton,
  StepLabel,
  Stepper,
  Toolbar,
  Typography,
} from "@mui/material";
import { useStore } from "./features/store";
import { InvoiceSenderForm } from "./features/invoice-sender/components/invoice-sender-form";
import { InvoiceReceiverForm } from "./features/invoice-receiver/components/invoice-receiver-form";

enum OnboardingStep {
  SenderInfo,
  ReceiverInfo,
  AdditionalInfo,
}

function App() {
  const [activeStep, setActiveStep] = React.useState<OnboardingStep>(
    OnboardingStep.SenderInfo
  );

  const { setInvoiceSender, setInvoiceReceiver } = useStore();

  return (
    <div style={{ display: "flex", flexGrow: 1 }}>
      <Box sx={{ flexGrow: 1, color: "white" }}>
        <AppBar position="sticky">
          <Toolbar>
            <IconButton color="inherit" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>

            <Typography variant="h6">Invoice generator</Typography>
          </Toolbar>
        </AppBar>

        <Container maxWidth="md" sx={{ mt: 8 }}>
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
                    <InvoiceSenderForm
                      onSubmit={(data) => {
                        setInvoiceSender(data);
                        setActiveStep(OnboardingStep.ReceiverInfo);
                      }}
                    />
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
      </Box>
    </div>
  );
}

export default App;
