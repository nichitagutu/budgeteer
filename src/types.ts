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

export type AppTheme = {
  bg_color: string;
  text_color: string;
  hint_color: string;
  link_color: string;
  button_color: string;
  button_text_color: string;
  secondary_bg_color: string;
}

export type ThemeType = 'day-iOS' | 'day-Android' | 'night-iOS' | 'night-Android' | 'auto';
