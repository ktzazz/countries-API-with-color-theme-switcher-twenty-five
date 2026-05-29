import { useParams, Link } from "react-router-dom"; //this hook reads the URL and tells what country does the user want to see
import { useState, useEffect } from "react";
import { Arrow } from "./Icon";

function CountryDetail({ isDark }) {
  // grab the dynamic variable from the URL (e.g., /country/mexico -> countryName = "mexico")
  const { countryName } = useParams();

  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [borderNames, setBorderNames] = useState([]);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        setLoading(true); // Set loading to true while data is being fetched

        // DAta from current country
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${countryName}`, // Fetch data from the dynamic URL
        );
        if (!response.ok) {
          throw new Error("Network response failed: " + response.status);
        }

        const data = await response.json();
        const currentCountry = data[0];

        // Double verification
        // Look for borders within the current country data and verifies that the array isn't empty so js doesn't catch any errors
        if (currentCountry.borders && currentCountry.borders.length > 0) {
          const codes = currentCountry.borders.join(",");
          const borderResponse = await fetch(
            `https://restcountries.com/v3.1/alpha?codes=${codes}`,
          );

          if (borderResponse.ok) {
            const borderData = await borderResponse.json();
            setBorderNames(borderData.map((country) => country.name.common));
          }
        } else {
          // If there are no borders, set borderNames to an empty array
          setBorderNames([]);
        }

        setCountry(currentCountry); // Set the current country
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching country data:", error);
        setError(true);
        setLoading(false);
      }
    };
    fetchCountryData();
  }, [countryName]); // Run the effect whenever countryName changes

  if (loading) {
    return <div className="loading">Loading country details...</div>;
  }

  if (error) {
    return <div className="error">Country details could not be loaded.</div>;
  }

  return (
    <section className="detail-page">
      <Link to="/">
        <button type="button" aria-label="Home" className="btn__home">
          <Arrow isDark={isDark} /> Back
        </button>
      </Link>

      {country && (
        <div className="detail-container">
          <img
            src={country.flags.svg}
            alt={country.name.common}
            style={{ width: "20%" }}
          />
          <div className="detail__info">
            <h2>{countryName}</h2>
            <div className="info__container">
              <h3>{country.name.common}</h3>
              <p>
                <h4>Native Name:</h4>{" "}
                {Object.values(country.name.nativeName)[0].common}
              </p>
              <p>
                <h4>Population:</h4> {country.population.toLocaleString()}
              </p>
              <p>
                <h4>Region:</h4> {country.region}
              </p>
              <p>
                <h4>Sub Region:</h4> {country.subregion}
              </p>
              <p>
                <h4>Capital:</h4> {country.capital?.join(", ") || "N/A"}
              </p>
              <p>
                <h4>Top Level Domain:</h4> {country.tld?.[0] || "N/A"}
              </p>
              <p>
                <h4>Currencies:</h4>{" "}
                {country.currencies ? (
                  <>
                    {Object.values(country.currencies)[0].name}
                    <span className="currency__symbol">
                      {Object.values(country.currencies)[0].symbol}
                    </span>
                  </>
                ) : (
                  "N/A"
                )}
              </p>
              <p>
                <h4>Languages:</h4>{" "}
                {country.languages
                  ? Object.values(country.languages).join(", ")
                  : "N/A"}
              </p>
            </div>
            <div className="border__container">
              <h4>Border Countries:</h4>{" "}
              <div className="borders__btns__container">
                {borderNames.length > 0 ? (
                  borderNames.map((name) => (
                    <Link
                      to={`/country/${name}`}
                      key={name}
                      className="border__link"
                      style={{ textDecoration: "none" }}
                    >
                      <button type="button" className="border__btn">
                        {name}
                      </button>
                    </Link>
                  ))
                ) : (
                  <span className="no__borders">No border countries</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default CountryDetail;
