import styled from "styled-components";
import FinancialHealth from "../components/Widgets/FinancialHealth";
import ExpensesData from "../components/Widgets/ExpensesData";
import { mockPieChartData } from "../mock";

const MainWrapper = styled.div`
  background-color: ${(props) => props.theme.bg_color};
  color: ${(props) => props.theme.text_color};
`;

export default function MainPage() {
  return (
    <MainWrapper>
      <ExpensesData expensesData={mockPieChartData} />
      <FinancialHealth />
    </MainWrapper>
  );
}
