import React from "react";
import { FormattedNumber } from "react-intl";

interface ICurrencyProps {
  currency?: "eur";
  amountCents: number;
  precision?: number;
}

export function Currency({ currency = "eur", amountCents }: ICurrencyProps) {
  return (
    <FormattedNumber
      roundingPriority="morePrecision"
      value={amountCents / 100}
      currency={currency}
      style="currency"
    />
  );
}
