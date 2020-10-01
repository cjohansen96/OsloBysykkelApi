<template>
  <div> 
    <div>
      <!-- Navbar -->
      <b-navbar class="mb-3" variant="faded" type="light">
        <b-navbar-brand href="#">
          <img src="../assets/bicycle.png" class="d-inline-block align-top">
          Oslo Bysykkel test
        </b-navbar-brand>
      </b-navbar>
    </div> <!-- End of navbar -->
    <div class="height" vi v-if="isStationsFetched && isStationsStatusFetched ">
      <MglMap :accessToken="accessToken" :mapStyle="mapStyle" :zoom="zoom" :center="center"> 
        <div v-for="(station, index) in stations" v-bind:key="index">
          <MglMarker :coordinates="markerCoordinates[index].coordinates" color="blue">
            <b-icon v-if="stationsStatus[index].num_bikes_available > 0" icon="circle-fill" variant="primary" slot="marker"></b-icon>
            <b-icon v-else icon="circle-fill" variant="secondary" slot="marker"> </b-icon>
            
            <MglPopup>
              <div>
                <h4 class="text-center">{{station.name}}</h4>
                <h6 class="text-center">{{station.address}}</h6>
                <h5> 
                  <b-icon class="h2" icon="bicycle" variant="primary"></b-icon> {{stationsStatus[index].num_bikes_available}} 
                  <!--Sjekker om det er 1 eller fler sykler -->
                  <div v-if="stationsStatus[index].num_bikes_available == 1" style="display: inline-block;" >sykkel</div>
                  <div v-else style="display: inline-block;">sykler</div>
                </h5>
                <h5> <b-icon class="h2" icon="person-circle" variant="primary"></b-icon> {{stationsStatus[index].num_docks_available}} ledige plasser</h5>
              </div>
            </MglPopup>
          </MglMarker>
    </div>
      </MglMap>
    </div>
  </div>
</template>

<script>
import Mapbox from "mapbox-gl";
import { MglMap, MglMarker, MglPopup } from "vue-mapbox";

export default {
  components: {
    MglMap,
    MglMarker,
    MglPopup
  },

    data() {
      return {
        stations: [],
        stationsStatus: [],
        markerCoordinates: [],
        isStationsFetched: false,
        isStationsStatusFetched: false,

        // Map
        accessToken: "pk.eyJ1IjoiY2hyaXMyZyIsImEiOiJja2ZvMW1xeWUwMDJjMnFvYWNpbWFxemYwIn0.SCMUe2ePEQ_to8CeMS9RGw", // your access token. Needed if you using Mapbox maps
        mapStyle: "mapbox://styles/mapbox/streets-v11", // your map style
        center: [10.6788129, 59.9226729],
        zoom: 12,
      }
    },

    created() {
      this.getStationInformation();
      this.getStationStatus();
      this.mapbox = Mapbox;
    },

    methods: {
      getStationInformation() {
        var api = "https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json"
        this.axios.get(api).then(
          result => {
            this.stations = result.data.data.stations.sort((a, b) => (a.station_id > b.station_id) ? 1 : -1)
            this.isStationsFetched = true

            // Må ha coordinatene i en array. MglMarker :coordinates tar kun arrays
            for(var i=0; i<this.stations.length; i++) {
              this.markerCoordinates.push({"coordinates": [this.stations[i].lon, this.stations[i].lat]})
            }
        });
      },
      
      getStationStatus() {
        var api = "https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json"
        this.axios.get(api).then(
          result => {
            this.stationsStatus = result.data.data.stations.sort((a, b) => (a.station_id > b.station_id) ? 1 : -1)
            this.isStationsStatusFetched = true
        });
      },
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
.height {
  height: 600px;
}

</style>
