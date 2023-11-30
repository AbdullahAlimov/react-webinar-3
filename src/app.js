import React, { useCallback, useEffect, useState } from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from './components/ui/modal';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {

  const list = store.getState().list;

  const [cart, setCart] = useState([]);

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      setCart(cart.filter(item => item.code !== code))
    }, [cart]),
    onAddItem: useCallback((code) => {
      setCart(prevCart=>[...prevCart, store.getItem(code)]);
    }, [cart])
  }
  
  const [modalValue, setModalValue] = useState(false);

  useEffect(()=>{
    if(!cart.length){
      setModalValue(false)
    }
  },[cart])
  

  return (
    <PageLayout>
      <Head title={'Магазин'} />
      <Controls list={cart} setModalValue={setModalValue} />
      <List list={list}
        type={"list"}
        onClickToItemButton={callbacks.onAddItem} />
      <Modal title={"Корзина"}
        modalValue={modalValue}
        setModalValue={setModalValue}
      >
        <List list={cart}
          type={"cart"}
          onClickToItemButton={callbacks.onDeleteItem} />
        <p className="List-sum">Итого <span>{cart.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0)} ₽</span></p>
      </Modal>
    </PageLayout>
  );
}

export default App;
