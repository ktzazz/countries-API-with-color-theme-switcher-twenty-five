import "./scss/Details.scss";
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
          const borderResponse = await fetch(`https://restcountries.com/v3.1/alpha?codes=${codes}`);

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
    return <div className='loading'>Loading country details...</div>;
  }

  if (error) {
    return <div className='error'>Country details could not be loaded.</div>;
  }

  return (
    <section className='detail__section'>
      <div className='detail__btn__container'>
        <Link to='/'>
          <button type='button' aria-label='Home' className='btn__home'>
            <Arrow isDark={isDark} /> <span className='btn__back'> Back </span>
          </button>
        </Link>
      </div>
      {country && (
        <div className='detail__container'>
          <img src={country.flags.svg} alt={country.name.common} className='detail__flag' />
          <div className='detail__info'>
            <h2>{country.name.common}</h2>
            <div className='info__container'>
              <div className='info__first'>
                <p>
                  <span className='map__name'>Native Name:</span>{" "}
                  {Object.values(country.name.nativeName)[0].common}
                </p>
                <p>
                  <span className='map__population'>Population:</span>{" "}
                  {country.population.toLocaleString()}
                </p>
                <p>
                  <span className='map__region'>Region:</span> {country.region}
                </p>
                <p>
                  <span className='map__subregion'>Sub Region:</span> {country.subregion}
                </p>
                <p>
                  <span className='map__capital'>Capital:</span>{" "}
                  {country.capital?.join(", ") || "N/A"}
                </p>
              </div>
              <div className='info__second'>
                <p>
                  <span className='map__domain'>Top Level Domain:</span> {country.tld?.[0] || "N/A"}
                </p>
                <p>
                  <span className='map__currency'>Currencies:</span>{" "}
                  {country.currencies ? (
                    <>
                      {Object.values(country.currencies)[0].name}
                      <span className='currency__symbol'>
                        ({`${Object.values(country.currencies)[0].symbol}`})
                      </span>
                    </>
                  ) : (
                    "N/A"
                  )}
                </p>
                <p>
                  <span className='map__languages'>Languages:</span>{" "}
                  {country.languages ? Object.values(country.languages).join(", ") : "N/A"}
                </p>
              </div>
            </div>
            <div className='border__container'>
              <span className='border__title'>Border Countries:</span>{" "}
              <div className='borders__btns__container'>
                {borderNames.length > 0 ? (
                  borderNames.map((name) => (
                    <Link
                      to={`/country/${name}`}
                      key={name}
                      className='border__link'
                      style={{ textDecoration: "none" }}
                    >
                      <button type='button' className='border__btn'>
                        {name}
                      </button>
                    </Link>
                  ))
                ) : (
                  <span className='no__borders'>No border countries</span>
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
