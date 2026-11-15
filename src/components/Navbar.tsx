import { useState, type SyntheticEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  // Remembers what the user has typed so far
  const [searchText, setSearchText] = useState("");
  // Lets us send the user to another page from code
  const navigate = useNavigate();

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    // Stop the browser's default "reload the page" on submit
    event.preventDefault();
    const word = searchText.trim();
    // Ignore empty searches
    if (!word) return;
    // Go to the search page with the word in the address
    navigate(`/search?query=${encodeURIComponent(word)}`);
  }

  return (
    <nav className="navbar">
      {/* Clicking the app name goes home, like most websites */}
      <Link to="/">
        <h2>Aubrey's Apron</h2>
      </Link>
      {/* Wrapped together so CSS can put them side by side */}
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/favorites">Favorites</Link>
      </div>
      {/* onSubmit runs on Enter or on clicking the button */}
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          placeholder="Search recipes..."
        />
        <button type="submit">Search</button>
      </form>
    </nav>
  );
}

export default Navbar;
