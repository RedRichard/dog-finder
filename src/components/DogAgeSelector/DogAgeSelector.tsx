import React from "react";
import { observer } from "mobx-react-lite";
import searchFiltersStore from "../../stores/SearchFiltersStore";

const DogAgeSelector = observer(() => {
  return (
    <div>
      <label htmlFor="dog-age-min">
        Min Age
        <select
          id="dog-age-min"
          name="dog-age-min"
          value={searchFiltersStore.minAge}
          onChange={(e) =>
            searchFiltersStore.setMinAge(parseInt(e.target.value))
          }
        >
          {[...Array(20)].map((_, index) => (
            <option key={index}>{index}</option>
          ))}
        </select>
      </label>
      <label htmlFor="dog-age-max">
        {" "}
        Max Age
        <select
          id="dog-age-max"
          name="dog-age-max"
          value={searchFiltersStore.maxAge}
          onChange={(e) =>
            searchFiltersStore.setMaxAge(parseInt(e.target.value))
          }
        >
          {[...Array(20)].map((_, index) => (
            <option key={index}>{index}</option>
          ))}
        </select>
      </label>
    </div>
  );
});

export default DogAgeSelector;
