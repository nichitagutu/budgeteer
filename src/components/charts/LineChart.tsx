import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { LineChartData, LineChartProps } from "../../types";

export default function LineChart({ data }: LineChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (data !== undefined && data.length > 0) drawChart();
  }, [data]);

  function drawChart() {
    if (!svgRef.current) return;

    d3.select(svgRef.current).selectAll("*").remove();

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;
    const marginTop = 20;
    const marginRight = 30;
    const marginBottom = 40;
    const marginLeft = 40;

    const x = d3
      .scaleUtc()
      .domain(d3.extent(data, (d) => d.day) as [Date, Date])
      .range([marginLeft, width - marginRight]);

    const maxAmount = d3.max(data, (d) => d.amount) || 0;
    const minAmount = d3.min(data, (d) => d.amount) || 0;
    const isLogScale = maxAmount / minAmount > 10;

    const y = isLogScale
      ? d3
          .scaleLog()
          .domain([minAmount, maxAmount])
          .range([height - marginBottom, marginTop])
      : d3
          .scaleLinear()
          .domain([0, maxAmount])
          .range([height - marginBottom, marginTop]);

    const line = d3
      .line<LineChartData>()
      .x((d) => x(d.day))
      .y((d) => y(d.amount))
      .curve(d3.curveCatmullRom.alpha(0.5));

    const svg = d3.select(svgRef.current);

    svg
      .append("g")
      .attr("transform", `translate(0,${height - marginBottom + 25})`)
      .call(
        d3
          .axisBottom(x)
          .ticks(d3.utcDay.every(2))
          .tickSize(0)
          .tickSizeOuter(0)
          .tickFormat((d) => d3.utcFormat("%b %d")(d as Date))
      )
      .call((g) => g.select(".domain").remove());

    svg
      .append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(
        d3
          .axisLeft(y)
          .ticks(height / 40)
          .tickSize(0)
      )
      .call((g) => g.select(".domain").remove());

    svg
      .append("path")
      .data([data])
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 3)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", line);
  }

  return <svg ref={svgRef} style={{ width: "100%", height: "250px" }} />;
}
