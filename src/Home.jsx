import "./scss/Home.scss";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search } from "./Icon";
import dataBackup from "./fallback/data.json";

function Home({ isDark }) {
  // state to store the list of countries from the API
  const [countries, setCountries] = useState([]);
  // state to handle a loading screen while data arrives
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  useEffect(() => {
    // function to fetch data from the API
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,capital,flags,cca3,population,region",
        );

        if (!response.ok) {
          throw new Error("Network response failed: " + response.status);
        }

        const data = await response.json();

        // save the array of countries in the state
        setCountries(data);
        setLoading(false);
      } catch (error) {
        console.warn("Home: Using fallback data.", error);
        setError(false);
        setCountries(dataBackup);
        setLoading(false);
      }
    };

    fetchCountries();
  }, []); //!!!empty array means: run only once when the component mounts

  const filteredCountries = countries.filter((country) => {
    // filter the correct name, if it comes from the API we use .common, if not the string from json
    const countryName = country?.name?.common || country?.name || "";

    // .includes() is gonna look for the value of "searchTerm" and if country.name.common has the same value in the name then includes() will return true.
    const matchesSearch = countryName.toLowerCase().includes(searchTerm.toLowerCase());

    // validate region. If none's selected all pass thru. If it had false then none of the countries would show.
    const matchesRegion = selectedRegion ? country?.region === selectedRegion : true;

    // the country passes if both conditionals match
    return matchesSearch && matchesRegion;
  });

  if (loading) {
    return <div className='loading'>Loading world data...</div>;
  }

  if (error) {
    return <div className='error'>Error loading world data</div>;
  }

  return (
    <section className='home__page'>
      <div className='filters__placeholder'>
        <div className='search__container'>
          <span className='search__icon'>
            <Search isDark={isDark} />
          </span>
          <input
            type='text'
            placeholder='Search for a country...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='search__bar'
          />
        </div>
        <div className='select__container'>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className='region__select'
          >
            <option value='' disabled hidden>
              Filter by Region
            </option>
            <option value='Africa' disabled={selectedRegion === "Africa"}>
              Africa
            </option>
            <option value='Americas' disabled={selectedRegion === "Americas"}>
              America
            </option>
            <option value='Asia' disabled={selectedRegion === "Asia"}>
              Asia
            </option>
            <option value='Europe' disabled={selectedRegion === "Europe"}>
              Europe
            </option>
            <option value='Oceania' disabled={selectedRegion === "Oceania"}>
              Oceania
            </option>
          </select>
        </div>
      </div>

      <div className='countries__grid'>
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => {
            // declare variables inside of .map
            // the "?" (Optional Chaining) stops the evaluation if a property is null/undefined
            // and returns undefined instead of crashing the whole app
            const name = country?.name?.common || country?.name || "Unknown Country";
            const flagImg = country?.flags?.svg || country?.flags?.png || country?.flag;
            const capital = Array.isArray(country?.capital) // is the capital inside an array?
              ? country?.capital.join(", ") // if so, print all of them separated by a ,
              : country?.capital; // if not, just return the capital
            return (
              <Link
                to={`/country/${encodeURIComponent(name.toLowerCase())}`}
                key={country?.cca3 || name}
                className='country__card__link'
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className='country__card'>
                  <div className='country__img'>
                    <img src={flagImg} alt={`Flag of ${name}`} />
                  </div>
                  <div className='country__information'>
                    <h3>{name}</h3>
                    <p>
                      <span>Population: </span>{" "}
                      {country?.population ? country.population.toLocaleString() : "N/A"}
                    </p>
                    <p>
                      <span>Region: </span> {country?.region || "N/A"}
                    </p>
                    <p>
                      <span>Capital: </span> {capital || "No capital"}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <div className='no__results'>No countries match your search.</div>
        )}
      </div>
    </section>
  );
}

export default Home;
