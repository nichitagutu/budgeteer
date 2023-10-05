import styled from "styled-components";
import PieChart from "../../Charts/PieChart";
import { PieChartData } from "../../../types";
import { mockPieChartData } from "../../../mock";

const Container = styled.div`
  margin: 1rem;
  background-color: ${(props) => props.theme.secondary_bg_color};

  padding: 0.5rem;

  border-radius: 7px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Header = styled.h3``;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  margin: 0;

  gap: 3rem;
`;

const EmptyDescription = styled.p`
  font-size: 0.8rem;
  font-weight: 300;
`;

const Button = styled.button`
  font-size: 1rem;
  font-weight: 500;
  width: 8.5rem;
  padding: 0.5rem 1.5rem;
  border-radius: 12px;
  border: none;
  background-color: ${(props) => props.theme.button_color};
  color: ${(props) => props.theme.button_text_color};
  cursor: pointer;
`;

const EmptyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 3;
  align-items: center;
  justify-content: center;
`;

export default function ExpensesData({
  expensesData,
}: {
  expensesData: PieChartData[];
}) {
  let dataToBePassed = expensesData;
  const isNoData = expensesData === undefined || expensesData.length === 0;
  if (isNoData) {
    dataToBePassed = mockPieChartData;
  }

  const totalAmount = dataToBePassed.reduce(
    (acc, item) => acc + item.amount,
    0
  );

  return (
    <Container>
      <Header>Expenses</Header>
      <ContentWrapper>
        <PieChart data={dataToBePassed} />
        {!isNoData ? (
          <EmptyWrapper>
            <Header>Log</Header>
            <EmptyDescription>
              your expenses by categories to view the categories pie chart and
              detailed statistics.
            </EmptyDescription>
            <Button>Add spend</Button>
          </EmptyWrapper>
        ) : (
          <Categories>
            {dataToBePassed.map((item) => (
              <Category>
                <CategoryCircle color={item.color} />
                <CategoryText>
                  <p>{item.category}</p>
                  <p>{percentageOutOf(totalAmount, item.amount)}%</p>
                </CategoryText>
              </Category>
            ))}
          </Categories>
        )}
      </ContentWrapper>
    </Container>
  );
}

function percentageOutOf(total: number, amount: number) {
  const percentage = (amount / total) * 100;
  return percentage.toFixed(0);
}

const Categories = styled.div`
  display: flex;
  width: 100%;
  flex: 3;
  flex-direction: column;
  gap: 0.4rem;
  height: 100%;
`;

const Category = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
`;

const CategoryText = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  width: 80%;
`;

const CategoryCircle = styled.div`
  width: 1.1rem;
  height: 1.1rem;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;
