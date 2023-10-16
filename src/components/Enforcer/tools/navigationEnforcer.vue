<template>
  <div>
      <v-layout class="overflow-visible" style="height: 56px; width: 100%;">
    <v-bottom-navigation
      v-model="value"
      color="teal"
      grow
    >
      <v-btn icon to="/enforcer/enforcerDashboard">
        <v-icon>mdi-home</v-icon>

        Home
      </v-btn>

      <v-btn>
        <v-icon>mdi-heart</v-icon>

        Favorites
      </v-btn>

      <v-btn>
        <v-icon>mdi-map-marker</v-icon>

        Nearby
      </v-btn>
      <v-btn icon to="/enforcer/menu">
        <v-icon>mdi-menu</v-icon>

        Menu
      </v-btn>
    </v-bottom-navigation>
  </v-layout>
</div>
</template>
<script>
import { ref } from "vue";
export default{
  name:'adminNav',
  setup() {
    const value = ref(1);

    return {value}
  }
}
</script>