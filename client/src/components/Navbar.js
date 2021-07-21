import React from "react";

export default function Navbar() {
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-yellow-500 mb-3">
        <div className="container-fluid">
          <a className="navbar-brand" href="#home">
            <span className="italic mr-4 hover:text-yellow-200 hover:shadow-outline font-medium text-xl tracking-wide">
              Spotiday
            </span>
          </a>
          <form className="d-flex" method="GET">
            <input
              className="form-control me-2 bg-warning border-yellow-400 font-normal"
              type="search"
              name="search"
              id="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button type="submit" className="btn btn-warning hover:shadow-lg">
              Search
            </button>
          </form>
        </div>
      </nav>
    </React.Fragment>
  );
}
