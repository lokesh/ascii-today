<template>
  <div>
    <h1
      :class="{ 'has-loaded': mapLoaded }"
      :data-map-name="mapName"
      :data-coordinates="coordinates.toString()">
        {{ mapName }}
      </h1>
    <img src="../assets/logo.png" draggable="false">
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import $ from 'jquery';

export default {
  created: onCreate,
  computed: mapGetters(['coordinates', 'mapName', 'mapLoaded'])
}

function onCreate() {
  // console.log(this.$store);
}

</script>

<style>
h1 {
  color: red;
  transition: color 0.4s;
}

h1:hover {
  color: gold;
}

</style>
