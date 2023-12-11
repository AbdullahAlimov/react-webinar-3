import React, { memo,useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import "./style.css"

function Pagination ({length,selectItem,onRefresh}){

    const [list,setList]=useState([])

    useEffect(() => {
        var newList = []

        newList.push(1);
        if (selectItem > 3) newList.push("...");
        if (selectItem === length) newList.push(selectItem - 2);
        if (!(selectItem === 1 || selectItem === 2)) newList.push(selectItem - 1);
        if (!(selectItem === 1 || selectItem === length)) newList.push(selectItem);
        if (!(selectItem === length || selectItem === length - 1)) newList.push(selectItem + 1);
        if (selectItem === 1) newList.push(selectItem + 2);
        if (selectItem < length - 2) newList.push("...");
        newList.push(length);

        setList(newList);
    }, [selectItem,length]);
    
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
                        <li className='Pagination-ellipsis' key={index}>
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
