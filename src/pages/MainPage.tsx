import { useState } from "react";
import LineChart from "../components/charts/LineChart";
import PieChart from "../components/charts/PieChart";
import HorseshoeChart from "../components/charts/HorseshoeChart";

export default function MainPage() {
  return <ChartsShowcase />;
}

function ChartsShowcase() {
  const data = [
    {
      category: "Food",
      amount: 500,
      color: "#f00",
    },
    {
      category: "Rent",
      amount: 1000,
      color: "#0f0",
    },
    {
      category: "Bills",
      amount: 300,
      color: "#00f",
    },
    {
      category: "Car",
      amount: 600,
      color: "#0ff",
    },
    {
      category: "Other",
      amount: 200,
      color: "#f0f",
    },
  ];

  const initialData = [
    {
      day: new Date("2021-01-01"),
      amount: 100,
    },
  ];

  const [lineData, setLineData] = useState(initialData);
  const [percentage, setPercentage] = useState(50);

  function handleClick() {
    const lastDate = lineData[lineData.length - 1].day;
    const newDate = new Date(lastDate);
    newDate.setDate(newDate.getDate() + 1);
    const newAmount = Math.floor(Math.random() * 900) + 100;
    const newLineData = [
      ...lineData,
      {
        day: newDate,
        amount: newAmount,
      },
    ];
    const randomPercentage = Math.floor(Math.random() * 100);
    setPercentage(randomPercentage);
    setLineData(newLineData);
  }

  return (
    <div>
      <PieChart data={data} />
      <LineChart data={lineData} />
      <button onClick={handleClick}>Add Data</button>
      <HorseshoeChart percentage={percentage} />
    </div>
  );
}
