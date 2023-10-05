import { useState, useEffect } from "react";
import styled from "styled-components";

const BalanceNumber = styled.div<{ isHidden?: boolean }>`
  transition: opacity 0.3s ease-in-out;
  opacity: ${({ isHidden }) => (isHidden ? 0 : 1)};
`;

const BalanceCurrency = styled.span`
  font-size: 1.5rem;
`;

const BalanceCurrencyHero = styled(BalanceCurrency)`
  font-size: 2rem;
  font-weight: 700;
`;

const BalanceWhole = styled.span`
  font-size: 1.5rem;
`;

const BalanceWholeHero = styled(BalanceWhole)`
  font-size: 2rem;
  font-weight: 700;
`;

const BalanceFraction = styled.span`
  font-size: 1rem;
`;

const BalanceFractionHero = styled(BalanceFraction)`
  font-size: 1.4rem;
`;

interface CurrencyNumberProps {
  value: number;
  isHidden?: boolean;
}

function CurrencyNumber({ value, isHidden }: CurrencyNumberProps) {
  const [displayedValue, setDisplayedValue] = useState(value);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (isHidden) {
      setIsFading(true);
      setTimeout(() => {
        setDisplayedValue("-");
        setIsFading(false);
      }, 300); // match your transition duration
    } else {
      setIsFading(true);
      setTimeout(() => {
        setDisplayedValue(value);
        setIsFading(false);
      }, 300);
    }
  }, [isHidden, value]);

  return (
    <BalanceNumber isHidden={isFading}>
      {displayedValue === "-" ? (
        <BalanceWhole>—</BalanceWhole>
      ) : (
        <>
          <BalanceCurrency>$</BalanceCurrency>
          <BalanceWhole>{displayedValue}.</BalanceWhole>
          <BalanceFraction>00</BalanceFraction>
        </>
      )}
    </BalanceNumber>
  );
}

function CurrencyNumberHero({ value, isHidden }: CurrencyNumberProps) {
  const [displayedValue, setDisplayedValue] = useState(value);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (isHidden) {
      setIsFading(true);
      setTimeout(() => {
        setDisplayedValue("-");
        setIsFading(false);
      }, 300);
    } else {
      setIsFading(true);
      setTimeout(() => {
        setDisplayedValue(value);
        setIsFading(false);
      }, 300);
    }
  }, [isHidden, value]);

  return (
    <BalanceNumber isHidden={isFading}>
      {displayedValue === "-" ? (
        <BalanceWholeHero>—</BalanceWholeHero>
      ) : (
        <>
          <BalanceCurrencyHero>$</BalanceCurrencyHero>
          <BalanceWholeHero>{displayedValue}.</BalanceWholeHero>
          <BalanceFractionHero>00</BalanceFractionHero>
        </>
      )}
    </BalanceNumber>
  );
}

export { CurrencyNumberHero, CurrencyNumber };
