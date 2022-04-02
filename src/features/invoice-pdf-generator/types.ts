import { z } from "zod";

const InvoiceReceiverParser = z.object({
  name: z.string().min(1, "Required"),
  address: z.string().min(1, "Required"),
  email: z.string().min(1, "Required").email("Invalid email"),
});
type InvoiceReceiver = z.infer<typeof InvoiceReceiverParser>;

const InvoiceSenderParser = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  address: z.string().min(1, "Required"),
  city: z.string().min(1, "Required"),
  country: z.string().min(1, "Required"),
  postalCode: z.string().min(1, "Required"),
  email: z.string().min(1, "Required").email("Invalid email"),
  everhourApiKey: z.string().min(1, "Required"),
  description: z.string().optional(),
});
type InvoiceSender = z.infer<typeof InvoiceSenderParser>;

export type { InvoiceSender, InvoiceReceiver };
export { InvoiceSenderParser, InvoiceReceiverParser };
