import { useRef, useEffect } from "react";
import * as d3 from "d3";

function HorseshoeChart({ percentage }: { percentage: number }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    drawChart();
  }, [percentage]);

  function drawChart() {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);

    svg.selectAll("*").remove();

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    const radius = Math.min(width, height) / 2.5;
    const tau = 2 * Math.PI;

    const startAngle = tau * 0.6;
    const endAngle = tau * 1.4;

    const arc = d3
      .arc()
      .innerRadius(radius - 10)
      .outerRadius(radius)
      .startAngle(startAngle)
      .cornerRadius(10);

    svg
      .append("path")
      .datum({ endAngle: endAngle })
      .attr("fill", "none")
      .attr("stroke", "lightgrey")
      .attr("stroke-width", 10)
      .attr("stroke-linecap", "round")
      .attr("stroke-linejoin", "round")
      .attr("d", arc)
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const foreground = svg
      .append("path")
      .datum({ endAngle: startAngle })
      .attr("fill", "none")
      .attr("stroke", "green")
      .attr("stroke-width", 10)
      .attr("stroke-linecap", "round")
      .attr("stroke-linejoin", "round")
      .attr("d", arc)
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const text = svg
      .append("text")
      .text("0%")
      .attr("x", width / 2)
      .attr("y", height / 2)
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .attr("font-size", "20px")
      .attr("font-weight", "bold");

    // Some magic number stuff to start arc with a circle, not a pill-like shape. Needs to be done smarter, because it's not responsive.
    const circularPercentage = percentage < 3 ? 3 : percentage;

    foreground
      .transition()
      .duration(1600)
      .attrTween("d", function (d) {
        const interpolate = d3.interpolate(
          // same magic number stuff here as above
          d.endAngle + 0.15,
          startAngle + (endAngle - startAngle) * (circularPercentage / 100)
        );
        return function (t) {
          d.endAngle = interpolate(t);
          return arc(d);
        };
      });

    text
      .transition()
      .duration(1600)
      .tween("text", function () {
        const interpolate = d3.interpolate(0, percentage);
        return function (t) {
          this.textContent = `${Math.round(interpolate(t))}%`;
        };
      });
  }

  return (
    <div style={{ width: "100%", paddingTop: "50%", position: "relative" }}>
      <svg
        ref={svgRef}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
    </div>
  );
}

export default HorseshoeChart;
