<template>
  <div class="container">
    <h3>First, select a city</h3>
    <v-select
      label="name"
      :filterable="false"
      :options="options"
      @search="search"
      @input="input"
    >
      <template slot="no-options">
        Type at least three characters to search for the city
      </template>
      <template slot="option" slot-scope="option">
        <div class="d-center">{{ option.name }}, {{ option.sys.country }}</div>
      </template>
      <template slot="selected-option" slot-scope="option">
        <div class="selected d-center">
          {{ option.name }}, {{ option.sys.country }}
        </div>
      </template>
    </v-select>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { CityWeatherType } from '../types';

@Component
export default class CitySearch extends Vue {
  options: CityWeatherType[] = [];
  @Prop() value!: CityWeatherType;
  apiKey = 'ca0d8fabe11eaa8422e66751928f6c69';
  onError = () => alert('Unfortunately we could not retreive weater data :/');

  search(queryTerm: string, setLoading: any) {
    // In full project we would use object to query param builder utility
    const url = `https://api.openweathermap.org/data/2.5/find?type=like&q=${queryTerm}&APPID=${this.apiKey}`;
    setLoading(true);

    queryTerm.length > 2 &&
      fetch(url)
        .then(response => response.json())
        .then((result: { list: CityWeatherType[] }) => {
          setLoading(false);
          this.options = result.list;
        })
        .catch(this.onError);
  }

  input(value: CityWeatherType) {
    this.$emit('input', value);
  }
}
</script>

<style scoped>
.container {
  padding: 10px 0;
}

img {
  height: auto;
  max-width: 2.5rem;
  margin-right: 1rem;
}

.d-center {
  display: flex;
  align-items: center;
}

.selected img {
  width: auto;
  max-height: 23px;
  margin-right: 0.5rem;
}

.v-select .dropdown li {
  border-bottom: 1px solid rgba(112, 128, 144, 0.1);
}

.v-select .dropdown li:last-child {
  border-bottom: none;
}

.v-select .dropdown li a {
  padding: 10px 20px;
  width: 100%;
  font-size: 1.25em;
  color: #3c3c3c;
}

.v-select .dropdown-menu .active > a {
  color: #fff;
}
</style>
