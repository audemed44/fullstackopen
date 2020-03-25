import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchCountry = props => {
  const handleSearchFilterOnChange = event => {
    const filteredCountries = props.countries.filter(item =>
      item.name.toLowerCase().includes(event.target.value)
    );
    props.setFilteredCountries(filteredCountries);
  };
  return (
    <div>
      <p>
        find countries
        <input onChange={handleSearchFilterOnChange} />
      </p>
    </div>
  );
};

const Weather = ({ weather }) => {
  return (
    <div>
      <b>Temperature</b> {weather.current.temperature} degree celsius
      {weather.current.weather_icons.map((icon, i) => (
        <div key={i}>
          <img src={icon} height="50" width="50" alt="weather-icon" />
        </div>
      ))}
      <b>Wind</b> {weather.current.wind_speed} {weather.current.wind_dir}
    </div>
  );
};

const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const url =
    "http://api.weatherstack.com/current?access_key=" +
    process.env.REACT_APP_API_KEY +
    "&query=" +
    country.capital;
  useEffect(() => {
    axios.get(url).then(response => {
      setWeather(response.data);
      setIsLoaded(true);
    });
  }, [url]);
  return (
    <div>
      <h1>{country.name}</h1>
      <p>Capital {country.capital}</p>
      <p>Population {country.population}</p>
      <h2>Languages</h2>
      <ul>
        {country.languages.map((language, i) => (
          <li key={i}>{language.name}</li>
        ))}
      </ul>
      <div>
        <img src={country.flag} alt={country.name} height="100" width="100" />
      </div>
      <div>
        <h2>Weather in {country.capital}</h2>
        {isLoaded && <Weather weather={weather} />}
      </div>
    </div>
  );
};

const DisplayCountries = props => {
  const [buttonClicked, setButtonClicked] = useState({
    name: "",
    clicked: false
  });

  const handleClick = event => {
    setButtonClicked({
      name: event.target.id,
      clicked: !buttonClicked.clicked
    });
  };
  if (props.filteredCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (props.filteredCountries.length === 1) {
    const country = props.filteredCountries[0];
    return (
      <div>
        <CountryDetails country={country} />
      </div>
    );
  } else if (buttonClicked.clicked) {
    return (
      <div>
        <CountryDetails country={props.filteredCountries[buttonClicked.name]} />
      </div>
    );
  } else
    return (
      <div>
        {props.filteredCountries.map((country, i) => (
          <div key={country.numericCode}>
            {country.name}
            <button id={i} onClick={handleClick}>
              show
            </button>
          </div>
        ))}
      </div>
    );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      setCountries(response.data);
    });
  }, []);
  return (
    <div>
      <SearchCountry
        countries={countries}
        setFilteredCountries={setFilteredCountries}
      />
      <DisplayCountries filteredCountries={filteredCountries} />
    </div>
  );
};

export default App;
