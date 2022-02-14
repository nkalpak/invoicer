import React from "react";
import dayjs from "dayjs";
import MetergramLogo from "../../../assets/images/metergram-logo.png";
import { build, fake } from "@jackfranklin/test-data-bot";
import { Document, Page, Text, View, Image } from "@react-pdf/renderer";
import { registerFonts } from "../utils/register-fonts";
import { Currency } from "./currency";
import { PdfGenerator } from "../../pdf-generator";

interface IInvoiceSender {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  email: string;
}

interface IInvoiceReceiver {
  name: string;
  address: string;
  email: string;
}

interface IInvoicePdfProps {
  sender: IInvoiceSender;
  receiver: IInvoiceReceiver;

  hourlyRateCents: number;
  hours: number;
  dateGenerated: string;
  description: string;
  invoiceNumber: number;
}

const senderBuilder = build<IInvoiceSender>({
  fields: {
    firstName: fake((f) => f.name.firstName()),
    lastName: fake((f) => f.name.lastName()),
    address: fake((f) => f.address.streetAddress()),
    city: fake((f) => f.address.city()),
    country: fake((f) => f.address.country()),
    email: fake((f) => f.internet.email()),
    postalCode: fake((f) => f.address.zipCode()),
  },
});

const receiverBuilder = build<IInvoiceReceiver>({
  fields: {
    address: fake((f) => f.address.streetAddress()),
    email: fake((f) => f.internet.email()),
    name: fake((f) => f.company.companyName()),
  },
});

export const invoiceBuilder = build<IInvoicePdfProps>({
  fields: {
    sender: {},
    receiver: {},
    dateGenerated: fake((f) => f.date.past().toISOString()),
    description: fake((f) => f.lorem.paragraph(5)),
    hourlyRateCents: fake((f) =>
      f.datatype.number({ min: 1 * 100, max: 40 * 100 })
    ),
    hours: fake((f) => f.datatype.number({ min: 150, max: 200 })),
    invoiceNumber: fake((f) => f.datatype.number({ min: 1, max: 300 })),
  },
  postBuild: (x) => {
    x.receiver = receiverBuilder();
    x.sender = senderBuilder();

    return x;
  },
});

registerFonts();
export const Colors = {
  primary: "#0F336A",
  text: "#616161",
  lightGray: "#CDCDCD",
  lighterGray: "#ECECEC",
};
export const Spacing = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
};

function getInvoiceDueDate(startDate: string) {
  return dayjs(startDate).add(14, "days").toISOString();
}

function formatDate(date: string) {
  return dayjs(date).format("YYYY-MM-DD");
}

export function InvoicePdf({
  hours,
  hourlyRateCents,
  description,
  dateGenerated,
  sender,
  receiver,
  invoiceNumber,
}: IInvoicePdfProps) {
  return (
    <Document>
      <Page
        style={{
          padding: Spacing["8"],
          paddingTop: Spacing["6"],
          paddingBottom: Spacing["6"],
          fontFamily: "Fira Sans",
          color: Colors.text,
        }}
      >
        <Image
          style={{ width: 28, height: 28, marginBottom: Spacing["2"] }}
          src={MetergramLogo}
        />

        <View style={{ fontSize: 10, marginBottom: Spacing["8"] }}>
          <PdfGenerator.Typography
            variant="body2"
            style={{
              fontWeight: 500,
            }}
          >
            {sender.firstName} {sender.lastName}
          </PdfGenerator.Typography>
          <PdfGenerator.Typography variant="body2">
            {sender.address}
          </PdfGenerator.Typography>
          <PdfGenerator.Typography variant="body2">
            {sender.city} {sender.postalCode}, {sender.country}
          </PdfGenerator.Typography>
        </View>

        <Text
          style={{
            fontWeight: 500,
            color: Colors.primary,
            marginBottom: Spacing["8"],
          }}
        >
          Invoice #{invoiceNumber}
        </Text>

        <PdfGenerator.Row gap={Spacing["10"]}>
          <PdfGenerator.LabelledValue label="Bill to">
            <PdfGenerator.Typography
              variant="body2"
              style={{ fontWeight: 500 }}
            >
              {receiver.name}
            </PdfGenerator.Typography>
            <PdfGenerator.Typography variant="body2">
              {receiver.address}
            </PdfGenerator.Typography>
            <PdfGenerator.Typography variant="body2">
              {receiver.email}
            </PdfGenerator.Typography>
          </PdfGenerator.LabelledValue>

          <PdfGenerator.LabelledValue label="Date">
            <PdfGenerator.Typography variant="body2">
              {formatDate(dateGenerated)}
            </PdfGenerator.Typography>
          </PdfGenerator.LabelledValue>

          <PdfGenerator.LabelledValue label="Due date">
            <PdfGenerator.Typography variant="body2">
              {formatDate(getInvoiceDueDate(dateGenerated))}
            </PdfGenerator.Typography>
          </PdfGenerator.LabelledValue>
        </PdfGenerator.Row>

        <View style={{ marginTop: Spacing["8"] }}>
          <PdfGenerator.Row
            style={{
              paddingBottom: Spacing["1"],
              color: Colors.lightGray,
              borderBottom: `1px solid ${Colors.lighterGray}`,
            }}
          >
            <PdfGenerator.Typography variant="overline">
              #
            </PdfGenerator.Typography>
            <PdfGenerator.Typography variant="overline">
              Description
            </PdfGenerator.Typography>
            <PdfGenerator.Typography variant="overline">
              Quantity
            </PdfGenerator.Typography>
            <PdfGenerator.Typography variant="overline" align="right">
              Rate
            </PdfGenerator.Typography>
            <PdfGenerator.Typography variant="overline" align="right">
              Amount
            </PdfGenerator.Typography>
          </PdfGenerator.Row>

          <PdfGenerator.Row
            style={{
              paddingBottom: Spacing["2"],
              paddingTop: Spacing["2"],
              borderBottom: `1px solid ${Colors.lighterGray}`,
            }}
          >
            <PdfGenerator.Typography variant="body2">1</PdfGenerator.Typography>
            <PdfGenerator.Typography variant="body2">
              Consulting Services
            </PdfGenerator.Typography>
            <PdfGenerator.Typography variant="body2">
              {hours.toPrecision(4)}
            </PdfGenerator.Typography>
            <PdfGenerator.Typography variant="body2" align="right">
              <Currency amountCents={hourlyRateCents} />
            </PdfGenerator.Typography>
            <PdfGenerator.Typography variant="body2" align="right">
              <Currency amountCents={hourlyRateCents * hours} />
            </PdfGenerator.Typography>
          </PdfGenerator.Row>
        </View>

        <View
          style={{
            marginTop: Spacing["4"],
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ maxWidth: "60%" }}>
            <PdfGenerator.LabelledValue label="Description">
              <PdfGenerator.Typography variant="body2">
                {description}
              </PdfGenerator.Typography>
            </PdfGenerator.LabelledValue>
          </View>

          <View
            style={{
              maxWidth: 150,
              marginLeft: Spacing["10"],
              flexGrow: 1,
            }}
          >
            <View
              style={{
                borderBottom: `1px solid ${Colors.lighterGray}`,
                paddingBottom: Spacing["2"],
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                }}
              >
                <PdfGenerator.LabelledValue.Label>
                  Subtotal
                </PdfGenerator.LabelledValue.Label>
                <PdfGenerator.Typography variant="body2">
                  <Currency amountCents={hours * hourlyRateCents} />
                </PdfGenerator.Typography>
              </View>

              <View
                style={{
                  marginTop: Spacing["1"],
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                }}
              >
                <PdfGenerator.LabelledValue.Label>
                  Tax
                </PdfGenerator.LabelledValue.Label>
                <PdfGenerator.Typography variant="body2">
                  0%
                </PdfGenerator.Typography>
              </View>
            </View>

            <View
              style={{
                marginTop: Spacing["1"],
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
                justifyContent: "space-between",
                paddingTop: Spacing["2"],
              }}
            >
              <PdfGenerator.LabelledValue.Label>
                Total
              </PdfGenerator.LabelledValue.Label>
              <Text
                style={{
                  color: Colors.primary,
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: 1,
                }}
              >
                <Currency amountCents={hours * hourlyRateCents} />
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
