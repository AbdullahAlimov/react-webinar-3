import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import { plural } from "../../utils";

function Controls({list,setModalValue}) {
  return (
    <div className='Controls'>
      <p>В корзине:</p>
      {
        list.length?
        <p className="Controls-bold">{`${list.length} ${plural(list.length,{one: 'товар', few: 'товара', many: 'товаров'},'ru-RU')} / ${list.reduce((accumulator, currentValue)=>accumulator+currentValue.price,0)} ₽`}</p>
        :<p className="Controls-bold">пусто</p>
      }
      <button className="Controls-button" onClick={() => list.length && setModalValue(true)}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  list: PropTypes.array.isRequired,
  setModalValue: PropTypes.func,
};

Controls.defaultProps = {
  list: [],
  setModalValue:()=>{},
}

export default React.memo(Controls);
