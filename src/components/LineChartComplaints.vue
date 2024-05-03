<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,

  props: {
    dados: Array,
  },

  data() {
    return {
      chartdata: {
        labels: [],
        datasets: [
          {
            label: "Denúncias por Mês",
            backgroundColor: "#7E9AD3",
            borderColor: "rgba(0, 0, 0, 0.5)",
            borderWidth: 3,
            data: [],
          },
        ],
      },
      totalDenuncias: 0,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Mês',
            },
            ticks: {
              callback: (value, index, values) => {
                const [year, month] = value.split('-');
                const monthNames = [
                  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
                  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
                ];
                return `${monthNames[parseInt(month) - 1]} ${year}`;
              }
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Número de Denúncias',
            },
            ticks: {
              beginAtZero: true,
              precision: 0,
            }
          }],
        },
      },
    };
  },

  created() {
    const monthsOccurrences = {};

    this.$props.dados.forEach((item) => {
      const date = new Date(item.dates[0]);
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

    sortedKeys.forEach((key) => {
      this.chartdata.labels.push(key);
      this.chartdata.datasets[0].data.push(monthsOccurrences[key]);
      this.totalDenuncias += monthsOccurrences[key];
    });
  },

  mounted() {
    this.renderChart(this.chartdata, this.options);
  },
};
</script>
