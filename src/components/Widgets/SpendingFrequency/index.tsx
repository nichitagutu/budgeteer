import styled from "styled-components";
import SegmentedControl from "../../SegmentedControl";
import LineChart from "../../Charts/LineChart";
import { useState } from "react";
import { generateMockData } from "../../../mock";
import { LineChartData } from "../../../types";

export default function SpendingFrequency({
  data,
}: {
  data?: LineChartData[];
}) {
  const tabs = ["7 Days", "30 Days", "Last year"];
  const [currentTab, setCurrentTab] = useState(7);
  let dataToPass = data;
  let isMock = false;

  if (dataToPass === undefined || dataToPass.length === 0) {
    dataToPass = generateMockData(currentTab);
    isMock = true;
  }

  const onTabChange = (index: number) => {
    const days = parseInt(tabs[index].split(" ")[0]);
    if (isNaN(days)) {
      setCurrentTab(365);
    } else {
      setCurrentTab(days);
    }
  };

  return (
    <Container>
      <Title>Spending Frequency</Title>
      <SegmentedControl tabNames={tabs} onTabChange={onTabChange} />
      <LineChart data={dataToPass} isMock={isMock} />
    </Container>
  );
}

const Container = styled.div`
  align-items: center;
  margin: 1rem;
  background-color: ${(props) => props.theme.secondary_bg_color};

  padding: 0.5rem;

  border-radius: 7px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: 200px;
`;

const Title = styled.h3`
  flex: 1;
  align-self: flex-start;
`;
