import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import Navbar from "./Navbar";

export default function Search({ query }) {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetch("https://spotiday.herokuapp.com/search-music/?q=" + query)
      .then((src) => src.json())
      .then((data) => {
        setSearchResults(data);
      });
  }, [setSearchResults]);
  return (
    <React.Fragment>
      <Navbar />
      <div className="container">
        <div className="row">
          {searchResults.map((items) => (
            <Card
              src={items.thumb}
              title={items.title}
              artist={items.penyanyi}
              id={items.id}
            />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}
