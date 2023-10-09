import styled from "styled-components";
import Eye from "../../../assets/eye.svg";
import BalanceCharts from "./BalanceCharts";
import { CurrencyNumber } from "../../CurrencyNumber";
import { useState } from "react";
import exp from "constants";

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

export default function GeneralBalance({
  transactionData,
  setOpenAddTransaction,
}: {
  transactionData: any;
  setOpenAddTransaction: (type: "Income" | "Spend") => void;
}) {
  const [isHiddenBalance, setIsHiddenBalance] = useState(false);

  function handleHideBalance() {
    setIsHiddenBalance(!isHiddenBalance);
  }

  const income = transactionData.totalIncome || 0;
  const expenses = transactionData.totalExpenses || 0;

  let incomeCoef = 0;
  let expensesCoef = 0;

  // Safely handle the cases where either income or expenses might be zero.
  const safeDivision = (numerator: number, denominator: number) => {
    if (denominator === 0) return 0;
    return numerator / denominator;
  };

  if (income >= expenses && expenses !== 0) {
    incomeCoef = 1;
    expensesCoef = safeDivision(expenses, income);
  } else if (expenses > income && income !== 0) {
    expensesCoef = 1;
    incomeCoef = safeDivision(income, expenses);
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
          <BalanceCharts value={incomeCoef} color="#30D158" />
        </BalanceChartWrapper>

        <BalanceChartWrapper style={{ marginLeft: "-10px" }}>
          <BalanceCharts value={expensesCoef} color="#FF453A" />
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
