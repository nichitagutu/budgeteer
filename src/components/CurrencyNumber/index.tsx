import { useState, useEffect } from "react";
import CountUp from "react-countup";
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
  isHero: boolean;
  isHidden?: boolean;
}

function CurrencyNumber({ value, isHidden, isHero }: CurrencyNumberProps) {
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

  const whole = Number.parseInt(displayedValue.toString().split(".")[0]);
  const fraction =
    Number.parseInt(displayedValue.toString().split(".")[1]) || 0;

  return (
    <BalanceNumber isHidden={isFading}>
      {displayedValue === "-" ? (
        <BalanceWhole>—</BalanceWhole>
      ) : (
        <>
          {isHero ? (
            <BalanceCurrencyHero>$</BalanceCurrencyHero>
          ) : (
            <BalanceCurrency>$</BalanceCurrency>
          )}
          <CountUpBalance value={whole} isHero={isHero} isFraction={false} />
          .
          <CountUpBalance value={fraction} isHero={isHero} isFraction={true} />
        </>
      )}
    </BalanceNumber>
  );
}

function CountUpBalance({
  value,
  isHero,
  isFraction,
}: {
  value: number;
  isHero: boolean;
  isFraction: boolean;
}) {
  const Wrapper = isHero
    ? isFraction
      ? BalanceFractionHero
      : BalanceWholeHero
    : isFraction
    ? BalanceFraction
    : BalanceWhole;
  return (
    <Wrapper>
      <CountUp start={0} end={value} duration={1.6} />
    </Wrapper>
  );
}

export { CurrencyNumber };
