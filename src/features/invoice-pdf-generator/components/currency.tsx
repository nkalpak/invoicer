import React from "react";

interface ICurrencyProps {
  currency?: "eur";
  amountCents: number;
  precision?: number;
}

function getPrecisionForNumber(num: number, desiredPrecision: number) {
  const isWhole = num - Math.floor(num) === 0;
  return isWhole ? 4 : desiredPrecision;
}

const MAPPERS: Record<
  Required<ICurrencyProps>["currency"],
  (amountCents: number, precision?: number) => string
> = {
  eur(amountCents: number, precision: number = 5) {
    const amount = amountCents / 100;
    return `€${amount.toPrecision(getPrecisionForNumber(amount, precision))}`;
  },
};

export function Currency({
  currency = "eur",
  amountCents,
  precision,
}: ICurrencyProps) {
  return (
    <React.Fragment>{MAPPERS[currency](amountCents, precision)}</React.Fragment>
  );
}
