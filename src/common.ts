import { CityWeatherType, UserPreferencesType } from './types';

const inRange = (num: number, min: number, max: number) =>
  num <= max && num >= min;

export const defaultPreferences: UserPreferencesType = {
  temperatureRange: [15, 30],
  topWindSpeed: 5,
  rain: false,
  windDirection: ['nw', 'ne', 'se', 'sw']
};

// This is pure function, so does not need to be
// put as a class method, better to keep it outside
// or even better in dedicated business logic utilities
export const isCityWeatherPreferable = (
  city: CityWeatherType,
  preferences: UserPreferencesType
) => {
  const temperatureInRange = inRange(
    city.main.temp - 273,
    ...preferences.temperatureRange
  );

  const windSpeedBelowThreshold = city.wind.speed <= preferences.topWindSpeed;

  const doesNotCareAboutRainOrRainConditionMatches =
    preferences.rain === null || preferences.rain === Boolean(city.rain);

  const isNorthernWind =
    inRange(city.wind.deg, 0, 90) || inRange(city.wind.deg, 270, 360);
  const isEasternWind = inRange(city.wind.deg, 0, 180);

  const currentDirection =
    (isNorthernWind ? 'n' : 's') + (isEasternWind ? 'e' : 'w');

  const currentWindDirectionIncluded = Boolean(
    preferences.windDirection.find(direction => direction === currentDirection)
  );

  const conditions = [
    temperatureInRange,
    windSpeedBelowThreshold,
    doesNotCareAboutRainOrRainConditionMatches,
    currentWindDirectionIncluded
  ];

  return conditions.every(Boolean);
};

const randomItem = <T>(xs: T[]): T => {
  return xs[~~(xs.length * Math.random())];
};

export const defaultMessage = 'Lets see if it is good!';

export const messages = {
  good: randomItem([
    'Wonderful news, the weather is suitable',
    'Perfect weather!',
    'Weather conditions might be considered pleasing'
  ]),
  bad: randomItem([
    'Sadly, the weather is not the best',
    'Weather conditions might be considered unsatisfactory',
    'Unfortunately, it is just bad'
  ])
};
