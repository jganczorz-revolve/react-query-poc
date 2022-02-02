import React from "react";
import { useQuery } from "react-query";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

function renderLink(value) {
  return `${value}`.includes("https://swapi.dev/api") ? (
    <Link to={value.replace("https://swapi.dev/api", "")}>
      {value.replace("https://swapi.dev/api", "")}
    </Link>
  ) : (
    value
  );
}

function Details() {
  const urlParams = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const getResult = async ({ queryKey }) => {
    if (!queryKey[0]) {
      return Promise.reject();
    }
    const response = await fetch(`https://swapi.dev/api${queryKey[0]}`);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  };

  const { data, error } = useQuery(
    [location.pathname],
    getResult,
    {
      placeholderData: {},
      staleTime: 30 * 1000
    }
  );

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      {Object.entries(data || {}).map(([key, value], index) => {
        if (Array.isArray(value)) {
          return (
            <div key={location.pathname + "_" + index}>
              {key}:
              <ul>
                {value.map((v, i) => (
                  <li key={location.pathname + "_" + index + "_" + i}>
                    {renderLink(v)}
                  </li>
                ))}
              </ul>
            </div>
          );
        }
        return (
          <div key={location.pathname + "_" + index}>
            {key}: {renderLink(value)}
          </div>
        );
      })}
      <div>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    </div>
  );
}

export default Details;
