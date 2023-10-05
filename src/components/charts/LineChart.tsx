import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { LineChartData, LineChartProps } from "../../types";
import { useTheme } from "styled-components";
import { colorToRGBA } from "../../utils";

export default function LineChart({ data, isMock }: LineChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const theme = useTheme();

  useEffect(() => {
    if (data !== undefined && data.length > 0) {
      drawChart();
    }

    if (isMock) drawOverlay();
  }, [data]);

  function drawOverlay() {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);

    let fillColor;
    try {
      fillColor = colorToRGBA(theme.secondary_bg_color, 0.85);
    } catch (error) {
      fillColor = colorToRGBA(
        window.Telegram.WebApp.themeParams.secondary_bg_color,
        0.85
      );
    }

    svg
      .append("rect")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("fill", fillColor);
  }

  function movingAverage(data: LineChartData[], numberOfPricePoints: number) {
    return data.map((row, index, total) => {
      const start = Math.max(0, index - numberOfPricePoints);
      const end = Math.min(total.length, index + numberOfPricePoints + 1);
      const subset = total.slice(start, end);
      const sum = subset.reduce((a, b) => a + b.amount, 0);
      return {
        ...row,
        amount: sum / subset.length,
      };
    });
  }

  function drawChart() {
    if (!svgRef.current) return;

    d3.select(svgRef.current).selectAll("*").remove();

    let processedData = data;

    if (data.length === 365) {
      processedData = movingAverage(data, 7);
    }

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;
    const marginTop = 20;
    const marginRight = 30;
    const marginBottom = 40;
    const marginLeft = 40;

    const tickAdjustment = 0.05 * width;

    const x = d3
      .scaleUtc()
      .domain(d3.extent(processedData, (d) => d.day) as [Date, Date])
      .range([
        marginLeft + tickAdjustment,
        width - marginRight - tickAdjustment,
      ]);

    const maxAmount = d3.max(processedData, (d) => d.amount) || 0;

    const y = d3
      .scaleLinear()
      .domain([0, maxAmount])
      .range([height - marginBottom, marginTop]);

    const line = d3
      .line<LineChartData>()
      .x((d) => x(d.day))
      .y((d) => y(d.amount))
      .curve(d3.curveCatmullRom.alpha(0.5));

    const svg = d3.select(svgRef.current);

    svg.style("background-color", theme.secondary_bg_color);

    svg
      .append("g")
      .attr("transform", `translate(0,${height - marginBottom + 25})`)
      .call(
        d3
          .axisBottom(x)
          .tickValues([
            processedData[0].day,
            processedData[processedData.length - 1].day,
          ])
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

    const path = svg
      .append("path")
      .data([processedData])
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 3)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", line);

    const totalLength = path.node().getTotalLength();

    path
      .attr("stroke-dasharray", totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
      .duration(1600)
      .attr("stroke-dashoffset", 0);
  }

  return <svg ref={svgRef} style={{ width: "100%", height: "250px" }} />;
}
