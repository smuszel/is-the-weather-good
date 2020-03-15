<template>
  <div>
    <h3>Then tweak your definition of what perfect weather is like</h3>
    <label class="field rain">
      <div>Rain or Sun</div>
      <label>
        Rainy
        <input
          value="rain"
          v-model="rainCondition"
          name="rainOrSun"
          type="radio"
          @change="change"
        />
      </label>
      <label>
        Sunny
        <input
          value="sun"
          v-model="rainCondition"
          name="rainOrSun"
          type="radio"
          @change="change"
        />
      </label>
    </label>
    <label class="field temp-range">
      <div>Temperature Range (°C)</div>
      <v-slider
        v-model="temperatureRange"
        @change="change"
        :min="-10"
        :max="40"
        :marks="[-10, -5, 0, 5, 10, 15, 20, 25, 30, 35, 40]"
      />
    </label>
    <label class="field wind-speed">
      <div>Top Wind Speed (m/s)</div>
      <v-slider
        v-model="topWindSpeed"
        @change="change"
        :min="1"
        :max="11"
        :adsorb="true"
        :marks="true"
      />
    </label>
    <label class="field wind-dir">
      <div>Wind Direction</div>
      <!-- 
        Unfortunately the select component sometimes removes
        two tokens at once. I tried to make it identical to
        example in documentation and it still persisted
       -->
      <v-select
        v-model="windDirection"
        multiple
        @input="change"
        :options="options"
      >
      </v-select>
    </label>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { UserPreferencesType } from '../types';

const options = [
  { value: 'nw', label: 'North West' },
  { value: 'ne', label: 'North East' },
  { value: 'se', label: 'South East' },
  { value: 'sw', label: 'South West' }
];

const optionsMap = Object.fromEntries(
  options.map(({ value, label }) => [value, label])
);

@Component
export default class UserPreferences extends Vue {
  @Prop() value!: UserPreferencesType;
  options = options;
  // This approach might not me the recommended practice to bind
  // form object composed of smaller properties bound with v-model
  temperatureRange = this.value.temperatureRange;
  topWindSpeed = this.value.topWindSpeed;
  rainCondition = this.value.rain ? 'rain' : 'sun';
  windDirection = this.value.windDirection.map(value => ({
    value,
    label: optionsMap[value]
  }));

  change() {
    this.$emit('input', {
      temperatureRange: this.temperatureRange,
      topWindSpeed: this.topWindSpeed,
      rain: this.rainCondition === 'rain',
      windDirection: this.windDirection.map(option => option.value)
    });
  }
}
</script>

<style scoped>
.field {
  padding: 20px;
  display: block;
}

.field > div:first-child {
  padding-bottom: 5px;
  font-weight: bold;
}
</style>
