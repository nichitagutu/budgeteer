import styled from "styled-components";

const Body = styled.div`
  display: flex;
  width: 100%;
  flex: 1 0 auto;
`;

const ChartWrapper = styled.div``;

const Chart = styled.div`
  flex: 1;
  border-radius: 10px 10px 0 0;
  min-height: 100px;
`;

const IncomeChart = styled(Chart)`
  background-color: #30d158;
`;
const ExpenseChart = styled(Chart)`
  background-color: #ff453a;
  margin-left: -2rem;
`;

export default function BalanceCharts() {
  return (
    <Body>
      <IncomeChart>123</IncomeChart>

      <ExpenseChart>123</ExpenseChart>
    </Body>
  );
}
