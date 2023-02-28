export interface GeocodeResponse {
  status: string;
  results: [
    {
      geometry: {
        location: {
          lat: number;
          lng: number;
        };
      };
    }
  ];
}

export interface WeatherResponse {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    weather: [
      {
        rain: number;
        id: number;
        main: string;
        description: string;
        icon: string;
      }
    ];
    rain: {
      "1h": number;
    };
  };
  hourly: [
    {
      dt: number;
      temp: number;
      feels_like: number;
      pressure: number;
      humidity: number;
      dew_point: number;
      uvi: number;
      clouds: number;
      visibility: number;
      wind_speed: number;
      wind_deg: number;
      wind_gust: number;
      weather: [
        {
          id: number;
          main: string;
          description: string;
          icon: string;
        }
      ];
      pop: number;
      rain: {
        "1h": number;
      };
    }
  ];
  daily: [
    {
      dt: number;
      sunrise: number;
      sunset: number;
      moonrise: number;
      moonset: number;
      moon_phase: number;
      temp: {
        day: number;
        min: number;
        max: number;
        night: number;
        eve: number;
        morn: number;
      };
      feels_like: {
        day: number;
        night: number;
        eve: number;
        morn: number;
      };
      pressure: number;
      humidity: number;
      dew_point: number;
      wind_speed: number;
      wind_deg: number;
      wind_gust: number;
      weather: [
        {
          id: number;
          main: string;
          description: string;
          icon: string;
        }
      ];
      clouds: number;
      pop: number;
      rain: number;
      uvi: number;
    }
  ];
  alerts: [
    {
      sender_name: string;
      event: string;
      start: number;
      end: number;
      description: string;
      tags: [string];
    }
  ];
}

export interface ColorRange {
  minTemp: number;
  maxTemp: number;
  color: string;
}

export interface PredictionResponse {
  description: string;
}

export interface Place {
  predictions: PredictionResponse[];
  status: string;
}

export interface PlacesData {
  locations: string[];
  isLoading: boolean;
  isError: boolean;
}

export interface WeatherData {
  weather: WeatherResponse;
  isLoading: boolean;
  isError: boolean;
}

export interface LocationPageProps {
  params: { location: string };
}

export interface ReactChildren {
  children: React.ReactNode;
}

export interface WeatherContextProps {
  location: string;
  setLocation: (location: string) => void;
  setUnit: (unit: "metric" | "imperial") => void;
  unit: string;
}
