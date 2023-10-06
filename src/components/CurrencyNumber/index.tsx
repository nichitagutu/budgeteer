import { useState, useEffect } from "react";
import CountUp from "react-countup";
import styled from "styled-components";

const BalanceNumber = styled.div<{ isHidden?: boolean }>`
  transition: opacity 0.3s ease-in-out;
  opacity: ${({ isHidden }) => (isHidden ? 0 : 1)};
`;

const BalanceWholeSmall = styled.span`
  font-size: 0.8rem;
`;

const BalanceWholeMedium = styled(BalanceWholeSmall)`
  font-size: 1rem;
`;

const BalanceWhole = styled(BalanceWholeMedium)`
  font-size: 1.5rem;
`;

const BalanceWholeHero = styled(BalanceWhole)`
  font-size: 2rem;
  font-weight: 700;
`;

const BalanceFractionSmall = styled.span`
  font-size: 0.6rem;
`;

const BalanceFractionMedium = styled(BalanceFractionSmall)`
  font-size: 0.8rem;
`;

const BalanceFraction = styled(BalanceFractionMedium)`
  font-size: 1rem;
`;

const BalanceFractionHero = styled(BalanceFraction)`
  font-size: 1.4rem;
`;

interface CurrencyNumberProps {
  value: number;
  size: 'small' | 'medium' | 'big' | 'large';
  isHidden?: boolean;
}

function CurrencyNumber({ value, isHidden, size }: CurrencyNumberProps) {
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
          {size === "large" ? (
            <BalanceWholeHero>$</BalanceWholeHero>
          ) : size === "big" ? (
            <BalanceWhole>$</BalanceWhole>
          ) : size === "medium" ? (
            <BalanceWholeMedium>$</BalanceWholeMedium>
          ) : (
            <BalanceWholeSmall>$</BalanceWholeSmall>
          )}
          <CountUpBalance value={whole} size={size} isFraction={false} />
          .
          <CountUpBalance value={fraction} size={size} isFraction={true} />
        </>
      )}
    </BalanceNumber>
  );
}

function CountUpBalance({
  value,
  size,
  isFraction,
}: {
  value: number;
  size: string;
  isFraction: boolean;
}) {
  const Wrapper = isFraction
    ? size === "large"
      ? BalanceFractionHero
      : size === "big"
      ? BalanceFraction
      : size === "medium"
      ? BalanceFractionMedium
      : BalanceFractionSmall
    : size === "large"
    ? BalanceWholeHero
    : size === "big"
    ? BalanceWhole
    : size === "medium"
    ? BalanceWholeMedium
    : BalanceWholeSmall;

  return (
    <Wrapper>
      {isFraction && value < 10 ? "0" : ""}
      <CountUp start={0} startVal={0} end={value} duration={1.6} />
    </Wrapper>
  );
}

export { CurrencyNumber };
