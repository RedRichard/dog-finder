import React, { useState, useEffect } from "react";

const DogList = () => {
  const [dogIds, setDogIds] = useState<Array<string>>();

  useEffect(() => {
    const getDogIds = async () => {
      try {
        const res = await fetch(
          "https://frontend-take-home-service.fetch.com/dogs/search",
          {
            method: "GET",
            mode: "cors",
            credentials: "include",
          }
        );

        if (!res.ok) throw new Error("Unable to retrieve dog ids.");

        const data = await res.json();
        setDogIds(data);
      } catch (e) {
        if (e instanceof Error) console.log(e.message);
        else
          console.log(
            `An error has occurred while retrieving dogs' information.`
          );
      }
    };

    getDogIds();
  }, []);

  useEffect(() => {
    if (dogIds) console.log(dogIds);
  }, [dogIds]);

  return <div>DogList</div>;
};

export default DogList;
