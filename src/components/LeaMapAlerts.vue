<template>
  <div class="map-container">
    <l-map :zoom="zoom" :center="center">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker v-for="(marker, index) in LMarkerList" :key="index" :lat-lng="[marker.latitude, marker.longitude]">
        <l-popup>
          <div class="popup-content">
            <b>Medida Protetiva:</b> {{ marker.MedidaProtetiva }}<br>
            <b>Data:</b> {{ formatDate(marker.data) }}<br>
            <b>Hora:</b> {{ marker.hora }}
          </div>
        </l-popup>    
      </l-marker> 
    </l-map>
  </div>
</template>
  
<script>
import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet'; // Importe LPopup
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
   

export default {
  name: "LeaMap",
  
  props:{
    localizationList: Array
  },

  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup
  },

  data() {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 13,
      center: [0,0],
      LMarkerList:[]
    };
  },

  mounted() {
    this.iconLea();
    this.getLocalizationList(this.localizationList);
  },

  methods: {
    iconLea() {
        delete Icon.Default.prototype._getIconUrl;
        Icon.Default.mergeOptions({
            iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
            iconUrl: require('leaflet/dist/images/marker-icon.png'),
            shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
        });
    },
    
    formatDate(date) {
      const formattedDate = new Date(date).toLocaleDateString('pt-BR');
      return formattedDate != "Invalid Date"? formattedDate : "Sem data";
    },

    getLocalizationList(localizationList) {
      let localizations = localizationList.map(item => {
        if (!isNaN(parseFloat(item.location.latitude)) && !isNaN(parseFloat(item.location.longitude))) {
          return {
            MedidaProtetiva: item.medidaProtetiva,
            hora: item.dates[0].hours[0],
            data: item.dates[0].date,
            latitude: parseFloat(item.location.latitude),
            longitude: parseFloat(item.location.longitude)
          };
        } else {
          return null; 
        }
      }).filter(localization => localization !== null);
      this.LMarkerList = localizations;

      if (localizations.length === 0) {
        this.getCurrentLocation();
        return;
      }
      this.center = [localizations[0].latitude, localizations[0].longitude];
    },     

    getCurrentLocation() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = [position.coords.latitude, position.coords.longitude];
      });

    }
  },
};
</script>
  
<style scoped>
.map-container {
  height: 400px;
  width:  100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
}
.popup-content {
  font-family: Arial, sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: #333;
}

.popup-content b {
  font-weight: bold;
  color: rgba(204, 42, 42, 0.849);
}
</style>
