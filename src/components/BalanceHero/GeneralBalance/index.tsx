import styled from "styled-components";
import Eye from "../../../assets/eye.svg";
import BalanceCharts from "./BalanceCharts";

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const MonthlyBalanceText = styled.div``;
const MonthlyBalanceNumber = styled.div``;
const MonthlyBalanceCurrency = styled.span`
  font-size: 2rem;
  font-weight: 700;
`;
const MonthlyBalanceWhole = styled.span`
  font-size: 2rem;
  font-weight: 700;
`;
const MonthlyBalanceFraction = styled.span`
  font-size: 1.4rem;
`;

const HideBalanceButton = styled.button`
  all: unset;
`;

const EyeIcon = styled.img``;

export default function GeneralBalance() {
  return (
    <Body>
      <MonthlyBalanceText>Monthly Balance</MonthlyBalanceText>
      <MonthlyBalanceNumber>
        <MonthlyBalanceCurrency>$</MonthlyBalanceCurrency>
        <MonthlyBalanceWhole>0.</MonthlyBalanceWhole>
        <MonthlyBalanceFraction>00</MonthlyBalanceFraction>
      </MonthlyBalanceNumber>
      <HideBalanceButton>
        <EyeIcon src={Eye} alt="Eye Icon" />
      </HideBalanceButton>

      <BalanceCharts />
    </Body>
  );
}
