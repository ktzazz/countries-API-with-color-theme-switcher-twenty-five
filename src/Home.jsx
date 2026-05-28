import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  // state to store the list of countries from the API
  const [countries, setCountries] = useState([]);
  // state to handle a loading screen while data arrives
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // function to fetch data from the API
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,flags,cca3,population,region,capital",
        );
        const data = await response.json();

        // save the array of countries in the state
        setCountries(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching countries:", error);
        setLoading(false);
      }
    };

    fetchCountries();
  }, []); //!!!empty array means: run only once when the component mounts

  if (loading) {
    return <div className="loading">Loading world data...</div>;
  }

  return (
    <section className="home__page">
      {/* Search and Filter UI will go here later */}
      <div className="filters__placeholder">Search and Filter bars</div>

      {/* Grid to display the countries */}
      <div className="countries__grid">
        {countries.map((country) => (
          <Link
            to={`/country/${encodeURIComponent(country.name.common.toLowerCase())}`}
            key={country.cca3}
            className="country__card__link"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div key={country.cca3} className="country__card">
              <img
                src={country.flags.svg}
                alt={`Flag of ${country.name.common}`}
                style={{ width: "150px", height: "100px", objectFit: "cover" }}
              />
              <h3>{country.name.common}</h3>
              {/* use toLocaleString() to format the number with comas */}
              <p>
                <strong>Population:</strong>{" "}
                {country.population.toLocaleString()}
              </p>
              <p>
                <strong>Region:</strong> {country.region}
              </p>
              <p>
                <strong>Capital:</strong>{" "}
                {country.capital ? country.capital[0] : "No capital"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Home;
