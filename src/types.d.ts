// The XyzType or IXyz naming convention is ugly, but
// I am not familiar with clear, efficient way to distinguish
// Components and Typings
export type CityWeatherType = {
  id: number;
  name: string;
  main: {
    temp: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  rain: null | {
    [key: string]: number;
  };
  sys: {
    country: string;
  };
};

export type UserPreferencesType = {
  temperatureRange: [number, number];
  topWindSpeed: number;
  rain: boolean;
  windDirection: string[];
};
