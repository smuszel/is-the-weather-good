<template>
  <!-- 
    Below there could be a Layout component which
    ulizes slots to put each component into proper space.
    It can have ownerhip over the styles to facilitate more separation.
    The reason why I would not add a Layout is that 
    flatter, simple structures seem a bit better
  -->
  <div
    class="root"
    v-bind:class="{
      good: isWeatherPreferable === true,
      bad: selectedCity && isWeatherPreferable === false
    }"
  >
    <h1>Is the weather good right now?</h1>
    <div class="fields">
      <CitySearch
        v-model="selectedCity"
        v-on:input="updateWeatherPreferability"
      />
      <UserPreferences
        v-model="preferences"
        v-on:input="updateWeatherPreferability"
      />
      <WeatherSummary
        :isWeatherPreferable="isWeatherPreferable"
        :selectedCity="selectedCity"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CitySearch from './components/CitySearch.vue';
import UserPreferences from './components/UserPreferences.vue';
import WeatherSummary from './components/WeatherSummary.vue';
import { CityWeatherType, UserPreferencesType } from './types.d';
import { defaultPreferences, isCityWeatherPreferable } from './common';

@Component({
  components: {
    CitySearch,
    UserPreferences,
    WeatherSummary
  }
})
export default class App extends Vue {
  selectedCity: null | CityWeatherType = null;
  isWeatherPreferable = false;
  preferences = defaultPreferences;

  // I tried making isWeatherPreferable as computed property
  // and pass it downwards, but it did not work
  updateWeatherPreferability() {
    this.isWeatherPreferable = Boolean(
      this.selectedCity &&
        isCityWeatherPreferable(this.selectedCity, this.preferences)
    );
  }
}
</script>

<style>
h3 {
  font-size: 1.3em;
}
html {
  font-family: 'Roboto', sans-serif;
}

body {
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100vw;
}
</style>

<style scoped>
.fields {
  padding: 0 10px;
}

.root {
  height: 100%;
  padding: 40px 35px 0 35px;

  /* 
    Assignment mentioned animation, unfortunately
    there was no enough time to add one
   */
  transition: background-color 1s ease-in-out;
  background-color: rgb(255, 231, 231);
}

.root.good {
  background-color: #66ff66;
}

.root.bad {
  background-color: #ff9ac4;
}
</style>
