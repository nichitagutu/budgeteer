import styled, { useTheme } from "styled-components";

import HorseshoeChart from "../../Charts/HorseshoeChart";

export default function FinancialHealth({
  percentage = 0,
}: {
  percentage: number;
}) {
  const theme = useTheme();

  return (
    <Container>
      <Title>Financial Health</Title>
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

const Container = styled.div`
  align-items: center;
  margin: 1rem;
  background-color: ${(props) => props.theme.secondary_bg_color};
  padding: 0.5rem;

  box-shadow: 0px 3px 1px 0px rgba(0, 0, 0, 0.04),
    0px 3px 8px 0px rgba(0, 0, 0, 0.12);
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: 200px;
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

const Title = styled.h3`
  flex: 1;
  align-self: flex-start;
`;

const Header = styled.h3``;

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
