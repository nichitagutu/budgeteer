import styled from "styled-components";

import ExpensesData from "../components/ExpensesData";

const MainWrapper = styled.div`
  background-color: ${(props) => props.theme.bg_color};
  color: ${(props) => props.theme.text_color};
`;

export default function MainPage() {
  return (
    <MainWrapper>
      <ExpensesData />
    </MainWrapper>
  );
}
