import styled from "styled-components";
import Eye from "../../../assets/eye.svg";
import BalanceCharts from "./BalanceCharts";
import { CurrencyNumber } from "../../CurrencyNumber";
import { useState } from "react";

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const MonthlyBalanceText = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
`;

const HideBalanceButton = styled.button`
  all: unset;
  margin-top: 1rem;
`;

const EyeIcon = styled.img``;

const BalanceChartsWrapper = styled.div`
  display: flex;
  margin: 0 0.5rem;

  margin-top: 1.5rem;
`;

const BalanceChartWrapper = styled.div`
  position: relative;
  margin-bottom: -0.2rem;
`;

const BalanceDataWrapper = styled.div`
  position: absolute;
  left: 4px;
  bottom: 4px;
  color: #ffffff;
  line-height: 1.2rem;
  font-weight: 300;
`;

const BalanceText = styled.div``;

export default function GeneralBalance({ transactionData }: any) {
  const [isHiddenBalance, setIsHiddenBalance] = useState(false);

  function handleHideBalance() {
    setIsHiddenBalance(!isHiddenBalance);
  }

  return (
    <Body>
      <MonthlyBalanceText>Monthly Balance</MonthlyBalanceText>
      <CurrencyNumber
        value={transactionData.totalBalance || 0}
        isHidden={isHiddenBalance}
        baseSize={2}
        isBold={true}
      />
      <HideBalanceButton>
        <EyeIcon onClick={handleHideBalance} src={Eye} alt="Eye Icon" />
      </HideBalanceButton>

      <BalanceChartsWrapper>
        <BalanceChartWrapper>
          <BalanceDataWrapper>
            <BalanceText>Income</BalanceText>
            <CurrencyNumber
              value={transactionData.totalIncome || 0}
              isHidden={isHiddenBalance}
              baseSize={1.5}
            />
          </BalanceDataWrapper>
          <BalanceCharts value={1} color="#30D158" />
        </BalanceChartWrapper>

        <BalanceChartWrapper style={{ marginLeft: "-10px" }}>
          <BalanceCharts value={0.6} color="#FF453A" />
          <BalanceDataWrapper>
            <BalanceText>Expenses</BalanceText>
            <CurrencyNumber
              value={transactionData.totalExpenses || 0}
              isHidden={isHiddenBalance}
              baseSize={1.5}
            />
          </BalanceDataWrapper>
        </BalanceChartWrapper>
      </BalanceChartsWrapper>
    </Body>
  );
}