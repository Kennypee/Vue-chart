<template>
  <div class="small">
    <line-chart :chart-data="datacollection" id="mychart"></line-chart>
    <button @click="fillData()">Randomize</button>
  </div>
</template>

<script>
import LineChart from "../LineChart.js";
import io from "socket.io-client";
var socket = io.connect("http://localhost:4000");

export default {

  components: {
    LineChart
  },
  data() {
    return {
      datacollection: null,
      chartvalues:null
    };
  },
  mounted() {
    this.fillData();
  },
  methods: {
    fillData() {
      this.datacollection = {
        labels: [this.getRealtimeData(), this.getRealtimeData()],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [this.getRealtimeData(),this.getRealtimeData()]
          },
          {
            label: "Data Two",
            backgroundColor: "#f87",
            data: [this.getRealtimeData(),this.getRealtimeData()]
          }
        ]
      };
    },
    getRealtimeData() {
      var value = Math.floor(Math.random() * (50 - 5 + 1)) + 5;
      socket.emit("update", value);
      socket.on("newdata", data => {
        //trying to return data here when the getRealtimeData()
        //fumction is called to update the chart values in realtime
        console.log(data)
        this.chartvalues = data
        });
      //  return this.chartvalues ---- this returns null
       return value
    }
  }

};
</script>

<style>
.small {
  max-width: 600px;
  margin: 150px auto;
}
</style>