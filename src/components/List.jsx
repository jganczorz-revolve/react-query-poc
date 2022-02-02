import React, { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { Link, useLocation, useNavigate } from "react-router-dom";

function List() {
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const location = useLocation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const getResult = async ({ queryKey }) => {
    if (!queryKey[0]) {
      return Promise.reject();
    }
    const { page: p } = queryKey[1];
    const response = await fetch(
      `https://swapi.dev/api${queryKey[0]}/?page=${p}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const json = await response.json();

    setHasNext(!!json.next);

    return Promise.resolve(json.results);
  };

  const { data, error, isFetching } = useQuery(
    [location.pathname || "", { page }],
    getResult,
    {
      placeholderData: [],
      keepPreviousData: true,
      staleTime: 60 * 1000
    }
  );

  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <div>
      {data.map((r, index) => {
        const link =
          location.pathname +
          "/" +
          (r.url || "")
            .split("/")
            .filter((s) => !!s)
            .slice(-1)
            .pop();
        return (
          <div key={`${location.pathname}_${index}`}>
            <Link
              to={link}
              onClick={() => {
                queryClient.setQueryData(link, r);
              }}
            >
              {r.name || r.title}
            </Link>
          </div>
        );
      })}
      <div style={{display: "flex"}}>
        <button onClick={() => setPage((p) => p - 1)} disabled={page === 1}>
          Prev
        </button>
        <div>Page: {page}</div>
        <button onClick={() => setPage((p) => p + 1)} disabled={!hasNext || isFetching}>
          Next
        </button>
      </div>
      <div><button onClick={() => navigate(-1)}>Go Back</button></div>
    </div>
  );
}

export default List;
