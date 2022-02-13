import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import {
  invoiceBuilder,
  InvoicePdf,
} from "./features/invoice-pdf-generator/components/invoice-pdf";

function App() {
  return (
    <div style={{ display: "flex", flexGrow: 1 }}>
      <PDFViewer style={{ flexGrow: 1 }}>
        <InvoicePdf {...invoiceBuilder()} />
      </PDFViewer>
    </div>
  );
}

export default App;
