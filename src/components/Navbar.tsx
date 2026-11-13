import { useState, type SyntheticEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
function Navbar() {
  const [SearchText, setSearchText] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const word = SearchText.trim();
    // ignore empty searches
    if (!word) return;
    // go to the search page with the word in the address
    navigate(`/search?query=${encodeURIComponent(word)}`);
  }
  return (
    <nav>
      {/* Clicking the app name goes home, like most websites */}
      <Link to="/">
        <h2>Recipe Discovery</h2>
      </Link>
      <Link to="/">Home</Link> | <Link to="/favorites">Favorites</Link>
      {/* onSubmit runs on Enter or on clicking the button */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={SearchText}
          onChange={(event) => setSearchText(event.target.value)}
          placeholder="Search recipes..."
        />
        <button type="submit">Search</button>
      </form>
    </nav>
  );
}

export default Navbar;
