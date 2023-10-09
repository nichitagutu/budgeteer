import { useEffect, useRef } from "react";
import * as d3 from "d3";

type BarChartProps = {
  margin?: string;
  value: number;
  color: string;
  type: "Income" | "Spend";
  setOpenAddTransaction: (type: "Income" | "Spend") => void;
};

export default function BarChart({
  margin,
  value,
  color,
  type,
  setOpenAddTransaction,
}: BarChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  if (value > 1) {
    value = 1;
  } else if (value < 0.4) {
    value = 0.4;
  }

  useEffect(() => {
    drawChart();
  }, [value, color]);

  function drawChart() {
    if (!svgRef.current) return;

    d3.select(svgRef.current).selectAll("*").remove();

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    // Fix the domain to [0, 1]
    const y = d3.scaleLinear().domain([0, 1]).range([height, 0]);

    const svg = d3.select(svgRef.current);
    const initialBarHeight = height - y(0.35); // starting from 0.5
    const targetBarHeight = height - y(value);
    const radius = 10; // corner radius

    const generatePathData = (barHeight) => `
        M ${radius}, ${height - barHeight}
        H ${width - radius}
        Q ${width}, ${height - barHeight} ${width}, ${
      height - barHeight + radius
    }
        V ${height}
        H 0
        V ${height - barHeight + radius}
        Q 0, ${height - barHeight} ${radius}, ${height - barHeight}
    `;

    const path = svg
      .append("path")
      .attr("d", generatePathData(initialBarHeight))
      .attr("fill", color)
      .on("click", () => {
        if (setOpenAddTransaction) {
          setOpenAddTransaction(type);
        }
      });

    path
      .transition()
      .duration(1600) // Adjust the duration as needed
      .attr("d", generatePathData(targetBarHeight));
  }

  return (
    <>
      <svg ref={svgRef} style={{ width: "100%", height: "140px", margin }} />
    </>
  );
}
