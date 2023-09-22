import React, { useEffect } from "react";

const Search = () => {
  useEffect(() => {
    const getBreeds = async () => {
      const res = await fetch(
        "https://frontend-take-home-service.fetch.com/dogs/breeds",
        {
          method: "GET",
          mode: "cors",
          credentials: "include",
        }
      );

      console.log(res.json());
    };

    getBreeds();
  }, []);

  return <div>Search</div>;
};

export default Search;
