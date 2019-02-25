import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

class LocalStorage {
  constructor() {
    this.store = { }
  }

  getItem(key) {
    return this.store[key];
  }

  setItem(key, string) {
    this.store[key] = string;
  }

  hasOwnProperty(string) {
    return this.store[string] ? true : false;
  }

  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorage;