import { z } from "zod";

const InvoiceReceiverParser = z.object({
  name: z.string().min(1),
  address: z.string().min(1),
  email: z.string().min(1).email("Invalid email"),
});

type InvoiceReceiver = z.infer<typeof InvoiceReceiverParser>;

export { InvoiceReceiverParser };
export type { InvoiceReceiver };
