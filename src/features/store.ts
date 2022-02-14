import create from "zustand";
import { InvoiceReceiver, InvoiceSender } from "./invoice-pdf-generator/types";

interface IStore {
  invoiceSender: InvoiceSender;
  invoiceReceiver: InvoiceReceiver;
  setInvoiceSender: (invoiceSender: InvoiceSender) => void;
  setInvoiceReceiver: (invoiceReceiver: InvoiceReceiver) => void;
}

type DefaultStoreState = Pick<IStore, "invoiceSender" | "invoiceReceiver">;
const defaultStoreState: DefaultStoreState = {
  invoiceSender: {
    city: "",
    address: "",
    email: "",
    postalCode: "",
    country: "",
    firstName: "",
    lastName: "",
  },
  invoiceReceiver: {
    email: "",
    address: "",
    name: "",
  },
};

export const useStore = create<IStore>((set) => ({
  ...getItem("invoicer::state", defaultStoreState),
  setInvoiceSender: (invoiceSender: InvoiceSender) => set({ invoiceSender }),
  setInvoiceReceiver: (invoiceReceiver) => set({ invoiceReceiver }),
}));

function getItem(key: string, defaultValue: any) {
  try {
    const value = localStorage.getItem(key);
    if (!value) {
      return defaultValue;
    }

    return JSON.parse(value);
  } catch (error) {
    return defaultValue;
  }
}

useStore.subscribe((state) =>
  localStorage.setItem("invoicer::state", JSON.stringify(state))
);
