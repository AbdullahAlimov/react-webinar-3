import {memo} from 'react';
import List from "../list";
import PropTypes from 'prop-types';
import ModalLayout from "../modal-layout";
import BasketTotal from "../basket-total";
import LocalizedText from '../../i18n/components/localized-text';

function Basket({sum, list, onClose, renderItem}) {

  const callbacks = {
    // Закрытие любой модалки
    onClose:()=> onClose(),
  }

  return (
    <ModalLayout title={<LocalizedText id="basket"/>} onClose={callbacks.onClose}>
      <List list={list} renderItem={renderItem}/>
      <BasketTotal sum={sum}/>
    </ModalLayout>
  );
}

Basket.PropTypes={
  list:PropTypes.array,
  sum:PropTypes.number,
  onClose:PropTypes.func,
  renderItem:PropTypes.func
}

Basket.defaultProps={
  onClose:()=>{},
  renderItem:()=>{}
}

export default memo(Basket);
