<template>
  <div> 
    <div>
      <!-- Navbar -->
      <b-navbar class="mb-3" variant="faded" type="light">
        <b-navbar-brand href="#">
          <img src="../assets/bicycle.png" class="d-inline-block align-top" alt="Kitten">
          Oslo Bysykkel test
        </b-navbar-brand>
      </b-navbar>
    </div>

    <div class="row container" v-if="isStationsFetched == true && isStationsStatusFetched == true">
      <div class="col-lg-3 col-md-6 col-sm-6" v-for="(station, index) in stations" v-bind:key="index">
        <b-card
        tag="article"
        style="max-width: 20rem;"
        class="mb-2"
        >
          <b-card-text>
            <h4 class="text-center">{{station.name}}</h4>
            <h6 class="text-center">{{station.address}}</h6>
            <h5> <b-icon class="h2" icon="bicycle" variant="primary"></b-icon> {{stationsStatus[index].num_bikes_available}} sykler</h5>
            <h5> <b-icon class="h2" icon="person-circle" variant="primary"></b-icon> {{stationsStatus[index].num_docks_available}} ledige plasser</h5>
          </b-card-text>
        </b-card>
      </div>  
    </div> 
  </div>
</template>

<script>
export default {
    data() {
      return {
        stations: [],
        stationsStatus: [],
        isStationsFetched: false,
        isStationsStatusFetched: false
      }
    },
    created() {
      this.getStationInformation();
      this.getStationStatus();
    },
    methods: {
      getStationInformation() {
        var api = "https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json"
        this.axios.get(api).then(
          result => {
            this.stations = result.data.data.stations.sort((a, b) => (a.station_id > b.station_id) ? 1 : -1)
            this.isStationsFetched = true
          });
      },
      
      getStationStatus() {
        var api = "https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json"
        this.axios.get(api).then(
          result => {
            this.stationsStatus = result.data.data.stations.sort((a, b) => (a.station_id > b.station_id) ? 1 : -1)
            this.isStationsStatusFetched = true
          });
      }
    }
}
</script>


<style scoped>
h5 {
  color:#4290f5;
}
h6 {
  font-weight: lighter;
  color: #969696;
}
.container {
  max-width: 80%;
  margin: auto;
}
</style>
