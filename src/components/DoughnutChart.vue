<script>
import { Doughnut } from "vue-chartjs";

export default {
  extends: Doughnut,
  props: {
    dados: Object,
  },

  data() {
    return {
      chartdata: {
        labels: [],
        datasets: [
          {
            label: "Alertas (Quantidade)",
            backgroundColor: [],
            data: [],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "Por tipos",
          fontSize: 18,
          fontColor: "#333",
          fontFamily: "'Arial', sans-serif",
        },
        legend: {
          display: true,
          position: "right",
        },
        tooltips: {
          callbacks: {
            label: (tooltipItem) => {
              const label = tooltipItem.label; 
              const value = tooltipItem.value; 
              return `${label}: ${value}`;
            },
          },
        },
      },
    };
  },

  created() {
    const labels = Object.keys(this.$props.dados);
    const data = Object.values(this.$props.dados);

    this.chartdata.labels = labels.map((label) => `${label} (${data[labels.indexOf(label)]})`);

    labels.forEach(() => {
      this.chartdata.datasets[0].backgroundColor.push(this.getRandomColor());
    });

    this.chartdata.datasets[0].data = data;
  },

  mounted() {
    this.renderChart(this.chartdata, this.options);
  },

  methods: {
    getRandomColor() {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
  },
};
</script>
