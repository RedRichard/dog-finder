import { makeAutoObservable } from "mobx";
import IDogSearch from "../interfaces/IDogSearch";
import IDog from "../interfaces/IDog";
import IDogMatch from "../interfaces/IDogMatch";
import fetchData from "../utils/fetchData";
import searchFiltersStore from "./SearchFiltersStore";

class DogStore {
  dogSearch: IDogSearch = { next: "", resultIds: [], total: 0 };
  dogsData: Array<IDog> = [];
  selectedDogsData: Array<IDog> = [];
  selectedDogsId: Record<string, number> = {};
  matchedDogData: IDog | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  addSelectedDogId(dogId: string) {
    if (!this.selectedDogsId[dogId]) {
      this.selectedDogsId[dogId] = 1;
      // console.log(Object.keys(this.selectedDogsId));
      this.makeSelectedDogsSearch();
    }
  }

  deleteSelectedDogId(dogId: string) {
    delete this.selectedDogsId[dogId];
    console.log(Object.keys(this.selectedDogsId));
    this.makeSelectedDogsSearch();
  }

  *getDogData(dogIds: Array<string>) {
    const resDogs: Response = yield fetchData<Array<string>>({
      endpoint: "/dogs",
      body: dogIds,
    });
    const dogsData: Array<IDog> = yield resDogs.json();
    return dogsData;
  }

  *makeDogSearch() {
    try {
      // Make dog id search
      const resSearch: Response = yield fetchData<IDogSearch>({
        endpoint: "/dogs/search",
        params: {
          ...searchFiltersStore.searchParams,
        },
      });
      const search: IDogSearch = yield resSearch.json();
      this.dogSearch = search;

      this.dogsData = yield this.getDogData(search.resultIds);
    } catch (e) {
      console.error("An error has occurred", e);
    }
  }

  *makeSelectedDogsSearch() {
    try {
      // Get dog data
      this.selectedDogsData = yield this.getDogData(
        Object.keys(this.selectedDogsId)
      );
    } catch (e) {
      console.error("An error has occurred", e);
    }
  }

  *makeMatch() {
    try {
      // Get dog data
      const resDogs: Response = yield fetchData<Array<string>>({
        endpoint: "/dogs/match",
        body: Object.keys(this.selectedDogsId),
      });
      const dogsData: IDogMatch = yield resDogs.json();
      // console.log(dogsData);
      const data: Array<IDog> = yield this.getDogData([dogsData.match]);
      this.matchedDogData = data[0];
      console.log(this.matchedDogData);
    } catch (e) {
      console.error("An error has occurred", e);
    }
  }
}

const dogStore = new DogStore();

export default dogStore;
