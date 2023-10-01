// Charts

export interface LineChartData {
  day: Date;
  amount: number;
}

export interface LineChartProps {
  data: LineChartData[];
}

export interface PieChartData {
  category: string;
  amount: number;
  color: string;
}

export interface PieChartProps {
  data: PieChartData[];
}
