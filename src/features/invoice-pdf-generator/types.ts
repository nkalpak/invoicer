import { z } from "zod";

const InvoiceReceiverParser = z.object({
  name: z.string().min(1),
  address: z.string().min(1),
  email: z.string().min(1).email("Invalid email"),
});
type InvoiceReceiver = z.infer<typeof InvoiceReceiverParser>;

const InvoiceSenderParser = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  address: z.string().min(1),
  city: z.string().min(1),
  country: z.string().min(1),
  postalCode: z.string().min(1),
  email: z.string().min(1).email("Invalid email"),
  everhourApiKey: z.string().optional(),
});
type InvoiceSender = z.infer<typeof InvoiceSenderParser>;

export type { InvoiceSender, InvoiceReceiver };
export { InvoiceSenderParser, InvoiceReceiverParser };
