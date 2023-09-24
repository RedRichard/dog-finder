import { makeAutoObservable } from "mobx";
import IDogSearch from "../interfaces/IDogSearch";
import IDog from "../interfaces/IDog";
import fetchData from "../utils/fetchData";
import searchFiltersStore from "./SearchFiltersStore";

class DogStore {
  dogSearch: IDogSearch = { next: "", resultIds: [], total: 0 };
  dogsData: Array<IDog> = [];
  selectedDogsData: Array<IDog> = [];
  selectedDogsId: Record<string, number> = {};

  constructor() {
    makeAutoObservable(this);
  }

  addSelectedDogId(dogId: string) {
    if (!this.selectedDogsId[dogId]) {
      this.selectedDogsId[dogId] = 1;
      console.log(Object.keys(this.selectedDogsId));
      this.makeSelectedDogsSearch();
    }
  }

  *makeDogSearch() {
    try {
      // Make dog id search
      const resSearch: Response = yield fetchData<IDogSearch>({
        endpoint: "/dogs/search",
        params: {
          sort: "breed:asc",
          ...searchFiltersStore.searchParams,
        },
      });
      const search: IDogSearch = yield resSearch.json();
      this.dogSearch = search;
      // console.log(search);

      // Get dog data
      const resDogs: Response = yield fetchData<Array<string>>({
        endpoint: "/dogs",
        body: search.resultIds,
      });
      const dogsData: Array<IDog> = yield resDogs.json();
      // console.log(dogsData);
      this.dogsData = dogsData;
    } catch (e) {
      console.error("An error has occurred", e);
    }
  }

  *makeSelectedDogsSearch() {
    try {
      // Get dog data
      const resDogs: Response = yield fetchData<Array<string>>({
        endpoint: "/dogs",
        body: Object.keys(this.selectedDogsId),
      });
      const dogsData: Array<IDog> = yield resDogs.json();
      // console.log(dogsData);
      this.selectedDogsData = dogsData;
    } catch (e) {
      console.error("An error has occurred", e);
    }
  }
}

const dogStore = new DogStore();

export default dogStore;
