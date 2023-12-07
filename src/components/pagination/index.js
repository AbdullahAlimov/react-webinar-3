import React, { memo } from 'react';
import PropTypes from 'prop-types';
import "./style.css"

function Pagination ({list,selectItem,onRefresh}){
    return (
        <ul className='Pagination'>
            {list?.map((item, index) => {
                if (item !== "...") {
                    return (
                        <li
                            className={`Pagination-item ${item === selectItem && "selected"}`}
                            key={index}
                            onClick={() => {
                                onRefresh(item)
                            }}>
                            {item}
                        </li>
                    )
                }
                else {
                    return (
                        <li key={index}>
                            {item}
                        </li>
                    )
                }
            })}
        </ul>
    );
};

Pagination.PropTypes={
    list:PropTypes.array,
    selectItem:PropTypes.number,
    onRefresh:PropTypes.func
}

Pagination.defaultProps={
    onRefresh:()=>{}
}

export default memo(Pagination);
