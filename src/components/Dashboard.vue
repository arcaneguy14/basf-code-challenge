<template>
    <v-card class="mx-auto" outlined>
            <v-card-title>Dashboard</v-card-title>
            <v-container fluid>
                <line-chart
                    v-if="loaded"
                    :chartdata="chartdata"
                    :options="options"/>
            </v-container>
    </v-card>
</template>

<script>
import LineChart from './chart/Chart.vue'

export default {
    name: 'dashboard',
    title: 'dashboard',

    components: { LineChart },

    data: () => ({
    loaded: false,
    chartdata: {
      labels: ['Population Size'],
      datasets: [
        {
          label: 'Country Not Selected',
          backgroundColor: '#C8B8DB ',
          data: [0, 0]
        }
      ]
    },

    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  }),
  async mounted () {
    this.loaded = false
    try {
      let selectedItems = JSON.parse(localStorage.getItem('selectedItems'));
      if (selectedItems === null){}

      else{
          console.log('in')
            let mapSelected = selectedItems.map(i => ({
                label: i.name,
                backgroundColor: '#' + Math.floor(Math.random()*16777215).toString(16),
                data: [i.population, 0]
            }));
            console.log('chart', mapSelected);
            this.chartdata.datasets = mapSelected;
      }
      this.loaded = true
    } catch (e) {
      console.error(e)
    }
  }    
}
</script>

<style lang="scss" scoped>
    .dashboard-card{
        flex: 1 0 21%; /* explanation below */
    }

    .doc-card-title{
        margin-left: -24px;
        padding: 2px 10px 2px 24px;
        background: #e0e0e0;
        color: #616161;
        position: relative;
        border-radius: 3px 5px 5px 0;
    }

    .slide-fade-enter-active {
  transition: all .9s ease;
}
.slide-fade-leave-active {
  transition: all .12s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(-50px);
  opacity: 0;
}

.slide-fade-leave-to{
	transform: translateX(50px);
  	opacity: 0;
}

.grow { transition: all .2s ease-in-out; }
.grow:hover { transform: scale(1.05); }

.user-select-none{
    user-select: none;
}
</style>