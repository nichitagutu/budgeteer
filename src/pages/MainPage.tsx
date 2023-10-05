import styled from "styled-components";
import ExpensesData from "../components/Widgets/ExpensesData";
import { mockPieChartData } from "../mock";
import BalanceHero from "../components/BalanceHero";

const MainWrapper = styled.div`
  background-color: ${(props) => props.theme.bg_color};
  color: ${(props) => props.theme.text_color};
  background-color: #f3f2f8;
`;

export default function MainPage() {
  return (
    <MainWrapper>
      <ExpensesData expensesData={mockPieChartData} />
      <BalanceHero />
    </MainWrapper>
  );
}
