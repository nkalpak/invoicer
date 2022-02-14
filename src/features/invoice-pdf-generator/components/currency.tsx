import React from "react";

interface ICurrencyProps {
  currency?: "eur";
  amountCents: number;
}

const MAPPERS: Record<
  Required<ICurrencyProps>["currency"],
  (amount: number) => string
> = {
  eur(amount: number) {
    return `€${Number(amount / 100).toPrecision(4)}`;
  },
};

export function Currency({ currency = "eur", amountCents }: ICurrencyProps) {
  return <React.Fragment>{MAPPERS[currency](amountCents)}</React.Fragment>;
}
