import React from "react";
import { observer } from "mobx-react-lite";
import searchFiltersStore from "../../stores/SearchFiltersStore";
import AgeSelector from "../AgeSelector/AgeSelector";

const DogAgeSelector = observer(() => {
  return (
    <div className="flex flex-row gap-4 justify-between md:justify-start">
      <AgeSelector
        id="dog-age-min"
        selectValue={searchFiltersStore.minAge}
        onChangeHandler={searchFiltersStore.setMinAge}
      />
      <AgeSelector
        id="dog-age-max"
        selectValue={searchFiltersStore.maxAge}
        onChangeHandler={searchFiltersStore.setMaxAge}
      />
    </div>
  );
});

export default DogAgeSelector;
