<template>
  <div>
    <h3>{{ message }}</h3>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { CityWeatherType } from '../types.d';
import { defaultMessage, messages } from '../common';

@Component
export default class WeatherSummary extends Vue {
  @Prop() private selectedCity!: CityWeatherType;
  @Prop() private isWeatherPreferable!: boolean;
  private message = defaultMessage;

  @Watch('selectedCity')
  @Watch('isWeatherPreferable')
  updateMessage() {
    if (!this.selectedCity) {
      this.message = defaultMessage;
    } else if (this.isWeatherPreferable) {
      this.message = messages.good;
    } else {
      this.message = messages.bad;
    }
  }
}
</script>

<style scoped>
h3 {
  text-align: center;
  padding: 10px 20px 0 20px;
  font-size: 2em;
}
</style>
