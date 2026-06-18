import "./scss/Details.scss";
import { useParams, Link } from "react-router-dom"; //this hook reads the URL and tells what country does the user want to see
import { useState, useEffect } from "react";
import { Arrow } from "./Icon";
import dataBackup from "./fallback/data.json";

function CountryDetail({ isDark }) {
  // grab the dynamic variable from the URL (e.g., /country/mexico -> countryName = "mexico")
  const { countryName } = useParams();

  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [borderNames, setBorderNames] = useState([]);

  useEffect(() => {
    const fetchCountryData = async () => {
      setLoading(true);
      setError(false);

      try {
        // fetch API
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);

        if (!response.ok) {
          throw new Error("API ERROR");
        }

        const data = await response.json();
        setCountry(data[0]); // Country from API
        setLoading(false);
      } catch (error) {
        console.warn("Details: searching data in backup...", error);

        // If API fails, we'll get it from the json
        const interceptedCountry = dataBackup.find(
          (c) =>
            c.name?.common?.toLowerCase() === countryName?.toLowerCase() ||
            c.name?.toLowerCase() === countryName?.toLowerCase(),
        );

        if (interceptedCountry) {
          setCountry(interceptedCountry); // Country from JSON
        } else {
          setError(true);
        }
        setLoading(false);
      }
    };

    fetchCountryData();
  }, [countryName]);

  useEffect(() => {
    const fetchBorderNames = async () => {
      // If country hasn´t loaded or doesn't have borders, the state stays empty and we get out
      if (!country?.borders || country.borders.length === 0) {
        setBorderNames([]);
        return;
      }

      try {
        // From API
        const codes = country.borders.join(",");
        const borderResponse = await fetch(`https://restcountries.com/v3.1/alpha?codes=${codes}`);

        if (borderResponse.ok) {
          const borderData = await borderResponse.json();
          // Save common names from API
          setBorderNames(borderData.map((b) => b.name.common));
        } else {
          throw new Error("API borders error"); // Force the catch
        }
      } catch (error) {
        console.warn("Details: searching borders in backup...", error);

        // From JSON
        // Filter on the backup the codes from the countries that are on the list of our current country
        const localBorders = dataBackup.filter((localCountry) => {
          // We look for a match of the codes in JSON called "alpha3Code"
          const code = localCountry.alpha3Code;
          return country.borders.includes(code);
        });

        // Map the country names
        setBorderNames(localBorders.map((b) => b.name?.common || b.name || "Unknown"));
      }
    };

    fetchBorderNames();
  }, [country]); // runs everytime country changes

  if (loading) {
    return (
      <div className='loading'>
        Loading country details
        <span className='pt-1'>.</span>
        <span className='pt-2'>.</span>
        <span className='pt-3'>.</span>
      </div>
    );
  }

  if (error) {
    return <div className='error'>Country details could not be loaded.</div>;
  }

  // Destructuring the "childs" from country before everything else
  // "|| {}" it's in case country is null while loading
  const {
    name,
    flags,
    capital: datCapital,
    languages: datLanguages,
    nativeName,
    population,
    region,
    subregion,
    tld,
    topLevelDomain,
    currencies,
  } = country || {};

  const commonName = name?.common || name || "Unknown Country";
  const flagImg = flags?.svg || flags?.png || flags;
  const capital = Array.isArray(datCapital) // is the capital inside an array?
    ? datCapital.join(", ") // if so, print all of them separated by a ,
    : datCapital; // if not, just return the capital
  const languages =
    Object.values(datLanguages || {}) // "object.values" convert an object into an array. -(....) ensures that if the country data is loading or missing, the code safely falls back to an empty object instead of crashing.
      .map((lang) => lang.name) // map the array and extract the .name string
      .join(", ") || "N/A";

  // convert the object of languages into an array (if it exists)
  const nativeNameOptions = name?.nativeName ? Object.values(name.nativeName) : [];

  const natName =
    nativeNameOptions.length > 0
      ? nativeNameOptions[0].common || nativeNameOptions[0] // if there's a common name its from the API
      : nativeName || "Unknown Native Name"; // if not, it's from the JSON

  const infoPopulation = population ? population.toLocaleString() : "Unknown Population";

  const tLvlDom = tld?.[0] || topLevelDomain?.[0] || "N/A";

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
          <img src={flagImg} alt={commonName} className='detail__flag' />
          <div className='detail__info'>
            <h2>{commonName}</h2>
            <div className='info__container'>
              <div className='info__first'>
                <p>
                  <span className='map__name'>Native Name:</span> {natName}
                </p>
                <p>
                  <span className='map__population'>Population:</span> {infoPopulation}
                </p>
                <p>
                  <span className='map__region'>Region:</span> {region || "N/A"}
                </p>
                <p>
                  <span className='map__subregion'>Sub Region:</span> {subregion || "N/A"}
                </p>
                <p>
                  <span className='map__capital'>Capital:</span> {capital || "N/A"}
                </p>
              </div>
              <div className='info__second'>
                <p>
                  <span className='map__domain'>Top Level Domain:</span> {tLvlDom}
                </p>
                <p>
                  <span className='map__currency'>Currencies:</span>{" "}
                  {currencies ? (
                    <>
                      {Object.values(currencies)[0].name}
                      <span className='currency__symbol'>
                        ({`${Object.values(currencies)[0].symbol}`})
                      </span>
                    </>
                  ) : (
                    "N/A"
                  )}
                </p>
                <p>
                  <div className='languages__div'>
                    <span className='map__languages'>Languages:</span> {languages || "N/A"}
                  </div>
                </p>
              </div>
            </div>
            <div className='border__container'>
              <span className='border__title'>Border Countries:</span>{" "}
              {
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
              }
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default CountryDetail;
