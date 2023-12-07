import { memo, useCallback, useEffect } from 'react';
import Item from "../../../components/item";
import Head from "../../../components/head";
import BasketTool from "../../../components/basket-tool";
import List from "../../../components/list";
import Basket from "../../../components/basket";
import useStore from "../../../store/use-store";
import useSelector from "../../../store/use-selector";
import LocalizedText from '../../../components/localized-text';

function Main() {

    const store = useStore();

    useEffect(() => {
        store.actions.catalog.load(10)
    }, []);

    const select = useSelector(state => ({
        list: state.catalog.list,
        amount: state.basket.amount,
        sum: state.basket.sum,
        activeModal:state.modals.name,
    }));

    const callbacks = {
        // Добавление в корзину
        addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
        // Открытие модалки корзины
        openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    }

    const renders = {
        item: useCallback((item) => {
            return <Item item={item} onAdd={callbacks.addToBasket} />
        }, [callbacks.addToBasket]),
    };

    return (
        <>
            <Head title={<LocalizedText id="shop"/>} />
            <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                sum={select.sum} />
            <List list={select.list} renderItem={renders.item} />
            {select.activeModal === 'basket' && <Basket />}
        </>

    );
}

export default memo(Main);
