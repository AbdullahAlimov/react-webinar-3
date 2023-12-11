import React, { useCallback, useEffect, memo, useState } from 'react';
import useStore from '../../../store/use-store';
import Pagination from '../../../components/pagination';
import { getCatalogLength } from '../../../api/api';

const HomePagination = () => {
    const store = useStore()

    const [selectItem,setSelectItem]=useState(1);
    const [length,setLength]=useState(0)

    useEffect(() => {
        async function fetchData(){
            try {
                const response = await getCatalogLength();
                setLength(Math.ceil(response / 10))
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData()
    }, []);

    const callbacks = {
        refreshCatalog: useCallback((paginationValue) => {
            if (selectItem !== paginationValue) {
                store.actions.catalog.load(paginationValue * 10)
                setSelectItem(paginationValue)
            }
        }, [selectItem]),
    };

    return (
        <Pagination length={length} selectItem={selectItem} onRefresh={callbacks.refreshCatalog} />
    );
};

export default memo(HomePagination);
