import styled from "styled-components";
import ExpensesData from "../components/Widgets/ExpensesData";
import { mockPieChartData } from "../mock";
import BalanceHero from "../components/BalanceHero";
import SpendingFrequency from "../components/Widgets/SpendingFrequency";
import FinancialHealth from "../components/Widgets/FinancialHealth";

const MainWrapper = styled.div`
  background-color: ${(props) => props.theme.bg_color};
  color: ${(props) => props.theme.text_color};
  margin: 1rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default function MainPage() {
  return (
    <MainWrapper>
      <BalanceHero />
      <ExpensesData expensesData={mockPieChartData} />
      <FinancialHealth />
      <SpendingFrequency />
    </MainWrapper>
  );
}
