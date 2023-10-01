import LineChart from "../components/charts/LineChart";
import PieChart from "../components/charts/PieChart";

export default function MainPage() {
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

  const lineData = [
    {
      day: new Date("2021-01-01"),
      amount: 100,
    },
    {
      day: new Date("2021-01-02"),
      amount: 200,
    },
    {
      day: new Date("2021-01-03"),
      amount: 100,
    },
    {
      day: new Date("2021-01-04"),
      amount: 600,
    },
    {
      day: new Date("2021-01-05"),
      amount: 50,
    },
    {
      day: new Date("2021-01-06"),
      amount: 600,
    },
    {
      day: new Date("2021-01-07"),
      amount: 750,
    },
  ];

  return (
    <div>
      <PieChart data={data} />
      <LineChart data={lineData} />
    </div>
  );
}
