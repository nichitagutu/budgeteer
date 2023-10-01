import PieChart from "../components/PieChart";

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

  return (
    <div>
      <PieChart data={data} />
    </div>
  );
}
