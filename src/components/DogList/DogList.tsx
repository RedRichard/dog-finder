import React, { useState, useEffect } from "react";
import IDog from "../../interfaces/IDog";
import DogCard from "../DogCard/DogCard";
import fetchData from "../../utils/fetchData";

const DogList = () => {
  const [dogIds, setDogIds] = useState<Array<string>>();
  const [dogsData, setDogsData] = useState<Array<IDog>>();

  useEffect(() => {
    const getDogIds = async () => {
      try {
        const res = await fetchData({
          endpoint: "/dogs/search",
        });
        const dogIds = await res.json();
        setDogIds(dogIds.resultIds);
      } catch (e) {
        console.error("An error has occurred", e);
      }
    };

    getDogIds();
  }, []);

  useEffect(() => {
    const getDogData = async () => {
      try {
        const res = await fetchData<Array<string>>({
          endpoint: "/dogs",
          body: dogIds,
        });
        const dogsData = await res.json();
        setDogsData(dogsData);
      } catch (e) {
        console.error("An error has occurred", e);
      }
    };

    if (dogIds) getDogData();
  }, [dogIds]);

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
