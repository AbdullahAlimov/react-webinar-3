import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function List({ list, ItemComponent, ...restProps }) {

  return (
    <ul className='List'>{
      list.map(item =>
        <li key={item.code} className='List-item'>
          <ItemComponent
            item={item}
            {...restProps}
          />
        </li>
      )}
    </ul>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  ItemComponent: PropTypes.elementType,
};


export default React.memo(List);
