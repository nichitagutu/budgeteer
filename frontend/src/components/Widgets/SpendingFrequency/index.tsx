import SegmentedControl from "../../SegmentedControl";
import LineChart from "../../charts/LineChart";
import { useState } from "react";
import { generateMockData } from "../../../mock";
import { LineChartData } from "../../../types";
import { Container, Header } from "../reusables";

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
      <Header>Spending Frequency</Header>
      <SegmentedControl tabNames={tabs} onTabChange={onTabChange} />
      <LineChart data={dataToPass} isMock={isMock} />
    </Container>
  );
}
