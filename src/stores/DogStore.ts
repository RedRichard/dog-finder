import { makeAutoObservable, autorun } from "mobx";
import IDogSearch from "../interfaces/IDogSearch";
import IDog from "../interfaces/IDog";
import fetchData from "../utils/fetchData";

const DEFAULT_SEARCH_SIZE: number = 25;

class DogStore {
  selectedIndex: number = 0;
  dogSearch: IDogSearch = { next: "", resultIds: [], total: 0 };
  dogsData: Array<IDog> = [];

  constructor() {
    makeAutoObservable(this);
  }

  setSelectedIndex(index: number) {
    this.selectedIndex = index;
    this.makeDogSearch();
  }

  *makeDogSearch() {
    try {
      // Make dog id search
      const resSearch: Response = yield fetchData<IDogSearch>({
        endpoint: "/dogs/search",
        params: {
          size: DEFAULT_SEARCH_SIZE.toString(),
          from: (this.selectedIndex * DEFAULT_SEARCH_SIZE).toString(),
          sort: "breed:asc",
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
}

const dogStore = new DogStore();

export default dogStore;
