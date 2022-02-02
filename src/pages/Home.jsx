import React from "react";
import { Link } from "react-router-dom";
import { pages } from "./enums";

function Home() {
  return (
    <div>
      {pages.map((pg, index) => (
        <div key={`page_${index}`}>
          <Link to={pg.to}>
            {pg.name}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Home;
