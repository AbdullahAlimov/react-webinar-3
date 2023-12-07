import React, { useCallback, useEffect, memo } from 'react';
import useStore from '../../../store/use-store';
import useSelector from '../../../store/use-selector';
import Pagination from '../../../components/pagination';

const HomePagination = () => {
    const store = useStore()
    
    const select = useSelector(state => ({
        list: state.pagination.list,
        selectItem: state.pagination.selectItem,
    }));
    useEffect(() => {
        store.actions.pagination.load();
    }, []);

    useEffect(() => {
        store.actions.pagination.renderPagination();
    }, [select.selectItem]);

    const callbacks = {
        refreshCatalog: useCallback((paginationValue) => {
            if(select.selectItem!==paginationValue){
                store.actions.catalog.load(paginationValue*10)
                store.actions.pagination.setSelectItem(paginationValue)
            }
        },[select.selectItem]),
    };

    return (
        <Pagination list={select.list} selectItem={select.selectItem} onRefresh={callbacks.refreshCatalog}/>
    );
};

export default memo(HomePagination);
