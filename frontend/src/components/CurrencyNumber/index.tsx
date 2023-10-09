import { useState, useEffect } from "react";
import CountUp from "react-countup";
import styled from "styled-components";

interface StyledProps {
  baseSize: number;
  isHidden?: boolean;
  isFraction?: boolean;
  isBold?: boolean;
}

const BalanceNumber = styled.div<StyledProps>`
  transition: opacity 0.3s ease-in-out;
  opacity: ${({ isHidden }) => (isHidden ? 0 : 1)};
  font-size: ${({ baseSize }) => `${baseSize}rem`};
  font-weight: ${({ isFraction, isBold }) =>
    isFraction ? 400 : isBold ? 700 : 400};
  display: inline-block;
`;

const BalanceWrapper = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

interface CurrencyNumberProps {
  value: number;
  baseSize: number; // For example: 1 for 1rem
  isHidden?: boolean;
  isBold?: boolean; // Added this prop to make boldness customizable
  duration?: number;
}

function CurrencyNumber({
  value,
  isHidden,
  baseSize,
  isBold = false, // Defaulting to true to make it bold by default
  duration = 1.6,
}: CurrencyNumberProps) {
  const [displayedValue, setDisplayedValue] = useState<string | number>(value);

  useEffect(() => {
    if (isHidden) {
      setTimeout(() => {
        setDisplayedValue("-");
      }, 300);
    } else {
      setTimeout(() => {
        setDisplayedValue(value);
      }, 300);
    }
  }, [isHidden, value]);

  const whole = Number.parseInt(displayedValue.toString().split(".")[0]);
  const fraction =
    Number.parseInt(displayedValue.toString().split(".")[1]) || 0;

  return (
    <div>
      {displayedValue === "-" ? (
        <BalanceNumber baseSize={baseSize}>—</BalanceNumber>
      ) : (
        <BalanceWrapper>
          <BalanceNumber baseSize={baseSize} isBold={isBold}>
            $
          </BalanceNumber>
          <CountUpBalance
            value={whole}
            baseSize={baseSize}
            isBold={isBold}
            duration={duration}
          />
          .
          <CountUpBalance
            value={fraction}
            baseSize={baseSize * 0.75}
            isFraction
            duration={duration}
          />
        </BalanceWrapper>
      )}
    </div>
  );
}

function CountUpBalance({
  value,
  baseSize,
  isFraction,
  isBold,
  duration = 1.6,
}: {
  value: number;
  baseSize: number;
  isFraction?: boolean;
  isBold?: boolean;
  duration?: number;
}) {
  return (
    <BalanceNumber baseSize={baseSize} isFraction={isFraction} isBold={isBold}>
      {isFraction && value < 10 ? "0" : ""}
      <CountUp start={0} end={value} duration={duration} />
    </BalanceNumber>
  );
}

export { CurrencyNumber };
