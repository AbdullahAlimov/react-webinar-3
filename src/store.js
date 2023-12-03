import item from "./components/item";
import { generateCode } from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
 * Установка состояния
 * @param newState {Object}
 */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

    /**
   * Возвращает корзину с уникальными значениями
   * @returns {Array} 
   */
  getUniqCart(){
    return Array.from(new Set(this.state.cart.map(item => item.code))).map(code => this.state.list.find(item => item.code === code))
  }

  deleteCartItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи(ей)
      cart: this.state.cart.filter(item => item.code !== code)
    })
  }

  /**
   * Добавление новой записи
   */
  addCartItem(code) {
    this.setState({
      ...this.state,
      cart: [...this.state.cart, this.state.list.find(item => item.code === code)]
    })
  }
}


export default Store;
