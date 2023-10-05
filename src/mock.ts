export const mockPieChartData = [
  {
    category: "Food",
    amount: 500,
    color: "#30D158",
  },
  {
    category: "Rent",
    amount: 750,
    color: "#007AFF",
  },
  {
    category: "Bills",
    amount: 300,
    color: "#BF5AF2",
  },
  {
    category: "Other",
    amount: 200,
    color: "#FFD60A",
  },
];

export function generateMockData(days: number) {
  const data = [];
  const date = new Date();
  for (let i = 0; i < days; i++) {
    data.push({
      day: new Date(date.setDate(date.getDate() - 1)),
      amount: Math.floor(Math.random() * 100000),
    });
  }

  return data;
}
