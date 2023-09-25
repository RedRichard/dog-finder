import React from "react";
import { observer } from "mobx-react-lite";
import dogStore from "../../stores/DogStore";
import searchFiltersStore from "../../stores/SearchFiltersStore";
import PageSelector from "../PageSelector/PageSelector";

const SearchPageSelectors = observer(() => {
  return (
    <div className="flex flex-row gap-2 p-4 justify-center">
      {dogStore.dogSearch &&
        [...Array(searchFiltersStore.numPageSelector)].map((x, index) => (
          <PageSelector page={index} key={index} />
        ))}
    </div>
  );
});

export default SearchPageSelectors;
