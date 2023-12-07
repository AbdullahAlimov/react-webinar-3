import {memo, useCallback} from 'react';
import ItemBasket from "../item-basket";
import List from "../list";
import ModalLayout from "../modal-layout";
import BasketTotal from "../basket-total";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import LocalizedText from '../localized-text';

function Basket() {

  const store = useStore();

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  }

  const renders = {
    itemBasket: useCallback((item) => {
      return <ItemBasket item={item} onRemove={callbacks.removeFromBasket} onClose={callbacks.closeModal}/>
    }, [callbacks.removeFromBasket]),
  };

  return (
    <ModalLayout title={<LocalizedText id="basket"/>} onClose={callbacks.closeModal}>
      <List list={select.list} renderItem={renders.itemBasket}/>
      <BasketTotal sum={select.sum}/>
    </ModalLayout>
  );
}

export default memo(Basket);
