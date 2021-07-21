import React from "react";
import Card from "../components/Card";
import Navbar from "./Navbar";

export default async function Search({ query }) {
  fetch(`http://localhost:8000/search-music/?q=${query}`)
    .then((res) => res.json())
    .then((arr) => {
      return (
        <React.Fragment>
          <Navbar />
          <div className="container">
            <div className="row">
              {arr.map((items) => (
                <Card
                  src={items.thumb_id}
                  title={items.title}
                  artist={items.penyanyi}
                  id={items.id}
                />
              ))}
            </div>
          </div>
        </React.Fragment>
      );
    });
}
