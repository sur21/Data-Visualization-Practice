document.addEventListener("DOMContentLoaded", function () {
    const chartTypeSelect = document.getElementById("chartType");
    let currentChart = "bar";

    chartTypeSelect.addEventListener("change", function () {
        currentChart = this.value;
        renderChart(currentChart);
    });

    function renderChart(type) {
        d3.select("#chart").selectAll("*").remove(); // Clear existing chart

        const width = 600;
        const height = 400;
        const data = [30, 70, 45, 85, 60, 90, 120]; // Sample data

        const svg = d3.select("#chart")
            .attr("width", width)
            .attr("height", height);

        if (type === "bar") {
            svg.selectAll("rect")
                .data(data)
                .enter()
                .append("rect")
                .attr("x", (d, i) => i * 80)
                .attr("y", d => height - d * 3)
                .attr("width", 50)
                .attr("height", d => d * 3)
                .attr("fill", "steelblue")
                .on("mouseover", showTooltip)
                .on("mouseout", hideTooltip);
        } 
        else if (type === "line") {
            const line = d3.line()
                .x((d, i) => i * 100)
                .y(d => height - d * 3);

            svg.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", "tomato")
                .attr("stroke-width", 2)
                .attr("d", line);
        } 
        else if (type === "pie") {
            const pie = d3.pie();
            const arc = d3.arc()
                .innerRadius(0)
                .outerRadius(Math.min(width, height) / 2 - 10);

            const pieData = pie(data);
            const color = d3.scaleOrdinal(d3.schemeCategory10);

            const g = svg.append("g")
                .attr("transform", `translate(${width / 2}, ${height / 2})`);

            g.selectAll("path")
                .data(pieData)
                .enter()
                .append("path")
                .attr("d", arc)
                .attr("fill", (d, i) => color(i))
                .on("mouseover", showTooltip)
                .on("mouseout", hideTooltip);
        }
    }

    function showTooltip(event, d) {
        const tooltip = document.getElementById("tooltip");
        tooltip.style.visibility = "visible";
        tooltip.style.top = event.pageY + "px";
        tooltip.style.left = event.pageX + "px";
        tooltip.innerHTML = `Value: ${d}`;
    }

    function hideTooltip() {
        document.getElementById("tooltip").style.visibility = "hidden";
    }

    renderChart(currentChart);
});

