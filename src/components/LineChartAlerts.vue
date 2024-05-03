<script>
import { Line } from "vue-chartjs";

export default {
  name: "AlertasPorMes",
  extends: Line,
  props: {
    dados: Array
  },
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [
          {
            label: "Alertas por Mês",
            backgroundColor: "#7E9AD3",
            borderColor: "rgba(0, 0, 0, 0.5)",
            borderWidth: 3,
            data: []
          }
        ]
      },
      totalAlertas: 0,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Mês"
              },
              ticks: {
                callback: (value, index, values) => {
                  const [year, month] = value.split("-");
                  const monthNames = [
                    "Janeiro",
                    "Fevereiro",
                    "Março",
                    "Abril",
                    "Maio",
                    "Junho",
                    "Julho",
                    "Agosto",
                    "Setembro",
                    "Outubro",
                    "Novembro",
                    "Dezembro"
                  ];
                  return `${monthNames[parseInt(month) - 1]} ${year}`;
                }
              }
            }
          ],
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Número de Alertas"
              },
              ticks: {
                beginAtZero: true,
                precision: 0
              }
            }
          ]
        }
      }
    };
  },
  created() {
    const monthsOccurrences = {};

    this.dados.forEach(item => {
      const date = new Date(item.dates[0].date);
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const monthYear = `${year}-${month}`;

      if (monthsOccurrences[monthYear]) {
        monthsOccurrences[monthYear]++;
      } else {
        monthsOccurrences[monthYear] = 1;
      }
    });

    const sortedKeys = Object.keys(monthsOccurrences).sort((a, b) => {
      const dateA = new Date(`${a}-01`);
      const dateB = new Date(`${b}-01`);
      return dateA - dateB;
    });

    sortedKeys.forEach(key => {
      this.chartData.labels.push(key);
      this.chartData.datasets[0].data.push(monthsOccurrences[key]);
      this.totalAlertas += monthsOccurrences[key];
    });
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
};
</script>
