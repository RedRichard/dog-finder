import { makeAutoObservable } from "mobx";
import dogStore from "./DogStore";

enum SearchParams {
  Breeds = "breeds",
  From = "from",
  Size = "size",
}

const DEFAULT_SEARCH_SIZE: number = 25;

class SearchFiltersStore {
  selectedIndex: number = 0;
  selectedBreed: strin | undefined = undefined;
  minAge: number | undefined = undefined;
  maxAge: number | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  resetSelectedindex() {
    this.selectedIndex = 0;
  }

  setSelectedBreed(selectedBreed: string) {
    this.selectedBreed = selectedBreed;
    this.resetSelectedindex();
    dogStore.makeDogSearch();
  }

  setSelectedIndex(index: number) {
    this.selectedIndex = index;
    dogStore.makeDogSearch();
  }

  setMinAge(age: number) {
    this.minAge = age;
    dogStore.makeDogSearch();
  }

  setMaxAge(age: number) {
    this.maxAge = age;
    dogStore.makeDogSearch();
  }

  get searchParams() {
    const params = {
      from: (this.selectedIndex * DEFAULT_SEARCH_SIZE).toString(),
      size: DEFAULT_SEARCH_SIZE.toString(),
      breeds: this.selectedBreed,
      ageMin: this.minAge,
      ageMax: this.maxAge,
    };

    const keys: Array<SearchParams> = Object.keys(
      params
    ) as Array<SearchParams>;

    for (let i = 0; i < keys.length; i++) {
      if (!params[keys[i]]) delete params[keys[i]];
    }

    return params;
  }

  get numPageSelector() {
    return Math.ceil(dogStore.dogSearch.total / DEFAULT_SEARCH_SIZE);
  }
}

const searchFiltersStore = new SearchFiltersStore();

export default searchFiltersStore;
