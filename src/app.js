import React, { useCallback, useEffect, useState } from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from './components/ui/modal';
import CartItem from './components/cart-item';
import Item from './components/item';
/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {

  const list = store.getState().list;
  const cart = store.getState().cart

  const uniqCart = store.getUniqCart()

  const callbacks = {
    onDeleteItem: useCallback((code, e) => {
      e.stopPropagation();
      store.deleteCartItem(code);
    }, [cart]),
    onAddItem: useCallback((code, e) => {
      e.stopPropagation();
      store.addCartItem(code);
    }, [cart])
  }

  const [modalValue, setModalValue] = useState(false);
  useEffect(() => {
    if (!cart.length) {
      setModalValue(false)
    }
  }, [cart])


  return (
    <PageLayout>
      <Head title={'Магазин'} />
      <Controls list={cart} uniqList={uniqCart} setModalValue={setModalValue} />
      <List list={list}
        ItemComponent={Item}
        onClick={callbacks.onAddItem} />
      <Modal title={"Корзина"}
        modalValue={modalValue}
        setModalValue={setModalValue}
      >
        <List
          list={uniqCart}
          ItemComponent={CartItem}
          onClick={callbacks.onDeleteItem}
          cart={cart} />
        <p className="List-sum">Итого <span>{cart.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0).toLocaleString()} ₽</span></p>
      </Modal>
    </PageLayout>
  );
}

export default App;
