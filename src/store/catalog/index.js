import { getPaginationCatalog } from "../../api/api";
import { codeGenerator } from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: []
    }
  }

  async load(start,limit=10) {
    try {
      const response = await getPaginationCatalog(start,limit);
      this.setState({
        list: response
      }, `Загружена ${start/10} страница из АПИ`);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}

export default Catalog;
