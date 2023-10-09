import { useRef, useEffect } from "react";
import * as d3 from "d3";
import { PieChartData, PieChartProps } from "../../types";

export default function PieChart({ data }: PieChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (data !== undefined && data.length > 0) drawChart();
  }, [data]);

  function drawChart() {
    if (!svgRef.current) return;

    d3.select(svgRef.current).selectAll("*").remove();

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    const pie = d3
      .pie<PieChartData>()
      .value((d) => d.amount)
      .sort(null);

    const arc = d3
      .arc<{ data: PieChartData }>()
      .innerRadius(0)
      .outerRadius(Math.min(width, height) / 2 - 1);

    const arcs = pie(data);

    const svg = d3
      .select(svgRef.current)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    svg
      .selectAll("path")
      .data(arcs)
      .enter()
      .append("path")
      .attr("fill", (d) => d.data.color)
      .attr("d", (d) => arc(d))
      .each(function () {
        d3.select(this)
          .transition()
          .duration(1600)
          .attrTween("d", function (d: any) {
            const interpolateStart = d3.interpolate(0, d.startAngle);
            const interpolateEnd = d3.interpolate(0, d.endAngle);
            return function (t) {
              const dIntermediate = {
                ...d,
                startAngle: interpolateStart(t),
                endAngle: interpolateEnd(t),
              };

              return arc(dIntermediate) ?? "";
            };
          });
      })
      .append("title")
      .text(
        (d) => `${d.data.category}: ${d.data.amount.toLocaleString("en-US")}`
      );
  }

  return <svg ref={svgRef} style={{ width: "100%", height: "100%", flex: 2 }} />;
}
