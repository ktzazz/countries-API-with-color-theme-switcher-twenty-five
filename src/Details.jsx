import { useParams, Link } from "react-router-dom"; //this hook reads the URL and tells what country does the user want to see

function CountryDetail() {
  // Grab the dynamic variable from the URL (e.g., /country/mexico -> countryName = "mexico")
  const { countryName } = useParams();

  return (
    <section className="detail-page">
      <Link to="/">← Back</Link>
      <h2>Details for: {countryName}</h2>
      <p>API data for this country will be displayed here.</p>
    </section>
  );
}

export default CountryDetail;
