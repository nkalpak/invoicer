import dayjs from "dayjs";
import { useStore } from "../../store";
import React from "react";
import { useLocalStorage } from "react-use";
import {
  formatEverhourDate,
  useGetHoursWorked,
} from "../../home/api/get-hours-worked";
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { FormRow } from "../../../components/form-row/form-row";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { InvoicePdf } from "./invoice-pdf";

function getInvoiceFilename(
  fullName: string,
  dateFrom: string,
  dateTo: string
) {
  return `[Invoice] ${fullName}, ${dayjs(dateFrom).format(
    "YYYY-MM-DD"
  )} - ${dayjs(dateTo).format("YYYY-MM-DD")}`;
}

export function EverhourPdfGenerator() {
  const { invoiceSender, invoiceReceiver } = useStore();
  const [dateFrom, setDateFrom] = React.useState(
    dayjs().startOf("month").toISOString()
  );
  const [dateTo, setDateTo] = React.useState(new Date().toISOString());
  const [hourlyRate, setHourlyRate] = useLocalStorage<number>(
    "invoicer::hourlyRate",
    0
  );

  const getHoursWorked = useGetHoursWorked(dateFrom, dateTo, {
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <TextField
        value={hourlyRate}
        onChange={(event) => setHourlyRate(parseInt(event.target.value, 10))}
        label="Hourly rate"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Typography>€</Typography>
            </InputAdornment>
          ),
        }}
      />

      <FormRow>
        <TextField
          type="date"
          label="From"
          InputLabelProps={{
            shrink: true,
          }}
          value={formatEverhourDate(dateFrom)}
          onChange={(event) => setDateFrom(event.target.value)}
        />

        <TextField
          type="date"
          label="To"
          InputLabelProps={{
            shrink: true,
          }}
          value={formatEverhourDate(dateTo)}
          onChange={(event) => setDateTo(event.target.value)}
        />
      </FormRow>

      <PDFDownloadLink
        fileName={getInvoiceFilename(
          `${invoiceSender.firstName} ${invoiceSender.lastName}`,
          dateFrom,
          dateTo
        )}
        style={{
          textDecoration: "none",
          width: "100%",
        }}
        document={
          <InvoicePdf
            sender={invoiceSender}
            receiver={invoiceReceiver}
            hourlyRateCents={(hourlyRate ?? 0) * 100}
            hours={getHoursWorked.hoursWorked}
            dateGenerated={dayjs().toISOString()}
            description={invoiceSender.description}
            invoiceNumber={1}
          />
        }
      >
        <Button sx={{ width: "100%" }} variant="contained" type="submit">
          Generate Invoice
        </Button>
      </PDFDownloadLink>
    </Box>
  );
}
