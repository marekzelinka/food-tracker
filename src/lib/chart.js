import Chart from "chart.js/auto";

let chartInstance = null;

export function renderChart(store) {
  chartInstance?.destroy();

  const context = document.querySelector("#app-chart");
  if (!context) {
    return;
  }

  chartInstance = new Chart(context, {
    type: "doughnut",
    data: {
      labels: ["Carbs", "Protein", "Fat"],
      datasets: [
        {
          label: "Macronutrients",
          data: [store.totalCarbs, store.totalProtein, store.totalFat],
          hoverOffset: 4,
          backgroundColor: ["#25AEEE", "#FECD52", "#57D269"],
        },
      ],
    },
  });
}
