import styled, { useTheme } from "styled-components";

import HorseshoeChart from "../../charts/HorseshoeChart";
import { Container, Header } from "../reusables";

export default function FinancialHealth({
  percentage = 0,
}: {
  percentage?: number;
}) {
  const theme = useTheme();

  return (
    <Container>
      <Header>Financial Health</Header>
      <Content>
        <ChartWrapper>
          <HorseshoeChart percentage={percentage} />
        </ChartWrapper>
        <TextWrapper>
          <Header>Analyse</Header>
          <Text>financial health rate according to the savings status</Text>
        </TextWrapper>
      </Content>
      <Hint theme={theme}>
        The custom formula calculating your incomes and expenses will break down
        the patterns.
      </Hint>
    </Container>
  );
}

const ChartWrapper = styled.div`
  width: 50%;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 2;
  width: 100%;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  width: 50%;
`;

const Text = styled.p`
  text-align: center;
  font-size: 0.8rem;
`;

const Hint = styled.p`
  flex: 1;
  color: ${({ theme }) => theme.hint_color};
  text-align: center;
  font-size: 0.8rem;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom: 1rem;
`;
