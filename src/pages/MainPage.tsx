import { useRef, useState } from "react";
import styled from "styled-components";
import { useTransition, animated } from "react-spring";
import ExpensesData from "../components/Widgets/ExpensesData";
import { mockPieChartData } from "../mock";
import BalanceHero from "../components/BalanceHero";
import SpendingFrequency from "../components/Widgets/SpendingFrequency";
import FinancialHealth from "../components/Widgets/FinancialHealth";
import SegmentedControl from "../components/SegmentedControl";
import BillsAndSubs from "../components/Widgets/Bills&Subs";
import { BillsAndSubsData } from "../types";

const MainWrapper = styled.div`
  background-color: ${(props) => props.theme.bg_color};
  color: ${(props) => props.theme.text_color};
  margin: 1rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Container = styled.div`
  margin: 1rem;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ContentContainer = styled.div`
  position: relative;
`;

const AnimatedContainer = animated(styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`);

export default function MainPage() {
  const Tabs = ["Analytics", "Transactions"];
  const [activeTab, setActiveTab] = useState<string>(Tabs[0]);
  const [prevTabIndex, setPrevTabIndex] = useState<number>(0);
  const initialRender = useRef(true);

  function onTabChange(index: number) {
    setActiveTab(Tabs[index]);
    setPrevTabIndex(activeTab === Tabs[0] ? 0 : 1);
    initialRender.current = false;
  }

  const isMovingRight = prevTabIndex < (activeTab === Tabs[0] ? 0 : 1);

  const transitions = useTransition(activeTab, {
    from: {
      transform: initialRender.current
        ? "translateX(0%)"
        : isMovingRight
        ? "translateX(100%)"
        : "translateX(-100%)",
    },
    enter: { transform: "translateX(0%)" },
    leave: {
      transform: isMovingRight ? "translateX(-100%)" : "translateX(100%)",
    },
    config: { tension: 1750, friction: 100 },
  });

  const billsAndSubsData: BillsAndSubsData[] = [
    {
      due: new Date(2021, 2, 1),
      amount: 500,
      name: "Netflix",
      tags: ["Entertainment", "Subscriptions"],
    },
    {
      due: new Date(2021, 2, 2),
      amount: 1000,
      name: "Rent",
      tags: ["Housing", "Bills"],
    },
    {
      due: new Date(2021, 2, 3),
      amount: 200,
      name: "Spotify",
      tags: ["Entertainment", "Subscriptions"],
    },
    {
      due: new Date(2021, 2, 4),
      amount: 100,
      name: "Phone",
      tags: ["Bills", "Subscriptions"],
    },
  ];

  return (
    <MainWrapper>
      <BalanceHero />
      <SegmentedControl onTabChange={onTabChange} tabNames={Tabs} />
      <ContentContainer>
        {transitions((style, item) =>
          item === "Analytics" ? (
            <AnimatedContainer style={style}>
              <ExpensesData expensesData={mockPieChartData} />
              <FinancialHealth />
              <SpendingFrequency />
              <BillsAndSubs data={billsAndSubsData} />
            </AnimatedContainer>
          ) : (
            <AnimatedContainer style={style}>
              <Container>
                <h1>Transactions</h1>
              </Container>
            </AnimatedContainer>
          )
        )}
      </ContentContainer>
    </MainWrapper>
  );
}
