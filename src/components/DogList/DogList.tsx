import React, { useState, useEffect } from "react";
import IDog from "../../interfaces/IDog";
import IDogSearch from "../../interfaces/IDogSearch";
import DogCard from "../DogCard/DogCard";

// interface IDog {
//   img: string;
//   name: string;
//   age: number;
//   breed: string;
//   zip_code: string;
//   id: string;
// }

// interface IDogSearch {
//   next: string;
//   resultIds: Array<string>;
//   total: number;
// }

const DogList = () => {
  const [dogIds, setDogIds] = useState<Array<string>>();
  const [dogsData, setDogsData] = useState<Array<IDog>>();

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
        setDogIds((data as IDogSearch).resultIds);
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
    const getDogData = async () => {
      try {
        const res = await fetch(
          "https://frontend-take-home-service.fetch.com/dogs",
          {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dogIds),
          }
        );

        if (!res.ok) throw new Error("Unable to retrieve dog data.");

        const data = await res.json();

        // console.log(data);
        setDogsData(data);
      } catch (e) {
        if (e instanceof Error) console.log(e.message);
        else
          console.log(
            `An error has occurred while retrieving dogs' information.`
          );
      }
    };

    if (dogIds) getDogData();
  }, [dogIds]);

  useEffect(() => {
    if (dogsData) console.log(dogsData);
  }, [dogsData]);

  return (
    <div>
      {dogsData &&
        dogsData.map((dogData, index) => (
          <div key={index}>
            <DogCard dogData={dogData} />
          </div>
        ))}
    </div>
  );
};

export default DogList;
