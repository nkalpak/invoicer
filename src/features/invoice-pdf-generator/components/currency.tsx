import React from "react";

interface ICurrencyProps {
  currency?: "eur";
  amountCents: number;
}

const MAPPERS: Record<
  Required<ICurrencyProps>["currency"],
  (amount: number) => string
> = {
  eur: (amount: number) => `€${amount / 100}`,
};

export function Currency({ currency = "eur", amountCents }: ICurrencyProps) {
  return <React.Fragment>{MAPPERS[currency](amountCents)}</React.Fragment>;
}
