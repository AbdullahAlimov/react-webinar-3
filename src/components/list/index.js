import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({ list, onClickToItemButton, type }) {

  const callbacks = {
    onClick: (item,e) => {
      e.stopPropagation();
      onClickToItemButton(item.code);
    }
  }

  const uniqueArray = Array.from(new Set(list.map(item => item.code))).map(code => list.find(item => item.code === code));

  return (
    <div className='List'>{
      uniqueArray.map(item =>
        <div key={item.code} className='List-item'>
          <Item item={item} type={type}
            itemActions={
              type === "cart" ?
                <>
                  <p className="Item-price">{item.price.toLocaleString()} ₽</p>
                  <p className="Item-quantity">{list.filter((currentItem) => currentItem.code === item.code).length} шт</p>
                  <button className="Item-button" onClick={(e)=>callbacks.onClick(item,e)}>
                    Удалить
                  </button>
                </> :
                <>
                  <p className="Item-price">{item.price.toLocaleString()} ₽</p>
                  <button className="Item-button" onClick={(e)=>callbacks.onClick(item,e)}>
                    Добавить
                  </button>
                </>
            } />
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onClickToItemButton: PropTypes.func,
  type: PropTypes.string,
};

List.defaultProps = {
  onClickToItemButton: () => {
  },
  type: "",
}

export default React.memo(List);
